import { MercadoPagoConfig, Preference } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Vercel Serverless Function
export default async function handler(req, res) {
  // Soporte para CORS (pre-flight)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  // Restricción de método
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  // 1. Inicializar SDK de Mercado Pago
  const client = new MercadoPagoConfig({ 
    accessToken: process.env.MP_ACCESS_TOKEN || ''
  });

  // 2. Inicializar Cliente Supabase
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { email, planName, price } = req.body;

  if (!email || !planName || !price) {
    return res.status(400).json({ success: false, error: 'Faltan parámetros: email, planName, price' });
  }

  try {
    // Generar la referencia externa única (uuid)
    const externalReference = crypto.randomUUID();

    // 3. Guardar registro 'pendiente' en Supabase
    const { error: dbError } = await supabase
      .from('licencias_pagos')
      .insert([
        {
          email: email,
          plan: planName,
          monto: Number(price),
          estado: 'pendiente',
          external_reference: externalReference
        }
      ]);

    if (dbError) {
      console.error('Error insertando en Supabase:', dbError);
      throw new Error('Error al registrar el intento de pago en la base de datos');
    }

    // Configurar el dominio base dinámicamente usando el header origin, u obtenerlo de variables de entorno
    const baseUrl = req.headers.origin || process.env.NEXT_PUBLIC_APP_URL || process.env.VITE_APP_URL || 'https://tu-dominio.com';

    // 4. Configurar la preferencia
    const preference = new Preference(client);
    const preferenceData = {
      body: {
        items: [
          {
            title: planName,
            quantity: 1,
            unit_price: Number(price),
            currency_id: 'ARS',
          }
        ],
        payer: {
          email: email,
        },
        back_urls: {
          success: `${baseUrl}/checkout/success`,
          failure: `${baseUrl}/checkout/failure`,
          pending: `${baseUrl}/checkout/pending`,
        },
        auto_return: 'approved',
        notification_url: `${baseUrl}/api/mercadopago/webhook`,
        external_reference: externalReference,
      }
    };

    // 5. Crear la preferencia en Mercado Pago
    const response = await preference.create(preferenceData);

    // Retornar la respuesta exitosa al frontend
    return res.status(200).json({
      success: true,
      init_point: response.init_point,
      external_reference: externalReference
    });

  } catch (error) {
    console.error("Error al crear Preferencia de Mercado Pago:", error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error interno al comunicarse con Mercado Pago'
    });
  }
}
