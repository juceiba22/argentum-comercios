import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export default function CheckoutFailure() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',
      background: 'radial-gradient(circle at top right, rgba(239, 68, 68, 0.05), transparent 50%), radial-gradient(circle at bottom left, rgba(37, 99, 235, 0.05), transparent 50%)',
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '40px', maxWidth: '500px', textAlign: 'center', width: '100%' }}>
        <XCircle size={64} style={{ color: '#EF4444', margin: '0 auto 24px auto' }} />
        <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--text-main)' }}>Pago Rechazado</h1>
        <p className="font-sans" style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1.1rem', lineHeight: '1.5' }}>
          Ocurrió un problema y tu pago no pudo procesarse. Por favor, verificá los datos de tu tarjeta o intentá con otro medio de pago.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexDirection: 'column' }}>
          <button className="btn btn-primary" onClick={() => navigate('/checkout')} style={{ width: '100%', padding: '12px' }}>
            Intentar de nuevo
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ width: '100%', padding: '12px' }}>
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
