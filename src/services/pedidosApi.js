import { supabase } from './supabaseClient';
import { registrarMovimiento } from './erpApi';
import { isDemoMode, demoDb } from './demoService';

// 1. Obtener todos los pedidos junto con el nombre del cliente
export const getTodosLosPedidos = async () => {
  if (isDemoMode()) {
    return demoDb.getPedidos();
  }

  const { data, error } = await supabase
    .from('pedidos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// 2. Crear un pedido y sus ítems de forma relacionada
export const createPedidoCompleto = async (mesa, items) => {
  if (isDemoMode()) {
    const totalPedido = items.reduce((acc, item) => acc + (item.cantidad * item.precio_unitario), 0);
    const parsedItems = items.map(it => ({
      id: it.producto_id || it.id,
      nombre: it.producto_nombre || it.nombre,
      cantidad: it.cantidad,
      precio_unitario: it.precio_unitario
    }));
    return demoDb.addPedido({ mesa: parseInt(mesa, 10), total: totalPedido }, parsedItems, [], 'Admin Demo');
  }

  // A. Calcular el total del pedido sumando subtotal de los items
  const totalPedido = items.reduce((acc, item) => acc + (item.cantidad * item.precio_unitario), 0);

  // B. Insertar el registro principal en la tabla pedidos
  const { data: pedidoData, error: pedidoError } = await supabase
    .from('pedidos')
    .insert([
      { 
        mesa: parseInt(mesa, 10), 
        estado: 'Pendiente', 
        total: totalPedido 
      }
    ])
    .select()
    .single();

  if (pedidoError) throw pedidoError;

  // C. Preparar los datos de los ítems con el pedido_id recién generado
  const itemsAInsertar = items.map(item => ({
    pedido_id: pedidoData.id,
    producto_nombre: item.producto_nombre,
    cantidad: item.cantidad,
    precio_unitario: item.precio_unitario
  }));

  // D. Insertar todos los ítems en la tabla items_pedido
  const { error: itemsError } = await supabase
    .from('items_pedido')
    .insert(itemsAInsertar);

  if (itemsError) throw itemsError;

  return pedidoData;
};

// 3. Actualizar el estado de un pedido específico
export const updateEstadoPedido = async (pedidoId, nuevoEstado) => {
  if (isDemoMode()) {
    const pedidos = await demoDb.getPedidos();
    const index = pedidos.findIndex(p => p.id === pedidoId);
    if (index !== -1) {
      pedidos[index].estado = nuevoEstado;
      localStorage.setItem(`argentum_demo_${localStorage.getItem('argentum_rubro')}_pedidos`, JSON.stringify(pedidos));
      return pedidos[index];
    }
    return null;
  }

  const { data, error } = await supabase
    .from('pedidos')
    .update({ estado: nuevoEstado })
    .eq('id', pedidoId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// 5. Obtener cobros realizados (Auditoría de Caja)
export const getCobrosRealizados = async () => {
  if (isDemoMode()) {
    const pedidos = await demoDb.getPedidos();
    return pedidos.filter(p => p.estado === 'Pagado' || p.estado === 'Entregado');
  }

  const { data, error } = await supabase
    .from('pedidos')
    .select('*')
    .eq('estado', 'Pagado')
    .order('fecha_cobro', { ascending: false, nullsFirst: false });

  if (error) throw error;
  return data;
};

// 4. Actualizar estado y datos de cobro financiero desde Point
export const updateCobroPedido = async (pedidoId, paymentData) => {
  if (isDemoMode()) {
    const pedidos = await demoDb.getPedidos();
    const index = pedidos.findIndex(p => p.id === pedidoId);
    if (index !== -1) {
      pedidos[index].estado = 'Pagado';
      pedidos[index].payment_id = paymentData.id ? String(paymentData.id) : `POINT-${Date.now()}`;
      pedidos[index].payment_status = paymentData.status || 'approved';
      pedidos[index].medio_pago = 'mercado_pago_point';
      pedidos[index].fecha_cobro = new Date().toISOString();
      localStorage.setItem(`argentum_demo_${localStorage.getItem('argentum_rubro')}_pedidos`, JSON.stringify(pedidos));
      return pedidos[index];
    }
    return null;
  }

  const { data, error } = await supabase
    .from('pedidos')
    .update({ 
      estado: 'Pagado',
      payment_id: paymentData.id ? String(paymentData.id) : `POINT-${Date.now()}`,
      payment_status: paymentData.status || 'approved',
      medio_pago: 'mercado_pago_point',
      fecha_cobro: new Date().toISOString()
    })
    .eq('id', pedidoId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// 6. Registrar venta directa desde Market
export const registrarVentaDirecta = async (total, medioPago, items = [], clienteId = null) => {
  if (isDemoMode()) {
    const parsedItems = items.map(it => ({
      id: it.producto.id,
      nombre: it.producto.nombre,
      cantidad: it.cantidad,
      precio_unitario: it.producto.precio_unitario
    }));
    return demoDb.addPedido({ total, medio_pago: medioPago, cliente_id: clienteId }, parsedItems, [], 'Admin Demo');
  }

  const { data, error } = await supabase
    .from('pedidos')
    .insert([{
      estado: 'Pagado',
      total: total,
      medio_pago: medioPago,
      cliente_id: clienteId,
      fecha_cobro: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw error;

  if (items && items.length > 0) {
    const itemsAInsertar = items.map(item => ({
      pedido_id: data.id,
      producto_nombre: item.producto.nombre,
      cantidad: item.cantidad,
      precio_unitario: item.producto.precio_unitario
    }));
    
    const { error: itemsError } = await supabase
      .from('items_pedido')
      .insert(itemsAInsertar);
      
    if (itemsError) console.error("Error al guardar items del pedido:", itemsError);
  }

  try {
    await registrarMovimiento({
      tipo: 'INGRESO',
      monto: total,
      categoria: 'Venta',
      origen_id: data.id,
      descripcion: `Venta Mostrador (${medioPago})`,
      usuario_auditoria: 'Sistema'
    });
  } catch (e) {
    console.error("No se pudo registrar el movimiento financiero", e);
  }

  return data;
};

// 7. Registrar pedido web público
export const registrarPedidoWeb = async (total, items, datosEntrega) => {
  if (isDemoMode()) {
    const parsedItems = items.map(it => ({
      id: it.id,
      nombre: it.nombre_producto,
      cantidad: it.cantidad_carrito,
      precio_unitario: it.precio_promocional
    }));
    return demoDb.addPedido({ total, notes: datosEntrega.direccion, mesa: 0 }, parsedItems, [], 'Cliente Web');
  }

  const { data, error } = await supabase
    .from('pedidos')
    .insert([{
      mesa: 0, // 0 = Pedido Web
      estado: 'Pendiente',
      total: total,
      medio_pago: 'A convenir',
      notas: `WEB - ${datosEntrega.metodo} ${datosEntrega.direccion ? '- ' + datosEntrega.direccion : ''}`,
    }])
    .select()
    .single();

  if (error) {
    console.error("Error al insertar pedido web:", error);
    throw error;
  }

  if (items && items.length > 0) {
    const itemsAInsertar = items.map(item => ({
      pedido_id: data.id,
      producto_nombre: item.nombre_producto,
      cantidad: item.cantidad_carrito,
      precio_unitario: item.precio_promocional
    }));
    
    const { error: itemsError } = await supabase
      .from('items_pedido')
      .insert(itemsAInsertar);
      
    if (itemsError) console.error("Error al guardar items del pedido web:", itemsError);
  }

  return data;
};
