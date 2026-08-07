import React, { useState } from 'react';
import { Layers, X } from 'lucide-react';
import ModulosComerciales from '../components/ModulosComerciales';

export default function ComercializacionModulos() {
  const [moduloSeleccionado, setModuloSeleccionado] = useState(null);

  const handleSeleccionar = (id) => {
    setModuloSeleccionado(id);
  };

  const cerrarModal = () => {
    setModuloSeleccionado(null);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px' }}>
      
      {/* Header Institucional */}
      <div style={{ marginBottom: '40px', textAlign: 'center', marginTop: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--text)', color: 'var(--bg)', marginBottom: '16px' }}>
          <Layers size={32} />
        </div>
        <h1 className="serif" style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--text)' }}>
          Esquema de Comercialización
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
          Personalizá la plataforma Argentum sumando únicamente los módulos que impulsan el crecimiento de tu negocio.
        </p>
      </div>

      {/* Renderizamos el componente de módulos */}
      <ModulosComerciales onSeleccionarModulo={handleSeleccionar} />

      {/* Modal de Feedback Simple */}
      {moduloSeleccionado && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="glass-panel" style={{
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            position: 'relative'
          }}>
            <button 
              onClick={cerrarModal}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: 'var(--muted)'
              }}
            >
              <X size={24} />
            </button>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text)' }}>¡Excelente elección!</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
              Has seleccionado el módulo <strong>{moduloSeleccionado}</strong>. Nuestro equipo se pondrá en contacto pronto para completar la activación en tu cuenta.
            </p>
            <button className="btn-primary" style={{ width: '100%' }} onClick={cerrarModal}>
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
