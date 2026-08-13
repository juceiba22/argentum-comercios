import { Package, Store, ShieldCheck, Check, Star, Zap } from 'lucide-react';

export const planesComerciales = [
  {
    id: 'lite',
    titulo: 'Versión Lite',
    precio: '49.999',
    precioNum: 49999,
    recurrencia: 'mensuales',
    icono: ShieldCheck,
    destacado: true,
    disponible: true,
    features: [
      'Gestión de inventario',
      'Punto de venta',
      'Contabilidad y facturación electrónica ARCA'
    ]
  },
  {
    id: 'pro',
    titulo: 'Versión Pro (NO disponible)',
    precio: '74.999',
    precioNum: 74999,
    recurrencia: 'mensuales',
    icono: Package,
    destacado: false,
    disponible: false,
    features: [
      'Lite + Automatización de ventas',
      'Página e-commerce',
      'Acompañante IA para tu negocio'
    ]
  },
  {
    id: 'max',
    titulo: 'Versión Max (NO disponible)',
    precio: '99.999',
    precioNum: 99999,
    recurrencia: 'mensuales',
    icono: Star,
    destacado: false,
    disponible: false,
    features: [
      'Pro + Asesoría contable',
      'Gestión fiscal e impositiva ante ARCA'
    ]
  }
];
