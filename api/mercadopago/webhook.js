import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Vercel Serverless Function para procesar Webhooks de MP
export default async function handler(req, res) {
  // CORS para MP Webhooks (pre-flight)
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

  try {
    const { type, 'data.id': dataId } = req.query;
    // MP puede enviar el evento en query o en body
    const payloadType = type || req.body?.type || req.body?.topic;
    const paymentId = dataId || req.body?.data?.id;

    // Si no es un evento de pago o falta ID, devolvemos 200 rápido para que MP no reintente
    if ((payloadType !== 'payment' && payloadType !== 'payment.created' && payloadType !== 'payment.updated') || !paymentId) {
      return res.status(200).send('Not a payment event or missing ID');
    }

    // 1. Inicializar SDK de Mercado Pago
    const client = new MercadoPagoConfig({ 
      accessToken: process.env.MP_ACCESS_TOKEN || ''
    });

    const paymentApi = new Payment(client);
    
    // 2. Consultar el estado real a Mercado Pago (para evitar fraude)
    const paymentInfo = await paymentApi.get({ id: paymentId });
    
    if (!paymentInfo) {
      return res.status(200).send('Payment not found in MP');
    }

    const externalReference = paymentInfo.external_reference;
    const status = paymentInfo.status;
    const dateApproved = paymentInfo.date_approved;

    if (!externalReference) {
      return res.status(200).send('No external_reference in payment');
    }

    // 3. Inicializar Cliente Supabase
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 4. Buscar el registro pendiente
    const { data: pagoPendiente, error: findError } = await supabase
      .from('licencias_pagos')
      .select('*')
      .eq('external_reference', externalReference)
      .single();

    if (findError || !pagoPendiente) {
      console.error('No se encontró pago pendiente para external_reference:', externalReference);
      return res.status(200).send('Pending payment not found');
    }

    const { email, plan } = pagoPendiente;

    // 5. Procesar el estado
    if (status === 'approved') {
      // Actualizar a pagado
      await supabase
        .from('licencias_pagos')
        .update({ estado: 'pagado' })
        .eq('external_reference', externalReference);

      // Otorgar 1 año de vigencia (ejemplo estándar)
      const validUntil = new Date();
      validUntil.setFullYear(validUntil.getFullYear() + 1);

      // Crear o actualizar licencia activa usando el email como clave única
      await supabase
        .from('licencias_activas')
        .upsert({
          email: email,
          plan: plan,
          estado: 'activa',
          fecha_compra: dateApproved || new Date().toISOString(),
          valida_hasta: validUntil.toISOString(),
          external_reference_pago: externalReference
        }, { onConflict: 'email' });

      // Enviar email de confirmación con Resend
      if (process.env.RESEND_API_KEY) {
        try {
          const resend = new Resend(process.env.RESEND_API_KEY);
          await resend.emails.send({
            from: 'Argentum <onboarding@resend.dev>', // Importante: Cambia a tu dominio verificado en Resend en prod
            to: [email],
            subject: 'Confirmación de Pago - Argentum Comercios',
            html: `
              <h2>¡Pago Confirmado!</h2>
              <p>Hola,</p>
              <p>Hemos recibido correctamente tu pago para el <strong>${plan}</strong>.</p>
              <p>Tu licencia ya se encuentra activa y será válida hasta el ${validUntil.toLocaleDateString('es-AR')}.</p>
              <p>Ya puedes acceder y disfrutar de todas las funcionalidades del sistema.</p>
              <br/>
              <p>Saludos cordiales,<br/>El equipo de Argentum</p>
            `
          });
          console.log(`Email enviado a ${email}`);
        } catch (emailError) {
          console.error('Error enviando email con Resend:', emailError);
        }
      }

    } else if (status === 'rejected' || status === 'cancelled') {
      // Actualizar a rechazado
      await supabase
        .from('licencias_pagos')
        .update({ estado: 'rechazado' })
        .eq('external_reference', externalReference);
    }

    // Retornar HTTP 200 obligatoriamente
    return res.status(200).send('OK');

  } catch (error) {
    console.error('Error procesando Webhook de MP:', error);
    // En caso de fallo de red/DB devolvemos 500 para que MP lo reintente luego
    return res.status(500).send('Internal Server Error');
  }
}
