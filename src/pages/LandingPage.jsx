import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dog, ShoppingBag, Store, Leaf, Beef, Shield, CreditCard, TrendingDown, ChevronRight, Apple, Wrench, Briefcase } from 'lucide-react';
import { initializeDemoDatabase } from '../services/demoService';
import { SISTEMA_URL } from '../config/sistemaUrl';
import './LandingPage.css';
import ModulosComerciales from '../components/ModulosComerciales';

const SOLUTIONS = [
  {
    title: 'Contabilidad al día y ultra-barata.',
    desc: 'Emití facturas electrónicas autorizadas directamente ante ARCA (ex AFIP), desde la app con un sólo click.',
    icon: Shield
  },
  {
    title: 'Registrá y hacé tus ventas desde la app',
    desc: 'Vinculá tu posnet y todos tus medios de pago. Nostros nos encargamos de sistematizarte toda la información de ingresos y egresos.',
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
  
  const handleSeleccionarModulo = (modulo) => {
    navigate(`/checkout?plan=${encodeURIComponent(modulo.titulo)}&price=${modulo.precioNum}`);
  };

  return (
    <div className="landing-container">
      
      {/* HEADER NAV (Estilo Framer) */}
      <div className="landing-header" style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%', 
        padding: '24px 40px', display: 'flex', justifyContent: 'space-between', 
        alignItems: 'center', zIndex: 100 
      }}>
        <div className="brand-title serif italic" style={{ fontSize: '1.8rem', letterSpacing: '-0.05em' }}>Argentum®</div>
        <button className="btn-primary" style={{ height: '44px', padding: '0 20px', fontSize: '0.9rem', borderRadius: '99px' }} onClick={() => window.location.href = SISTEMA_URL}>
          Ingresar <ChevronRight size={16} />
        </button>
      </div>

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
            onClick={() => scrollToSection('pricing')}
            style={{ padding: '0 40px', fontSize: '1.15rem' }}
          >
            Quiero Argentum
          </button>
          <div className="btn-chat" onClick={() => window.open('https://wa.me/541178270751', '_blank')}>
            <div className="btn-chat-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#25D366' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
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

      {/* 4. PRECIOS PÚBLICOS */}
      <div id="pricing">
        <ModulosComerciales onSeleccionarModulo={handleSeleccionarModulo} />
      </div>

      {/* 4. PAGE FOOTER */}
      <footer className="landing-footer">
        <div className="footer-content">
          <p className="footer-copy">
            © {new Date().getFullYear()} Argentum Comercios. Todos los derechos reservados.
          </p>
          <a href={SISTEMA_URL} className="footer-link-login">
            ¿Tienes una cuenta? Iniciar Sesión (Producción)
          </a>
        </div>
      </footer>
    </div>
  );
}
