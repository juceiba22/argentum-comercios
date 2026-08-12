import React from 'react';
import { Dog, ShoppingBag, Store, Leaf, Beef, Sandwich } from 'lucide-react';
import { initializeDemoDatabase } from '../services/demoService';
import { SISTEMA_URL } from '../config/sistemaUrl';

const RUBROS = [
  {
    id: 'pet-shop',
    nombre: 'Pet Shop',
    descripcion: 'Alimentos balanceados, accesorios, juguetes y farmacia para mascotas.',
    icon: Dog,
    color: '#3B82F6', // Azul
    gradient: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)'
  },
  {
    id: 'panaderia',
    nombre: 'Panadería y Confitería',
    descripcion: 'Facturería, panes artesanales, tortas, cafetería y repostería.',
    icon: ShoppingBag, // Genérico pero seguro para Panadería si Croissant no estuviera
    color: '#F59E0B', // Ámbar
    gradient: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)'
  },
  {
    id: 'mini-mercado',
    nombre: 'Mini-mercado',
    descripcion: 'Almacén general, bebidas, lácteos, limpieza y comestibles diarios.',
    icon: Store,
    color: '#10B981', // Esmeralda
    gradient: 'linear-gradient(135deg, #34D399 0%, #059669 100%)'
  },
  {
    id: 'dietetica',
    nombre: 'Dietética y Saludable',
    descripcion: 'Frutos secos, harinas alternativas, suplementos y productos sin TACC.',
    icon: Leaf,
    color: '#8B5CF6', // Violeta
    gradient: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)'
  },
  {
    id: 'fiambreria',
    nombre: 'Fiambrería y Quesería',
    descripcion: 'Fiambres premium, quesos duros y blandos, picadas y delicatessen.',
    icon: Sandwich,
    color: '#EC4899', // Rosado
    gradient: 'linear-gradient(135deg, #F472B6 0%, #DB2777 100%)'
  },
  {
    id: 'carniceria',
    nombre: 'Carnicería (Original)',
    descripcion: 'Cortes vacunos, aviares, porcinos, achuras y embutidos frescos.',
    icon: Beef,
    color: '#EF4444', // Rojo
    gradient: 'linear-gradient(135deg, #F87171 0%, #DC2626 100%)'
  }
];

export default function RubroSelector() {
  const handleSelectRubro = (rubroId) => {
    localStorage.setItem('argentum_demo_mode', 'true');
    localStorage.setItem('argentum_rubro', rubroId);
    
    // Inicializar semillas en localStorage
    initializeDemoDatabase(rubroId, true); // true para resetear con datos frescos del rubro
    
    // Recargar página para inicializar AuthContext y estados
    window.location.href = '/market'; // Redirigir al POS (Market) por defecto
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundBlur}></div>
      <div style={styles.content}>
        <header style={styles.header}>
          <div style={styles.logoBadge}>ARGENTUM COMERCIOS</div>
          <h1 style={styles.title}>Elige tu Rubro de Demostración</h1>
          <p style={styles.subtitle}>
            Selecciona uno de los siguientes rubros de comercio para probar y examinar todas las funcionalidades de administración, facturación, inventario y POS en modo demostración.
          </p>
        </header>

        <div style={styles.grid}>
          {RUBROS.map((rubro) => {
            const IconComponent = rubro.icon;
            return (
              <div 
                key={rubro.id} 
                style={styles.card}
                onClick={() => handleSelectRubro(rubro.id)}
                className="rubro-card"
              >
                <div style={{ ...styles.iconWrapper, background: rubro.gradient }}>
                  <IconComponent size={32} color="#fff" />
                </div>
                <h3 style={styles.cardTitle}>{rubro.nombre}</h3>
                <p style={styles.cardDesc}>{rubro.descripcion}</p>
                <div style={styles.cardFooter}>
                  <span style={{ ...styles.badge, color: rubro.color, backgroundColor: `${rubro.color}15` }}>
                    Probar Demo
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <footer style={styles.pageFooter}>
          <p>© {new Date().getFullYear()} Argentum Comercios ERP & POS. Todos los derechos reservados.</p>
          <p style={{ marginTop: '10px', fontSize: '0.85rem' }}>
            ¿Tienes una cuenta? <a href={SISTEMA_URL} style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '600' }}>Iniciar Sesión (Producción)</a>
          </p>
        </footer>
      </div>

      {/* Estilos CSS en línea inyectados para efectos de hover */}
      <style>{`
        .rubro-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          cursor: pointer;
        }
        .rubro-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12) !important;
          border-color: #3b82f640 !important;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#0f172a', // Fondo pizarra oscuro
    fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif",
    color: '#f8fafc',
    position: 'relative',
    overflowX: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px'
  },
  backgroundBlur: {
    position: 'absolute',
    top: '10%',
    left: '25%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(15,23,42,0) 70%)',
    zIndex: 1,
    pointerEvents: 'none'
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '1200px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
    maxWidth: '800px'
  },
  logoBadge: {
    display: 'inline-block',
    padding: '6px 16px',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '100px',
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '0.15em',
    color: '#3b82f6',
    marginBottom: '20px',
    textTransform: 'uppercase'
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: '800',
    background: 'linear-gradient(to right, #f8fafc, #94a3b8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '15px',
    letterSpacing: '-0.02em'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#94a3b8',
    lineHeight: '1.6',
    fontWeight: '400'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
    width: '100%',
    marginBottom: '60px'
  },
  card: {
    background: 'rgba(30, 41, 59, 0.4)', // Glassmorphism oscuro
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
  },
  iconWrapper: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
  },
  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#f8fafc'
  },
  cardDesc: {
    fontSize: '0.95rem',
    color: '#94a3b8',
    lineHeight: '1.5',
    marginBottom: '24px',
    flexGrow: 1
  },
  cardFooter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    paddingTop: '20px'
  },
  badge: {
    padding: '6px 16px',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: '600'
  },
  pageFooter: {
    marginTop: '20px',
    color: '#64748b',
    fontSize: '0.9rem'
  }
};
