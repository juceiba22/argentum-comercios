import React from 'react';
import { Check } from 'lucide-react';
import { planesComerciales } from '../data/planes';

export default function ModulosComerciales({ onSeleccionarModulo }) {
  return (
    <section id="pricing" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--text)' }}>
          Planes y Precios
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
          Elegí la versión exacta que tu negocio necesita. Pagá solo por lo que usás.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '32px',
        alignItems: 'stretch'
      }}>
        {planesComerciales.map((modulo) => {
          const Icon = modulo.icono;
          return (
            <div 
              key={modulo.id} 
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '40px 32px',
                position: 'relative',
                overflow: 'hidden',
                border: modulo.destacado ? '1px solid var(--text)' : '1px solid var(--border-soft)',
                transform: modulo.destacado ? 'translateY(-8px)' : 'none',
                boxShadow: modulo.destacado ? '0 30px 60px rgba(0,0,0,0.08)' : '0 20px 40px rgba(0, 0, 0, 0.03)'
              }}
            >
              {modulo.destacado && (
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  backgroundColor: 'var(--text)',
                  color: 'var(--bg)',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  textAlign: 'center',
                  padding: '6px'
                }}>
                  Recomendado
                </div>
              )}
              
              <div style={{ marginTop: modulo.destacado ? '16px' : '0' }}>
                <div style={{ 
                  width: '48px', height: '48px', 
                  borderRadius: '12px', 
                  backgroundColor: modulo.destacado ? 'var(--text)' : 'rgba(0,0,0,0.04)',
                  color: modulo.destacado ? 'var(--bg)' : 'var(--text)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <Icon size={24} />
                </div>
                
                <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text)' }}>
                  {modulo.titulo}
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '32px' }}>
                  <span className="serif" style={{ fontSize: '2.5rem', fontWeight: '400', letterSpacing: '-0.05em', color: 'var(--text)' }}>
                    ${modulo.precio}
                  </span>
                  <span style={{ color: 'var(--muted)', fontSize: '0.9rem', fontWeight: '500' }}>
                    ARS / {modulo.recurrencia}
                  </span>
                </div>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1 }}>
                  {modulo.features.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.95rem', color: 'var(--text)' }}>
                      <Check size={18} style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                className={modulo.destacado ? "btn-primary" : "btn-secondary"}
                style={{ width: '100%', marginTop: 'auto' }}
                onClick={() => onSeleccionarModulo && onSeleccionarModulo(modulo)}
              >
                Adquirir Plan
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
