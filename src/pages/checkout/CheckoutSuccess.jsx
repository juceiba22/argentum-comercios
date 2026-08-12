import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { SISTEMA_URL } from '../../config/sistemaUrl';

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',
      background: 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.05), transparent 50%), radial-gradient(circle at bottom left, rgba(37, 99, 235, 0.05), transparent 50%)',
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '40px', maxWidth: '500px', textAlign: 'center', width: '100%' }}>
        <CheckCircle size={64} style={{ color: '#10B981', margin: '0 auto 24px auto' }} />
        <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--text-main)' }}>¡Pago Aprobado!</h1>
        <p className="font-sans" style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1.1rem', lineHeight: '1.5' }}>
          Tu pago fue procesado con éxito. En breve vas a recibir un email con los datos de acceso para ingresar a la plataforma.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexDirection: 'column' }}>
          <button className="btn btn-primary" onClick={() => window.location.href = SISTEMA_URL} style={{ width: '100%', padding: '12px' }}>
            Ir a Iniciar Sesión
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ width: '100%', padding: '12px' }}>
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
