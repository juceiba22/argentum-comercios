import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

export default function CheckoutPending() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',
      background: 'radial-gradient(circle at top right, rgba(245, 158, 11, 0.05), transparent 50%), radial-gradient(circle at bottom left, rgba(37, 99, 235, 0.05), transparent 50%)',
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '40px', maxWidth: '500px', textAlign: 'center', width: '100%' }}>
        <Clock size={64} style={{ color: '#F59E0B', margin: '0 auto 24px auto' }} />
        <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--text-main)' }}>Pago Pendiente</h1>
        <p className="font-sans" style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1.1rem', lineHeight: '1.5' }}>
          Tu pago está siendo procesado o está pendiente de confirmación. Una vez aprobado, vas a recibir un email con tus datos de acceso.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/')} style={{ width: '100%', padding: '12px' }}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
