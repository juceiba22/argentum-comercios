import { supabase } from './supabaseClient';
import { isDemoMode, getDemoRubro } from './demoService';

const getMockPromociones = () => {
  const rubro = getDemoRubro();
  const promos = {
    'pet-shop': [
      { id: 'p1', titulo: 'Miércoles de Mascotas', descripcion: '15% de descuento en Alimento Balanceado para perros y gatos.', activa: true, descuento_porcentaje: 15 },
      { id: 'p2', titulo: 'Combo Baño', descripcion: 'Llevando un shampoo de mascotas, 30% de descuento en el segundo.', activa: true, descuento_porcentaje: 30 }
    ],
    'panaderia': [
      { id: 'p1', titulo: 'Desayuno de Campeones', descripcion: 'Llevando 1 docena de facturas, te regalamos un felipe.', activa: true, descuento_porcentaje: 10 },
      { id: 'p2', titulo: 'Tarde de Tortas', descripcion: '20% de descuento en tartas dulces después de las 18hs.', activa: true, descuento_porcentaje: 20 }
    ],
    'mini-mercado': [
      { id: 'p1', titulo: 'Promo Bebidas', descripcion: 'Llevando 2 Coca Colas de 1.5L, 50% de descuento en la segunda unidad.', activa: true, descuento_porcentaje: 25 },
      { id: 'p2', titulo: 'Descuento Lácteos', descripcion: '10% de descuento en todos los lácteos abonando en efectivo.', activa: true, descuento_porcentaje: 10 }
    ],
    'dietetica': [
      { id: 'p1', titulo: 'Granola Fest', descripcion: '15% de descuento llevando más de 1kg de granola suelta.', activa: true, descuento_porcentaje: 15 },
      { id: 'p2', titulo: 'Sin TACC Special', descripcion: '10% de descuento en harinas de almendras y coco.', activa: true, descuento_porcentaje: 10 }
    ],
    'fiambreria': [
      { id: 'p1', titulo: 'Viernes de Picadas', descripcion: 'Comprando 300g de fiambres variados, queso Tybo gratis (100g).', activa: true, descuento_porcentaje: 15 },
      { id: 'p2', titulo: 'Salame & Queso Combo', descripcion: 'Lleva 1 pieza de Salame Milán + Queso Barra con 10% OFF.', activa: true, descuento_porcentaje: 10 }
    ],
    'carniceria': [
      { id: 'p1', titulo: 'Finde de Asado', descripcion: '15% de descuento llevando más de 3kg de Asado de Tira.', activa: true, descuento_porcentaje: 15 },
      { id: 'p2', titulo: 'Milas Express', descripcion: '10% OFF en Milanesa de Nalga de Martes a Jueves.', activa: true, descuento_porcentaje: 10 }
    ],
    'verduleria': [
      { id: 'p1', titulo: 'Feria del Tomate', descripcion: '20% de descuento llevando más de 2kg de Tomate Redondo.', activa: true, descuento_porcentaje: 20 },
      { id: 'p2', titulo: 'Combo Ensalada', descripcion: 'Llevando 1kg de lechuga, te llevas 1kg de papas con 30% de descuento.', activa: true, descuento_porcentaje: 15 }
    ],
    'ferreteria': [
      { id: 'p1', titulo: 'Semana de Herramientas', descripcion: '15% de descuento en taladros y herramientas eléctricas Dowen Pagio.', activa: true, descuento_porcentaje: 15 },
      { id: 'p2', titulo: 'Kit Ajuste', descripcion: 'Llevando un martillo, obtienes 10% de descuento en destornilladores.', activa: true, descuento_porcentaje: 10 }
    ],
    'profesionales': [
      { id: 'p1', titulo: 'Primera Consulta', descripcion: '10% de descuento de bienvenida en tu primera hora de consulta.', activa: true, descuento_porcentaje: 10 },
      { id: 'p2', titulo: 'Abono Corporativo', descripcion: '15% de descuento en contratos de abonos anuales contratados este mes.', activa: true, descuento_porcentaje: 15 }
    ]
  };

  return promos[rubro] || promos['carniceria'];
};

export const getPromocionesActivas = async () => {
  if (isDemoMode()) {
    return getMockPromociones();
  }

  const { data, error } = await supabase
    .from('promociones')
    .select('*')
    .eq('activa', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getAllPromociones = async () => {
  if (isDemoMode()) {
    return getMockPromociones();
  }

  const { data, error } = await supabase
    .from('promociones')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createPromocion = async (promoData) => {
  if (isDemoMode()) {
    const promos = getMockPromociones();
    const newPromo = { ...promoData, id: 'promo-' + Date.now() };
    promos.push(newPromo);
    return newPromo;
  }

  const { data, error } = await supabase
    .from('promociones')
    .insert([promoData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updatePromocion = async (id, updates) => {
  if (isDemoMode()) {
    return { id, ...updates };
  }

  const { data, error } = await supabase
    .from('promociones')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deletePromocion = async (id) => {
  if (isDemoMode()) {
    return true;
  }

  const { error } = await supabase
    .from('promociones')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

