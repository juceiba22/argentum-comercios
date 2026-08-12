import { Package, Store, ShieldCheck, Check, Star, Zap } from 'lucide-react';

export const planesComerciales = [
  {
    id: 'lite',
    titulo: 'Versión Lite',
    precio: '49.999',
    precioNum: 49999,
    recurrencia: 'mensuales',
    icono: ShieldCheck,
    destacado: false,
    features: [
      'Módulo contable exclusivo',
      'Asignación de un contador dedicado',
      'Contabilidad al día garantizada',
      'Gestión fiscal e impositiva ante ARCA'
    ]
  },
  {
    id: 'pro',
    titulo: 'Versión Pro',
    precio: '74.999',
    precioNum: 74999,
    recurrencia: 'mensuales',
    icono: Package,
    destacado: false,
    features: [
      'Todo lo del plan Lite',
      'Control y gestión de inventario',
      'Control de stocks multidepósito',
      'Flujo de caja y registro de ventas'
    ]
  },
  {
    id: 'pro-max',
    titulo: 'Versión Pro Max',
    precio: '99.999',
    precioNum: 99999,
    recurrencia: 'mensuales',
    icono: Star,
    destacado: true,
    features: [
      'Todos los módulos incluidos',
      'Módulo Administrativo y Contable',
      'Campañas Comerciales y WhatsApp',
      'Soporte prioritario 24/7'
    ]
  }
];
