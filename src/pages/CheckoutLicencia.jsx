import React, { useState } from 'react';
import { Mail, AlertCircle, Shield, CreditCard, TrendingDown, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SOLUTIONS = [
  {
    title: 'El fantasma de ARCA, resuelto',
    desc: 'Emite facturas electrónicas A y B autorizadas directamente ante ARCA (ex AFIP) al instante de concretar una venta. Olvídate de sistemas contables complejos.',
    icon: Shield
  },
  {
    title: 'Punto de Venta Multimedio',
    desc: 'Garantiza la trazabilidad absoluta del flujo de dinero de tu caja. Registra ventas cobrando en efectivo, transferencia o Mercado Pago.',
    icon: CreditCard
  },
  {
    title: 'Costo Contable al Mínimo',
    desc: 'El sistema automatiza el desglose impositivo y genera cierres de caja detallados listos para exportar. Facilita la tarea de tu contador.',
    icon: TrendingDown
  }
];

export default function CheckoutLicencia() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleComprar = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Por favor, ingresá un email válido.');
      return;
    }
    
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          planName: 'Plan Profesional',
          price: 25000,
        }),
      });

      const data = await response.json();

      if (data.success && data.init_point) {
        window.location.href = data.init_point;
      } else {
        setErrorMsg('Error al iniciar el pago: ' + (data.error || 'Intente nuevamente.'));
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMsg('Error de conexión. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.05), transparent 50%), radial-gradient(circle at bottom left, rgba(37, 99, 235, 0.05), transparent 50%)',
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '40px', width: '100%', maxWidth: '950px', display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
        
        {/* Lado Izquierdo - Detalles del Plan */}
        <div style={{ flex: '1 1 400px' }}>
          <button 
            onClick={() => navigate('/')} 
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '24px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            ← Volver al inicio
          </button>
          
          <h1 className="brand-title font-serif" style={{ fontSize: '2.2rem', marginBottom: '8px', color: 'var(--text-main)' }}>
            Plan Profesional
          </h1>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '40px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            $25.000 <span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>ARS / único pago</span>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {SOLUTIONS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', padding: '14px', borderRadius: '12px', height: 'fit-content' }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-sans" style={{ fontSize: '1.15rem', marginBottom: '6px', color: 'var(--text-main)', fontWeight: '600' }}>{item.title}</h3>
                    <p className="font-sans" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lado Derecho - Formulario de Checkout */}
        <div style={{ flex: '1 1 350px', background: 'var(--bg-secondary)', padding: '40px 32px', borderRadius: '16px', border: '1px solid var(--border-color)', height: 'fit-content', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <h2 className="font-serif" style={{ fontSize: '1.6rem', marginBottom: '24px', color: 'var(--text-main)', textAlign: 'center' }}>Completa tu compra</h2>
          
          <form onSubmit={handleComprar}>
            <div className="input-group" style={{ marginBottom: '28px' }}>
              <label className="input-label font-sans" style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)', fontWeight: '500' }}>Email de facturación y acceso</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type="email" 
                  className="input-field font-sans" 
                  placeholder="tu@email.com" 
                  style={{ 
                    paddingLeft: '42px', 
                    width: '100%', 
                    padding: '12px 12px 12px 42px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-main)',
                    color: 'var(--text-main)',
                    fontSize: '1rem'
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <p className="font-sans" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Recibirás las instrucciones de acceso en este correo.</p>
            </div>

            {errorMsg && (
              <div className="font-sans" style={{ marginBottom: '24px', padding: '12px', background: 'rgba(183, 65, 52, 0.05)', border: '1px solid var(--danger)', borderRadius: '8px', color: 'var(--danger)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={18} /> 
                <span>{errorMsg}</span>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', marginBottom: '32px' }}>
              <div className="font-sans" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-main)' }}>
                <span>Subtotal</span>
                <span>$25.000</span>
              </div>
              <div className="font-sans" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--text-main)' }}>
                <span>Total</span>
                <span>$25.000</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary font-sans" 
              style={{ 
                width: '100%', 
                padding: '16px', 
                fontSize: '1.1rem',
                backgroundColor: '#10B981',
                borderColor: '#10B981',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '8px',
                fontWeight: 'bold',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
              }} 
              disabled={loading}
            >
              {loading ? 'Iniciando pago...' : 'Confirmar y pagar $25.000'}
            </button>

            <div className="font-sans" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <Lock size={14} />
              <span>Pago seguro procesado por Mercado Pago</span>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
