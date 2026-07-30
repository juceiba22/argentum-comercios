import React, { useEffect, useState } from 'react';
import { PackageSearch, Plus, Trash2, Edit2, Check, X, AlertCircle, TrendingUp } from 'lucide-react';
import { getInventario, addMercaderia, updateMercaderia, deleteMercaderia, uploadImage } from '../services/inventarioApi';
import { handleImageError } from '../services/imageHelper';
import { getDemoRubro } from '../services/demoService';

const UNIDADES_MEDIDA = ['kg', 'gramos', 'unidades', 'paquetes', 'litros'];

export default function Inventario() {
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para nuevo insumo
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaCantidad, setNuevaCantidad] = useState('');
  const [nuevaUnidad, setNuevaUnidad] = useState('kg');
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  const [nuevaImagen, setNuevaImagen] = useState(null);
  const [creando, setCreando] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Estados para edición
  const [editandoId, setEditandoId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editImagen, setEditImagen] = useState(null);

  const cargarInventario = async () => {
    setLoading(true);
    try {
      const data = await getInventario();
      setInventario(data || []);
    } catch (error) {
      console.error("Error al cargar inventario:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarInventario();
  }, []);

  const calcularValorTotal = () => {
    return inventario.reduce((acc, item) => acc + (Number(item.cantidad) * Number(item.precio_unitario)), 0);
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    setCreando(true);
    setErrorMsg('');

    const isProf = getDemoRubro() === 'profesionales';
    if (!nuevoNombre || (!isProf && !nuevaCantidad) || !nuevoPrecio) {
      setErrorMsg('Todos los campos son obligatorios');
      setCreando(false);
      return;
    }

    try {
      let imagenUrl = null;
      if (nuevaImagen) {
        imagenUrl = await uploadImage(nuevaImagen);
      }

      await addMercaderia({
        nombre: nuevoNombre,
        cantidad: isProf ? null : Number(nuevaCantidad),
        unidad_medida: isProf ? 'servicio' : nuevaUnidad,
        precio_unitario: Number(nuevoPrecio),
        imagen_url: imagenUrl
      });
      
      setNuevoNombre('');
      setNuevaCantidad('');
      setNuevaUnidad('kg');
      setNuevoPrecio('');
      setNuevaImagen(null);
      // Resetear el input file
      const fileInput = document.getElementById('file-upload-nuevo');
      if (fileInput) fileInput.value = '';
      cargarInventario();
    } catch (error) {
      console.error(error);
      setErrorMsg('Error al guardar en la base de datos');
    } finally {
      setCreando(false);
    }
  };

  const handleEliminar = async (id, nombre) => {
    const confirmacion = window.confirm(`¿Estás seguro de eliminar "${nombre}" del inventario?`);
    if (confirmacion) {
      try {
        await deleteMercaderia(id);
        cargarInventario();
      } catch (error) {
        console.error(error);
        alert('Error al eliminar');
      }
    }
  };

  const iniciarEdicion = (item) => {
    setEditandoId(item.id);
    setEditForm({
      nombre: item.nombre,
      cantidad: item.cantidad,
      unidad_medida: item.unidad_medida,
      precio_unitario: item.precio_unitario,
      imagen_url: item.imagen_url
    });
    setEditImagen(null);
  };

  const guardarEdicion = async (id) => {
    try {
      let imagenUrl = editForm.imagen_url;
      if (editImagen) {
        imagenUrl = await uploadImage(editImagen);
      }

      await updateMercaderia(id, {
        nombre: editForm.nombre,
        cantidad: Number(editForm.cantidad),
        unidad_medida: editForm.unidad_medida,
        precio_unitario: Number(editForm.precio_unitario),
        imagen_url: imagenUrl
      });
      setEditandoId(null);
      cargarInventario();
    } catch (error) {
      console.error(error);
      alert('Error al actualizar');
    }
  };

  return (
    <div className="animate-fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>
            {getDemoRubro() === 'profesionales' ? 'Servicios' : 'Inventario de Mercaderías'}
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {getDemoRubro() === 'profesionales' ? 'Gestión de servicios, honorarios y tarifas' : 'Gestión de mercadería, stock y costos'}
          </p>
        </div>
        {getDemoRubro() !== 'profesionales' && (
          <div className="glass-panel" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--success)' }}>
            <TrendingUp color="var(--success)" size={24} />
            <div>
              <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600 }}>Valor Inmovilizado</p>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)' }}>${calcularValorTotal().toLocaleString()}</h2>
            </div>
          </div>
        )}
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
        
        {/* FORMULARIO DE INGRESO */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={20} color="var(--accent-primary)" /> {getDemoRubro() === 'profesionales' ? 'Cargar Nuevo Servicio' : 'Cargar Mercadería'}
          </h2>
          
          <form onSubmit={handleAgregar} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div className="input-group" style={{ flex: '2', minWidth: '200px', marginBottom: 0 }}>
              <label className="input-label">{getDemoRubro() === 'profesionales' ? 'Nombre del Servicio' : 'Nombre del Insumo'}</label>
              <input type="text" className="input-field" value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)} placeholder={getDemoRubro() === 'profesionales' ? 'Ej: Asesoría Legal' : 'Ej: Harina 0000'} />
            </div>
            {getDemoRubro() !== 'profesionales' && (
              <>
                <div className="input-group" style={{ flex: '1', minWidth: '100px', marginBottom: 0 }}>
                  <label className="input-label">Cantidad</label>
                  <input type="number" step="0.01" className="input-field" value={nuevaCantidad} onChange={e => setNuevaCantidad(e.target.value)} placeholder="0" />
                </div>
                <div className="input-group" style={{ flex: '1', minWidth: '120px', marginBottom: 0 }}>
                  <label className="input-label">U. Medida</label>
                  <select className="input-field" value={nuevaUnidad} onChange={e => setNuevaUnidad(e.target.value)} style={{ appearance: 'auto' }}>
                    {UNIDADES_MEDIDA.map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            <div className="input-group" style={{ flex: '1', minWidth: '120px', marginBottom: 0 }}>
              <label className="input-label">{getDemoRubro() === 'profesionales' ? 'Precio de Venta' : `Costo por ${nuevaUnidad === 'unidades' ? 'unidad' : nuevaUnidad}`}</label>
              <input type="number" step="0.01" className="input-field" value={nuevoPrecio} onChange={e => setNuevoPrecio(e.target.value)} placeholder="$" />
            </div>
            <div className="input-group" style={{ flex: '1', minWidth: '150px', marginBottom: 0 }}>
              <label className="input-label">Imagen (Opcional)</label>
              <input id="file-upload-nuevo" type="file" accept="image/*" className="input-field" onChange={e => setNuevaImagen(e.target.files[0])} style={{ padding: '8px' }} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={creando} style={{ height: '42px', padding: '0 24px' }}>
              {creando ? 'Guardando...' : 'Agregar'}
            </button>
          </form>
          
          {errorMsg && (
            <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(183, 65, 52, 0.05)', color: 'var(--danger)', borderRadius: '4px', display: 'flex', gap: '8px' }}>
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}
        </div>

        {/* TABLA DE INVENTARIO */}
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PackageSearch size={20} color="var(--text-primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>
              {getDemoRubro() === 'profesionales' ? 'Catálogo de Servicios' : 'Stock Actual'}
            </h3>
          </div>
          
          <div className="table-responsive">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.02)' }}>
                  <th>{getDemoRubro() === 'profesionales' ? 'Servicio / Prestación' : 'Insumo'}</th>
                  {getDemoRubro() !== 'profesionales' && <th>Stock Disponible</th>}
                  <th>{getDemoRubro() === 'profesionales' ? 'Precio' : 'Costo Unitario'}</th>
                  {getDemoRubro() !== 'profesionales' && <th>Valor Total</th>}
                  <th style={{ textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={getDemoRubro() === 'profesionales' ? '3' : '5'} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>Cargando...</td></tr>
                ) : inventario.length === 0 ? (
                  <tr><td colSpan={getDemoRubro() === 'profesionales' ? '3' : '5'} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>{getDemoRubro() === 'profesionales' ? 'No hay servicios cargados.' : 'No hay mercadería cargada.'}</td></tr>
                ) : (
                  inventario.map(item => {
                    const isEditing = editandoId === item.id;
                    return (
                      <tr key={item.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                        <td style={{ fontWeight: 600 }}>
                          {isEditing ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <input type="text" className="input-field" value={editForm.nombre} onChange={e => setEditForm({...editForm, nombre: e.target.value})} style={{ padding: '4px 8px' }} />
                              <input type="file" accept="image/*" onChange={e => setEditImagen(e.target.files[0])} style={{ fontSize: '0.8rem' }} />
                            </div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {item.imagen_url && <img src={item.imagen_url} alt={item.nombre} onError={handleImageError} style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '4px' }} />}
                              {item.nombre}
                            </div>
                          )}
                        </td>
                        {getDemoRubro() !== 'profesionales' && (
                          <td>
                            {isEditing ? (
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <input type="number" step="0.01" className="input-field" value={editForm.cantidad} onChange={e => setEditForm({...editForm, cantidad: e.target.value})} style={{ padding: '4px 8px', width: '80px' }} />
                                <select className="input-field" value={editForm.unidad_medida} onChange={e => setEditForm({...editForm, unidad_medida: e.target.value})} style={{ padding: '4px 8px', appearance: 'auto' }}>
                                  {UNIDADES_MEDIDA.map(u => <option key={u} value={u}>{u}</option>)}
                                </select>
                              </div>
                            ) : (
                              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px' }}>
                                {Number(item.cantidad).toLocaleString()} {item.unidad_medida}
                              </span>
                            )}
                          </td>
                        )}
                        <td>
                          {isEditing ? (
                            <input type="number" step="0.01" className="input-field" value={editForm.precio_unitario} onChange={e => setEditForm({...editForm, precio_unitario: e.target.value})} style={{ padding: '4px 8px', width: '100px' }} />
                          ) : (
                            `$${Number(item.precio_unitario).toLocaleString()}`
                          )}
                        </td>
                        {getDemoRubro() !== 'profesionales' && (
                          <td style={{ fontWeight: 800, color: 'var(--accent-primary)' }}>
                            ${(Number(item.cantidad) * Number(item.precio_unitario)).toLocaleString()}
                          </td>
                        )}
                        <td style={{ textAlign: 'right' }}>
                          {isEditing ? (
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button onClick={() => guardarEdicion(item.id)} style={{ background: 'var(--success)', border: 'none', color: 'white', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}><Check size={16} /></button>
                              <button onClick={() => setEditandoId(null)} style={{ background: 'var(--danger)', border: 'none', color: 'white', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}><X size={16} /></button>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button onClick={() => iniciarEdicion(item)} style={{ background: 'transparent', border: '1px solid var(--text-secondary)', color: 'var(--text-primary)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}><Edit2 size={16} /></button>
                              <button onClick={() => handleEliminar(item.id, item.nombre)} style={{ background: 'rgba(183, 65, 52, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
