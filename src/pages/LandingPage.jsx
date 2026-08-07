import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dog, ShoppingBag, Store, Leaf, Beef, Shield, CreditCard, TrendingDown, ChevronRight, Apple, Wrench, Briefcase } from 'lucide-react';
import { initializeDemoDatabase } from '../services/demoService';
import './LandingPage.css';

const SOLUTIONS = [
  {
    title: 'El fantasma de ARCA, resuelto',
    desc: 'Emite facturas electrónicas A y B autorizadas directamente ante ARCA (ex AFIP) al instante de concretar una venta. Olvídate de sistemas contables complejos o demoras manuales.',
    icon: Shield
  },
  {
    title: 'Punto de Venta Multimedio',
    desc: 'Garantiza la trazabilidad absoluta del flujo de dinero de tu caja. Registra ventas cobrando en efectivo, transferencia, QR de Cuenta DNI o dispositivos físicos de Mercado Pago Point.',
    icon: CreditCard
  },
  {
    title: 'Costo Contable al Mínimo',
    desc: 'El sistema automatiza el desglose impositivo y genera cierres de caja detallados listos para exportar. Facilita la tarea de tu contador y reduce tus costos mensuales de gestión contable.',
    icon: TrendingDown
  }
];

const RUBROS = [
  {
    id: 'pet-shop',
    nombre: 'Pet Shop',
    descripcion: 'Alimentos balanceados, accesorios, juguetes y farmacia para mascotas.',
    icon: Dog,
    color: '#2563EB',
    bgLight: 'rgba(37, 99, 235, 0.08)'
  },
  {
    id: 'panaderia',
    nombre: 'Panadería',
    descripcion: 'Facturería, panes artesanales, tortas, cafetería y repostería.',
    icon: ShoppingBag,
    color: '#D97706',
    bgLight: 'rgba(217, 119, 6, 0.08)'
  },
  {
    id: 'mini-mercado',
    nombre: 'Mini-mercado',
    descripcion: 'Almacén general, bebidas, lácteos, limpieza y comestibles diarios.',
    icon: Store,
    color: '#059669',
    bgLight: 'rgba(5, 150, 105, 0.08)'
  },
  {
    id: 'dietetica',
    nombre: 'Dietética',
    descripcion: 'Frutos secos, harinas alternativas, suplementos y productos sin TACC.',
    icon: Leaf,
    color: '#7C3AED',
    bgLight: 'rgba(124, 58, 237, 0.08)'
  },
  {
    id: 'fiambreria',
    nombre: 'Fiambrería',
    descripcion: 'Fiambres premium, quesos duros y blandos, picadas y delicatessen.',
    icon: ShoppingBag, // Usamos ShoppingBag o un icono de comida genérico para evitar errores
    color: '#DB2777',
    bgLight: 'rgba(219, 39, 119, 0.08)'
  },
  {
    id: 'carniceria',
    nombre: 'Carnicería',
    descripcion: 'Cortes vacunos, aviares, porcinos, achuras y embutidos frescos.',
    icon: Beef,
    color: '#DC2626',
    bgLight: 'rgba(220, 38, 38, 0.08)'
  },
  {
    id: 'verduleria',
    nombre: 'Verdulería',
    descripcion: 'Frutas de estación, verduras frescas, hortalizas y productos de granja.',
    icon: Apple,
    color: '#84CC16', // Limón / Verde brillante
    bgLight: 'rgba(132, 204, 22, 0.08)'
  },
  {
    id: 'ferreteria',
    nombre: 'Ferretería',
    descripcion: 'Herramientas manuales y eléctricas, tornillería, cerrajería y electricidad.',
    icon: Wrench,
    color: '#475569', // Pizarra / Gris metalizado
    bgLight: 'rgba(71, 85, 105, 0.08)'
  },
  {
    id: 'profesionales',
    nombre: 'Servicios Profesionales',
    descripcion: 'Consultorios, asesoría legal, técnica, programación y abonos de servicios.',
    icon: Briefcase,
    color: '#06B6D4', // Celeste / Cian
    bgLight: 'rgba(6, 182, 212, 0.08)',
    badge: 'Nuevo'
  }
];

export default function LandingPage() {
  const navigate = useNavigate();

  const handleSelectDemo = (rubroId) => {
    localStorage.setItem('argentum_demo_mode', 'true');
    localStorage.setItem('argentum_rubro', rubroId);
    
    // Inicializar semillas específicas del rubro
    initializeDemoDatabase(rubroId, true);
    
    // Redirigir al POS (Market) y forzar recarga de sesión
    window.location.href = '/market';
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-container">
      
      {/* HEADER NAV (Estilo Framer) */}
      <header style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%', 
        padding: '24px 40px', display: 'flex', justifyContent: 'space-between', 
        alignItems: 'center', zIndex: 100 
      }}>
        <div className="brand-title serif italic" style={{ fontSize: '1.8rem', letterSpacing: '-0.05em' }}>Argentum®</div>
        <button className="btn-primary" style={{ height: '44px', padding: '0 20px', fontSize: '0.9rem', borderRadius: '99px' }} onClick={() => navigate('/login')}>
          Menu <ChevronRight size={16} />
        </button>
      </header>

      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <h1 className="hero-title">
          <span className="serif italic">Argentum,</span><br/>
          desarrollo web<br/>
          y contabilidad<br/>
          en un solo lugar
        </h1>
        <p className="hero-subtitle">
          Creamos soluciones enlatadas y a medida. Minimizamos<br/>tus costos contables.
        </p>
        <div className="hero-ctas">
          <button 
            className="btn-primary" 
            onClick={() => scrollToSection('demo-selector')}
          >
            Conocenos
          </button>
          
          <div className="btn-chat" onClick={() => scrollToSection('solutions')}>
            <div className="btn-chat-avatar">
              {/* Placeholder abstracto como solicitó el usuario */}
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Avatar de asesor" />
            </div>
            <div className="btn-chat-content">
              <span className="btn-chat-title">Chatéa con nosotros</span>
              <span className="btn-chat-subtitle">
                <span className="led-indicator"></span> 15 minutos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN DE DOLORES & SOLUCIONES */}
      <section id="solutions" className="soluciones-section">
        <h2 className="soluciones-title serif">Diseñado para resolver tu operatoria contable diaria</h2>
        
        <div className="soluciones-grid">
          {SOLUTIONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="solucion-card">
                <div className="solucion-icon">
                  <Icon size={28} />
                </div>
                <h3 className="solucion-name">{item.title}</h3>
                <p className="solucion-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SECCIÓN INTERACTIVA - SELECTOR DE RUBROS */}
      <section id="demo-selector" className="selector-section">
        <div className="selector-wrapper">
          <div className="selector-header">
            <h2 className="selector-title serif">Elegí tu rubro y experimentá Argentum ahora mismo</h2>
            <p className="selector-subtitle">
              Haz clic en cualquiera de las siguientes configuraciones preestablecidas para ingresar inmediatamente al software con un catálogo de productos e impuestos listos para probar.
            </p>
          </div>

          <div className="selector-grid">
            {RUBROS.map((rubro) => {
              const Icon = rubro.icon;
              return (
                <div 
                  key={rubro.id} 
                  className="rubro-card-page"
                  onClick={() => handleSelectDemo(rubro.id)}
                  style={{ position: 'relative' }}
                >
                  {rubro.badge && (
                    <span className="rubro-badge-new">
                      {rubro.badge}
                    </span>
                  )}
                  <div className="rubro-icon-wrapper" style={{ backgroundColor: rubro.bgLight, color: rubro.color }}>
                    <Icon size={26} />
                  </div>
                  <h3 className="rubro-name">{rubro.nombre}</h3>
                  <p className="rubro-desc">{rubro.descripcion}</p>
                  <button 
                    className="rubro-btn-demo"
                    style={{ backgroundColor: `${rubro.color}15`, color: rubro.color }}
                  >
                    Probar Demo <ChevronRight size={14} style={{ display: 'inline', marginLeft: '2px', verticalAlign: 'middle' }} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PAGE FOOTER */}
      <footer className="landing-footer">
        <div className="footer-content">
          <p className="footer-copy">
            © {new Date().getFullYear()} Argentum Comercios. Todos los derechos reservados.
          </p>
          <Link to="/login" className="footer-link-login">
            ¿Tienes una cuenta? Iniciar Sesión (Producción)
          </Link>
        </div>
      </footer>
    </div>
  );
}
