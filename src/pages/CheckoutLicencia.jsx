import React, { useState, useEffect } from 'react';
import { Mail, AlertCircle, Lock, Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { planesComerciales } from '../data/planes';

export default function CheckoutLicencia() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const queryParams = new URLSearchParams(location.search);
  const planName = queryParams.get('plan') || 'Plan Profesional';
  const price = parseInt(queryParams.get('price')) || 150;
  
  // Formatear precio para la vista
  const formattedPrice = price.toLocaleString('es-AR');

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
          planName: planName,
          price: price,
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
      background: 'var(--bg)',
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
          
          <h1 className="brand-title serif" style={{ fontSize: '2.2rem', marginBottom: '8px', color: 'var(--text)' }}>
            {planName}
          </h1>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text)', marginBottom: '40px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            ${formattedPrice} <span style={{ fontSize: '1.1rem', color: 'var(--muted)', fontWeight: 'normal' }}>ARS / mes (primer pago)</span>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {(() => {
              const selectedPlanData = planesComerciales.find(p => p.titulo === planName);
              const features = selectedPlanData ? selectedPlanData.features : [
                'Acceso completo a la plataforma',
                'Soporte técnico especializado',
                'Actualizaciones gratuitas'
              ];
              
              return features.map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ background: 'var(--border-soft)', color: 'var(--text)', padding: '10px', borderRadius: '12px', height: 'fit-content' }}>
                    <Check size={20} />
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.5', margin: 0 }}>{feature}</p>
                </div>
              ));
            })()}
          </div>
        </div>

        {/* Lado Derecho - Formulario de Checkout */}
        <div style={{ flex: '1 1 350px', background: 'var(--bg)', padding: '40px 32px', borderRadius: '16px', border: '1px solid var(--border-soft)', height: 'fit-content', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <h2 className="serif" style={{ fontSize: '1.6rem', marginBottom: '24px', color: 'var(--text)', textAlign: 'center' }}>Completa tu compra</h2>
          
          <form onSubmit={handleComprar}>
            <div className="input-group" style={{ marginBottom: '28px' }}>
              <label className="input-label" style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontWeight: '500' }}>Email de facturación y acceso</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="tu@email.com" 
                  style={{ 
                    paddingLeft: '42px', 
                    width: '100%', 
                    padding: '12px 12px 12px 42px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-soft)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontSize: '1rem'
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '8px' }}>Recibirás las instrucciones de acceso en este correo.</p>
            </div>

            {errorMsg && (
              <div style={{ marginBottom: '24px', padding: '12px', background: 'rgba(183, 65, 52, 0.05)', border: '1px solid var(--danger)', borderRadius: '8px', color: 'var(--danger)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={18} /> 
                <span>{errorMsg}</span>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--border-soft)', paddingTop: '24px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text)' }}>
                <span>Subtotal ({planName})</span>
                <span>${formattedPrice}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--text)' }}>
                <span>Total a pagar hoy</span>
                <span>${formattedPrice}</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ 
                width: '100%', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }} 
              disabled={loading}
            >
              {loading ? 'Iniciando pago...' : `Confirmar y pagar $${formattedPrice}`}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '20px', color: 'var(--muted)', fontSize: '0.85rem' }}>
              <Lock size={14} />
              <span>Pago seguro procesado por Mercado Pago</span>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
