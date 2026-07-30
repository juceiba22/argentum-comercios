// Servicio de simulación en memoria y localStorage para el Modo Demo
// Permite que la app funcione sin depender de Supabase y con datos específicos de cada rubro.

export const getDemoRubro = () => {
  return localStorage.getItem('argentum_rubro') || 'carniceria';
};

export const isDemoMode = () => {
  return localStorage.getItem('argentum_demo_mode') === 'true';
};

const SEED_DATA = {
  'pet-shop': {
    inventario: [
      { id: 'pet-1', nombre: 'Alimento Balanceado Perro Adulto 15kg', cantidad: 25, unidad_medida: 'unidades', precio_unitario: 18500, imagen_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=150&auto=format&fit=crop&q=60' },
      { id: 'pet-2', nombre: 'Juguete Hueso de Goma', cantidad: 40, unidad_medida: 'unidades', precio_unitario: 2400, imagen_url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=150&auto=format&fit=crop&q=60' },
      { id: 'pet-3', nombre: 'Pipeta Antiparasitaria Perro Mediano', cantidad: 50, unidad_medida: 'unidades', precio_unitario: 3200, imagen_url: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=150&auto=format&fit=crop&q=60' },
      { id: 'pet-4', nombre: 'Shampoo Mascotas Avena 500ml', cantidad: 15, unidad_medida: 'litros', precio_unitario: 4500, imagen_url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=150&auto=format&fit=crop&q=60' },
      { id: 'pet-5', nombre: 'Rascador Gato 2 Niveles', cantidad: 8, unidad_medida: 'unidades', precio_unitario: 29000, imagen_url: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=150&auto=format&fit=crop&q=60' },
      { id: 'pet-6', nombre: 'Piedras Sanitarias Gatos 4kg', cantidad: 35, unidad_medida: 'paquetes', precio_unitario: 3900, imagen_url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=150&auto=format&fit=crop&q=60' }
    ],
    clientes: [
      { id: 'c-1', nombre: 'María González', email: 'maria.g@gmail.com', telefono: '1123456789', cuit: '27301234568', doc_tipo: 96, doc_nro: '30123456', condicion_iva: 'CF' },
      { id: 'c-2', nombre: 'Pedro Gómez (Veterinaria Sur)', email: 'vet.sur@gmail.com', telefono: '1198765432', cuit: '20256543219', doc_tipo: 80, doc_nro: '20256543219', condicion_iva: 'RI' }
    ],
    proveedores: [
      { id: 'p-1', nombre: 'Distribuidora Mascota Feliz', email: 'pedidos@mascotafeliz.com', telefono: '0810-999-8888', cuit: '30712345678', condicion_iva: 'RI' },
      { id: 'p-2', nombre: 'Laboratorio Veterinaria Argentina', email: 'ventas@labvet.com', telefono: '1154321098', cuit: '33543210989', condicion_iva: 'RI' }
    ],
    gastos: [
      { id: 'g-1', rubro: 'Alquiler local', importe: 120000, fecha: '2026-07-01', categoria_principal: 'Costos Fijos', descripcion: 'Mes de Julio' },
      { id: 'g-2', rubro: 'Luz EDENOR', importe: 25000, fecha: '2026-07-10', categoria_principal: 'Costos Fijos', descripcion: 'Factura mensual' }
    ],
    compras: [
      { id: 'comp-1', proveedor_id: 'p-1', importe: 180000, fecha: '2026-07-05', estado: 'Pagada', created_at: '2026-07-05T12:00:00Z' }
    ],
    pedidos: [
      { id: 'ped-1', cliente_id: 'c-1', total: 20900, estado: 'Entregado', created_at: '2026-07-15T15:30:00Z', doc_tipo: 99, doc_nro: '0', condicion_iva: 'CF' }
    ]
  },
  'panaderia': {
    inventario: [
      { id: 'pan-1', nombre: 'Medialunas de Grasa (Docena)', cantidad: 45, unidad_medida: 'unidades', precio_unitario: 5200, imagen_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=150&auto=format&fit=crop&q=60' },
      { id: 'pan-2', nombre: 'Pan Felipe (kg)', cantidad: 80, unidad_medida: 'kg', precio_unitario: 2400, imagen_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&auto=format&fit=crop&q=60' },
      { id: 'pan-3', nombre: 'Facturas Surtidas (Docena)', cantidad: 30, unidad_medida: 'unidades', precio_unitario: 5800, imagen_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&auto=format&fit=crop&q=60' },
      { id: 'pan-4', nombre: 'Prepizza de Tomate (unidad)', cantidad: 20, unidad_medida: 'unidades', precio_unitario: 1200, imagen_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&auto=format&fit=crop&q=60' },
      { id: 'pan-5', nombre: 'Torta de Ricota', cantidad: 6, unidad_medida: 'unidades', precio_unitario: 8500, imagen_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&auto=format&fit=crop&q=60' }
    ],
    clientes: [
      { id: 'c-1', nombre: 'Juan Pérez', email: 'juan.p@gmail.com', telefono: '1155556666', cuit: '20202223334', doc_tipo: 96, doc_nro: '20222333', condicion_iva: 'CF' },
      { id: 'c-2', nombre: 'Catering Gourmet', email: 'info@gourmet.com', telefono: '1199998888', cuit: '30444455556', doc_tipo: 80, doc_nro: '30444455556', condicion_iva: 'RI' }
    ],
    proveedores: [
      { id: 'p-1', nombre: 'Molinos Río de la Plata', email: 'ventas@molinos.com', telefono: '1166667777', cuit: '30500008454', condicion_iva: 'RI' },
      { id: 'p-2', nombre: 'Distribuidora Levaduras del Sur', email: 'levasur@gmail.com', telefono: '1133334444', cuit: '30666677778', condicion_iva: 'RI' }
    ],
    gastos: [
      { id: 'g-1', rubro: 'Harina e insumos panaderos', importe: 90000, fecha: '2026-07-02', categoria_principal: 'Costos Fijos', descripcion: 'Compra urgente harina' },
      { id: 'g-2', rubro: 'Gas Natural (Gas Ban)', importe: 45000, fecha: '2026-07-12', categoria_principal: 'Costos Fijos', descripcion: 'Boleta bimestral hornos' }
    ],
    compras: [
      { id: 'comp-1', proveedor_id: 'p-1', importe: 120000, fecha: '2026-07-04', estado: 'Pagada', created_at: '2026-07-04T10:00:00Z' }
    ],
    pedidos: [
      { id: 'ped-1', cliente_id: 'c-1', total: 10400, estado: 'Entregado', created_at: '2026-07-16T11:00:00Z', doc_tipo: 99, doc_nro: '0', condicion_iva: 'CF' }
    ]
  },
  'mini-mercado': {
    inventario: [
      { id: 'mini-1', nombre: 'Coca Cola Original 1.5L', cantidad: 120, unidad_medida: 'unidades', precio_unitario: 2200, imagen_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=150&auto=format&fit=crop&q=60' },
      { id: 'mini-2', nombre: 'Yerba Mate Playadito 1kg', cantidad: 60, unidad_medida: 'kg', precio_unitario: 3800, imagen_url: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=150&auto=format&fit=crop&q=60' },
      { id: 'mini-3', nombre: 'Leche Entera La Serenísima 1L', cantidad: 40, unidad_medida: 'litros', precio_unitario: 1400, imagen_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=150&auto=format&fit=crop&q=60' },
      { id: 'mini-4', nombre: 'Fideos Tallarines Lucchetti 500g', cantidad: 150, unidad_medida: 'unidades', precio_unitario: 950, imagen_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=150&auto=format&fit=crop&q=60' },
      { id: 'mini-5', nombre: 'Galletitas Oreo 117g', cantidad: 80, unidad_medida: 'unidades', precio_unitario: 1100, imagen_url: 'https://images.unsplash.com/photo-1558961309-dbdf71791a5a?w=150&auto=format&fit=crop&q=60' }
    ],
    clientes: [
      { id: 'c-1', nombre: 'Carlos Fernández', email: 'carlos.f@hotmail.com', telefono: '1166662222', cuit: '20253456781', doc_tipo: 96, doc_nro: '25345678', condicion_iva: 'CF' }
    ],
    proveedores: [
      { id: 'p-1', nombre: 'Arcor S.A. Distribuidora', email: 'pedidos@arcor.com.ar', telefono: '0800-444-2726', cuit: '30502787834', condicion_iva: 'RI' },
      { id: 'p-2', nombre: 'Coca-Cola FEMSA', email: 'femsa@cocacola.com.ar', telefono: '1148889999', cuit: '30678901235', condicion_iva: 'RI' }
    ],
    gastos: [
      { id: 'g-1', rubro: 'Limpieza e Higiene local', importe: 15000, fecha: '2026-07-03', categoria_principal: 'Costos Fijos', descripcion: 'Artículos de limpieza' },
      { id: 'g-2', rubro: 'Abl e Impuestos Municipales', importe: 18000, fecha: '2026-07-08', categoria_principal: 'Costos Fijos', descripcion: 'Tasa mensual' }
    ],
    compras: [
      { id: 'comp-1', proveedor_id: 'p-1', importe: 250000, fecha: '2026-07-02', estado: 'Pagada', created_at: '2026-07-02T09:00:00Z' }
    ],
    pedidos: [
      { id: 'ped-1', cliente_id: 'c-1', total: 6350, estado: 'Entregado', created_at: '2026-07-17T18:15:00Z', doc_tipo: 99, doc_nro: '0', condicion_iva: 'CF' }
    ]
  },
  'dietetica': {
    inventario: [
      { id: 'diet-1', nombre: 'Mix Frutos Secos Premium 1kg', cantidad: 35, unidad_medida: 'kg', precio_unitario: 14500, imagen_url: 'https://images.unsplash.com/photo-1596560548464-f010686174d7?w=150&auto=format&fit=crop&q=60' },
      { id: 'diet-2', nombre: 'Harina de Almendras 500g', cantidad: 20, unidad_medida: 'unidades', precio_unitario: 5200, imagen_url: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=150&auto=format&fit=crop&q=60' },
      { id: 'diet-3', nombre: 'Aceite de Coco Neutro Chi 360ml', cantidad: 18, unidad_medida: 'unidades', precio_unitario: 6900, imagen_url: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=150&auto=format&fit=crop&q=60' },
      { id: 'diet-4', nombre: 'Granola Granix con Miel 1kg', cantidad: 25, unidad_medida: 'kg', precio_unitario: 5800, imagen_url: 'https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?w=150&auto=format&fit=crop&q=60' },
      { id: 'diet-5', nombre: 'Azúcar Mascabo 1kg', cantidad: 40, unidad_medida: 'kg', precio_unitario: 2200, imagen_url: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=150&auto=format&fit=crop&q=60' }
    ],
    clientes: [
      { id: 'c-1', nombre: 'Clara Domínguez', email: 'clara.d@live.com', telefono: '1133339999', cuit: '27299998887', doc_tipo: 96, doc_nro: '29999888', condicion_iva: 'CF' }
    ],
    proveedores: [
      { id: 'p-1', nombre: 'Mayorista Diet-Sur', email: 'ventas@dietsur.com', telefono: '1122221111', cuit: '30715432167', condicion_iva: 'RI' }
    ],
    gastos: [
      { id: 'g-1', rubro: 'Bolsas Kraft y packaging', importe: 12000, fecha: '2026-07-04', categoria_principal: 'Costos Fijos', descripcion: 'Embalaje ecológico' }
    ],
    compras: [
      { id: 'comp-1', proveedor_id: 'p-1', importe: 85000, fecha: '2026-07-06', estado: 'Pagada', created_at: '2026-07-06T11:00:00Z' }
    ],
    pedidos: [
      { id: 'ped-1', cliente_id: 'c-1', total: 11200, estado: 'Entregado', created_at: '2026-07-18T10:30:00Z', doc_tipo: 99, doc_nro: '0', condicion_iva: 'CF' }
    ]
  },
  'fiambreria': {
    inventario: [
      { id: 'fiam-1', nombre: 'Jamón Cocido Paladini (100g)', cantidad: 50, unidad_medida: 'gramos', precio_unitario: 1800, imagen_url: 'https://images.unsplash.com/photo-1524438425983-97931326c710?w=150&auto=format&fit=crop&q=60' },
      { id: 'fiam-2', nombre: 'Queso Barra Tybo La Paulina (100g)', cantidad: 60, unidad_medida: 'gramos', precio_unitario: 1400, imagen_url: 'https://images.unsplash.com/photo-1486887396153-fa416525c108?w=150&auto=format&fit=crop&q=60' },
      { id: 'fiam-3', nombre: 'Salame Milán Cagnoli (100g)', cantidad: 30, unidad_medida: 'gramos', precio_unitario: 2400, imagen_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=150&auto=format&fit=crop&q=60' },
      { id: 'fiam-4', nombre: 'Mortadela con Pistachos Cagnoli (100g)', cantidad: 25, unidad_medida: 'gramos', precio_unitario: 1600, imagen_url: 'https://images.unsplash.com/photo-1524438425983-97931326c710?w=150&auto=format&fit=crop&q=60' },
      { id: 'fiam-5', nombre: 'Queso Roquefort / Azul (100g)', cantidad: 15, unidad_medida: 'gramos', precio_unitario: 3100, imagen_url: 'https://images.unsplash.com/photo-1486887396153-fa416525c108?w=150&auto=format&fit=crop&q=60' }
    ],
    clientes: [
      { id: 'c-1', nombre: 'Roberto Sánchez', email: 'roberto.s@gmail.com', telefono: '1154326789', cuit: '20154326789', doc_tipo: 96, doc_nro: '15432678', condicion_iva: 'CF' }
    ],
    proveedores: [
      { id: 'p-1', nombre: 'Frigorífico Paladini S.A.', email: 'ventas@paladini.com.ar', telefono: '0810-555-7252', cuit: '30501258954', condicion_iva: 'RI' },
      { id: 'p-2', nombre: 'Cagnoli Tandil', email: 'pedidos@cagnoli.com', telefono: '249-4440000', cuit: '30521487569', condicion_iva: 'RI' }
    ],
    gastos: [
      { id: 'g-1', rubro: 'Mantenimiento de Cortadora y heladeras', importe: 35000, fecha: '2026-07-06', categoria_principal: 'Costos Fijos', descripcion: 'Service técnico' }
    ],
    compras: [
      { id: 'comp-1', proveedor_id: 'p-1', importe: 150000, fecha: '2026-07-08', estado: 'Pagada', created_at: '2026-07-08T14:00:00Z' }
    ],
    pedidos: [
      { id: 'ped-1', cliente_id: 'c-1', total: 6800, estado: 'Entregado', created_at: '2026-07-19T13:45:00Z', doc_tipo: 99, doc_nro: '0', condicion_iva: 'CF' }
    ]
  },
  'carniceria': {
    inventario: [
      { id: 'carn-1', nombre: 'Asado de Tira (kg)', cantidad: 120, unidad_medida: 'kg', precio_unitario: 8900, imagen_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=150&auto=format&fit=crop&q=60' },
      { id: 'carn-2', nombre: 'Vacío (kg)', cantidad: 90, unidad_medida: 'kg', precio_unitario: 9800, imagen_url: 'https://images.unsplash.com/photo-1551028598-a37a1f59998d?w=150&auto=format&fit=crop&q=60' },
      { id: 'carn-3', nombre: 'Milanesa de Nalga (kg)', cantidad: 60, unidad_medida: 'kg', precio_unitario: 7500, imagen_url: 'https://images.unsplash.com/photo-1598103442097-8b743e2b902a?w=150&auto=format&fit=crop&q=60' },
      { id: 'carn-4', nombre: 'Pechuga de Pollo (kg)', cantidad: 80, unidad_medida: 'kg', precio_unitario: 4800, imagen_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=150&auto=format&fit=crop&q=60' },
      { id: 'carn-5', nombre: 'Chorizo Bombón (kg)', cantidad: 45, unidad_medida: 'kg', precio_unitario: 4200, imagen_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=150&auto=format&fit=crop&q=60' }
    ],
    clientes: [
      { id: 'c-1', nombre: 'Juan Manuel Fangio', email: 'chueco@fangio.com', telefono: '2266432109', cuit: '20045678901', doc_tipo: 96, doc_nro: '4567890', condicion_iva: 'CF' }
    ],
    proveedores: [
      { id: 'p-1', nombre: 'Frigorífico Central del Plata', email: 'abasto@centraldelplata.com', telefono: '1177778888', cuit: '30456123789', condicion_iva: 'RI' }
    ],
    gastos: [
      { id: 'g-1', rubro: 'Electricidad trifásica (Cámaras)', importe: 68000, fecha: '2026-07-05', categoria_principal: 'Costos Fijos', descripcion: 'Luz Julio' }
    ],
    compras: [
      { id: 'comp-1', proveedor_id: 'p-1', importe: 450000, fecha: '2026-07-03', estado: 'Pagada', created_at: '2026-07-03T07:30:00Z' }
    ],
    pedidos: [
      { id: 'ped-1', cliente_id: 'c-1', total: 18700, estado: 'Entregado', created_at: '2026-07-19T12:00:00Z', doc_tipo: 99, doc_nro: '0', condicion_iva: 'CF' }
    ]
  },
  'verduleria': {
    inventario: [
      { id: 'verd-1', nombre: 'Tomate Redondo (kg)', cantidad: 100, unidad_medida: 'kg', precio_unitario: 1500, imagen_url: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=150&auto=format&fit=crop&q=60' },
      { id: 'verd-2', nombre: 'Lechuga Capuchina (kg)', cantidad: 50, unidad_medida: 'kg', precio_unitario: 1200, imagen_url: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=150&auto=format&fit=crop&q=60' },
      { id: 'verd-3', nombre: 'Bananas Ecuador (kg)', cantidad: 80, unidad_medida: 'kg', precio_unitario: 1800, imagen_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=150&auto=format&fit=crop&q=60' },
      { id: 'verd-4', nombre: 'Manzanas Rojas (kg)', cantidad: 70, unidad_medida: 'kg', precio_unitario: 2200, imagen_url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=150&auto=format&fit=crop&q=60' },
      { id: 'verd-5', nombre: 'Papas Cepilladas (kg)', cantidad: 200, unidad_medida: 'kg', precio_unitario: 800, imagen_url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&auto=format&fit=crop&q=60' }
    ],
    clientes: [
      { id: 'c-1', nombre: 'Norma Ruiz', email: 'norma.ruiz@gmail.com', telefono: '1143219876', cuit: '27156789012', doc_tipo: 96, doc_nro: '15678901', condicion_iva: 'CF' }
    ],
    proveedores: [
      { id: 'p-1', nombre: 'Cooperativa Mercado Central', email: 'ventas@mercadocentral.com', telefono: '1133334444', cuit: '30444555667', condicion_iva: 'RI' }
    ],
    gastos: [
      { id: 'g-1', rubro: 'Electricidad (Heladeras de exhibición)', importe: 35000, fecha: '2026-07-04', categoria_principal: 'Costos Fijos', descripcion: 'Luz Julio' }
    ],
    compras: [
      { id: 'comp-1', proveedor_id: 'p-1', importe: 120000, fecha: '2026-07-06', estado: 'Pagada', created_at: '2026-07-06T10:00:00Z' }
    ],
    pedidos: [
      { id: 'ped-1', cliente_id: 'c-1', total: 4700, estado: 'Entregado', created_at: '2026-07-20T11:30:00Z', doc_tipo: 99, doc_nro: '0', condicion_iva: 'CF' }
    ]
  },
  'ferreteria': {
    inventario: [
      { id: 'ferr-1', nombre: 'Martillo Galponero Stanley', cantidad: 15, unidad_medida: 'unidades', precio_unitario: 14500, imagen_url: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=150&auto=format&fit=crop&q=60' },
      { id: 'ferr-2', nombre: 'Destornillador Phillips 1/4x4', cantidad: 30, unidad_medida: 'unidades', precio_unitario: 3200, imagen_url: 'https://images.unsplash.com/photo-1530124560072-aee707f1f7b5?w=150&auto=format&fit=crop&q=60' },
      { id: 'ferr-3', nombre: 'Cinta Métrica 5m Stanley', cantidad: 25, unidad_medida: 'unidades', precio_unitario: 6800, imagen_url: 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?w=150&auto=format&fit=crop&q=60' },
      { id: 'ferr-4', nombre: 'Caja de Clavos de 2 pulgadas (kg)', cantidad: 40, unidad_medida: 'kg', precio_unitario: 4500, imagen_url: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=150&auto=format&fit=crop&q=60' },
      { id: 'ferr-5', nombre: 'Taladro Percutor 650W Dowen Pagio', cantidad: 5, unidad_medida: 'unidades', precio_unitario: 65000, imagen_url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=150&auto=format&fit=crop&q=60' }
    ],
    clientes: [
      { id: 'c-1', nombre: 'Héctor Construcciones', email: 'hector.const@gmail.com', telefono: '1155667788', cuit: '20233445561', doc_tipo: 80, doc_nro: '20233445561', condicion_iva: 'RI' }
    ],
    proveedores: [
      { id: 'p-1', nombre: 'Ferretería Industrial Mayorista', email: 'pedidos@ferreindustrial.com', telefono: '1148887777', cuit: '30555666778', condicion_iva: 'RI' }
    ],
    gastos: [
      { id: 'g-1', rubro: 'Alquiler de local comercial', importe: 160000, fecha: '2026-07-01', categoria_principal: 'Costos Fijos', descripcion: 'Alquiler Julio' }
    ],
    compras: [
      { id: 'comp-1', proveedor_id: 'p-1', importe: 350000, fecha: '2026-07-05', estado: 'Pagada', created_at: '2026-07-05T09:00:00Z' }
    ],
    pedidos: [
      { id: 'ped-1', cliente_id: 'c-1', total: 28100, estado: 'Entregado', created_at: '2026-07-20T16:00:00Z', doc_tipo: 80, doc_nro: '20233445561', condicion_iva: 'RI' }
    ]
  }
};

export const initializeDemoDatabase = (rubro, forceReset = false) => {
  const seed = SEED_DATA[rubro] || SEED_DATA['carniceria'];

  const setIfEmpty = (key, defaultData) => {
    const fullKey = `argentum_demo_${rubro}_${key}`;
    if (forceReset || !localStorage.getItem(fullKey)) {
      localStorage.setItem(fullKey, JSON.stringify(defaultData));
    }
  };

  setIfEmpty('inventario', seed.inventario);
  setIfEmpty('clientes', seed.clientes);
  setIfEmpty('proveedores', seed.proveedores);
  setIfEmpty('gastos', seed.gastos);
  setIfEmpty('compras', seed.compras);
  setIfEmpty('pedidos', seed.pedidos);
  
  const fullMovsKey = `argentum_demo_${rubro}_movimientos`;
  if (forceReset || !localStorage.getItem(fullMovsKey)) {
    const movs = [];
    seed.gastos.forEach(g => {
      movs.push({
        id: g.id,
        tipo: 'EGRESO',
        monto: g.importe,
        categoria: g.categoria_principal,
        descripcion: g.rubro,
        created_at: g.fecha + 'T12:00:00Z'
      });
    });
    seed.compras.forEach(c => {
      movs.push({
        id: c.id,
        tipo: 'EGRESO',
        monto: c.importe,
        categoria: 'Proveedor',
        descripcion: `Compra Reposición (${c.id.substring(0,8)})`,
        created_at: c.created_at
      });
    });
    seed.pedidos.forEach(p => {
      movs.push({
        id: p.id,
        tipo: 'INGRESO',
        monto: p.total,
        categoria: 'Ventas POS',
        descripcion: `Venta Facturada (#${p.id.substring(0,8)})`,
        created_at: p.created_at
      });
    });
    localStorage.setItem(fullMovsKey, JSON.stringify(movs));
  }

  const fullCajasKey = `argentum_demo_${rubro}_cajas`;
  if (forceReset || !localStorage.getItem(fullCajasKey)) {
    localStorage.setItem(fullCajasKey, JSON.stringify([
      { id: 'caja-1', usuario_email: `admin@${rubro}.com`, estado: 'cerrada', saldo_inicial: 5000, fecha_apertura: '2026-07-19T08:00:00Z', fecha_cierre: '2026-07-19T18:00:00Z' }
    ]));
  }
};

const getList = (key) => {
  const rubro = getDemoRubro();
  const fullKey = `argentum_demo_${rubro}_${key}`;
  return JSON.parse(localStorage.getItem(fullKey) || '[]');
};

const saveList = (key, list) => {
  const rubro = getDemoRubro();
  const fullKey = `argentum_demo_${rubro}_${key}`;
  localStorage.setItem(fullKey, JSON.stringify(list));
};

export const demoDb = {
  getInventario: async () => {
    return getList('inventario');
  },
  addInventario: async (item) => {
    const list = getList('inventario');
    const newItem = { ...item, id: 'item-' + Date.now().toString(36) };
    list.push(newItem);
    saveList('inventario', list);
    return newItem;
  },
  updateInventario: async (id, itemData) => {
    const list = getList('inventario');
    const index = list.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Producto no encontrado');
    list[index] = { ...list[index], ...itemData, updated_at: new Date().toISOString() };
    saveList('inventario', list);
    return list[index];
  },
  deleteInventario: async (id) => {
    const list = getList('inventario');
    const newList = list.filter(i => i.id !== id);
    saveList('inventario', newList);
    return true;
  },

  getClientes: async () => {
    return getList('clientes');
  },
  addCliente: async (cliente) => {
    const list = getList('clientes');
    const newCliente = { ...cliente, id: 'cli-' + Date.now().toString(36), created_at: new Date().toISOString() };
    list.push(newCliente);
    saveList('clientes', list);
    return newCliente;
  },
  updateCliente: async (id, clienteData) => {
    const list = getList('clientes');
    const index = list.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Cliente no encontrado');
    list[index] = { ...list[index], ...clienteData };
    saveList('clientes', list);
    return list[index];
  },
  getClienteById: async (id) => {
    const list = getList('clientes');
    return list.find(i => i.id === id) || null;
  },

  getProveedores: async () => {
    return getList('proveedores');
  },
  addProveedor: async (prov) => {
    const list = getList('proveedores');
    const newProv = { ...prov, id: 'prov-' + Date.now().toString(36) };
    list.push(newProv);
    saveList('proveedores', list);
    return newProv;
  },
  updateProveedor: async (id, provData) => {
    const list = getList('proveedores');
    const index = list.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Proveedor no encontrado');
    list[index] = { ...list[index], ...provData };
    saveList('proveedores', list);
    return list[index];
  },
  deleteProveedor: async (id) => {
    const list = getList('proveedores');
    const newList = list.filter(i => i.id !== id);
    saveList('proveedores', newList);
    return true;
  },

  getMovimientos: async () => {
    return getList('movimientos');
  },
  addMovimiento: async (mov) => {
    const list = getList('movimientos');
    const newMov = { ...mov, id: 'mov-' + Date.now().toString(36), created_at: new Date().toISOString() };
    list.unshift(newMov);
    saveList('movimientos', list);
    return newMov;
  },

  getGastos: async () => {
    return getList('gastos');
  },
  addGasto: async (gasto, user) => {
    const list = getList('gastos');
    const newGasto = { ...gasto, id: 'gas-' + Date.now().toString(36), created_at: new Date().toISOString() };
    list.unshift(newGasto);
    saveList('gastos', list);

    await demoDb.addMovimiento({
      tipo: 'EGRESO',
      monto: newGasto.importe,
      categoria: newGasto.categoria_principal,
      origen_id: newGasto.id,
      descripcion: newGasto.rubro,
      usuario_auditoria: user
    });

    return newGasto;
  },

  getCompras: async () => {
    const compras = getList('compras');
    const proveedores = getList('proveedores');
    return compras.map(c => ({
      ...c,
      proveedores: proveedores.find(p => p.id === c.proveedor_id) || { nombre: 'Proveedor Ficticio' }
    }));
  },
  addCompra: async (compraData, items, user) => {
    const compras = getList('compras');
    const newCompra = {
      ...compraData,
      id: 'comp-' + Date.now().toString(36),
      estado: 'Pagada',
      created_at: new Date().toISOString(),
      usuario_auditoria: user
    };
    compras.unshift(newCompra);
    saveList('compras', compras);

    await demoDb.addMovimiento({
      tipo: 'EGRESO',
      monto: newCompra.importe,
      categoria: 'Proveedor',
      origen_id: newCompra.id,
      descripcion: `Compra Reposición (${newCompra.id.substring(0,8)})`,
      usuario_auditoria: user
    });

    const inventario = getList('inventario');
    items.forEach(item => {
      const prod = inventario.find(i => i.id === item.producto_id);
      if (prod) {
        prod.cantidad = Number(prod.cantidad) + Number(item.cantidad);
      }
    });
    saveList('inventario', inventario);

    return newCompra;
  },

  getPedidos: async () => {
    return getList('pedidos');
  },
  getPedidosByClienteId: async (clienteId) => {
    const list = getList('pedidos');
    return list.filter(p => p.cliente_id === clienteId);
  },
  addPedido: async (pedidoData, items, metodosPago, user) => {
    const list = getList('pedidos');
    const newPedido = {
      ...pedidoData,
      id: 'ped-' + Date.now().toString(36),
      estado: 'Entregado',
      created_at: new Date().toISOString(),
      items: items
    };
    list.unshift(newPedido);
    saveList('pedidos', list);

    await demoDb.addMovimiento({
      tipo: 'INGRESO',
      monto: newPedido.total,
      categoria: 'Ventas POS',
      origen_id: newPedido.id,
      descripcion: `Venta POS - Factura (${newPedido.id.substring(0,8)})`,
      usuario_auditoria: user
    });

    const inventario = getList('inventario');
    items.forEach(item => {
      const prod = inventario.find(i => i.id === item.id || i.id === item.producto_id);
      if (prod) {
        prod.cantidad = Math.max(0, Number(prod.cantidad) - Number(item.cantidad));
      }
    });
    saveList('inventario', inventario);

    return newPedido;
  },

  getCajas: async () => {
    return getList('cajas');
  },
  getCajaAbierta: async (userEmail) => {
    const list = getList('cajas');
    return list.find(c => c.usuario_email === userEmail && c.estado === 'abierta') || null;
  },
  abrirCaja: async (userEmail, saldoInicial) => {
    const list = getList('cajas');
    const abierta = list.find(c => c.usuario_email === userEmail && c.estado === 'abierta');
    if (abierta) throw new Error('Ya existe una caja abierta.');

    const newCaja = {
      id: 'caja-' + Date.now().toString(36),
      usuario_email: userEmail,
      estado: 'abierta',
      saldo_inicial: Number(saldoInicial),
      fecha_apertura: new Date().toISOString()
    };
    list.push(newCaja);
    saveList('cajas', list);
    return newCaja;
  },
  cerrarCaja: async (cajaId) => {
    const list = getList('cajas');
    const index = list.findIndex(c => c.id === cajaId);
    if (index === -1) throw new Error('Caja no encontrada');

    list[index].estado = 'cerrada';
    list[index].fecha_cierre = new Date().toISOString();
    saveList('cajas', list);
    return list[index];
  }
};
