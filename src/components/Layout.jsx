import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, LogOut, Menu, X, Wallet, Package, Store, Megaphone, Truck, ShoppingCart, Activity, BarChart2, Receipt } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (label) => {
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const { role, salirDemo } = useAuth();
  const isDemo = localStorage.getItem('argentum_demo_mode') === 'true';
  const rubro = localStorage.getItem('argentum_rubro') || 'carniceria';

  const rubroNames = {
    'pet-shop': 'Pet Shop 🐾',
    'panaderia': 'Panadería 🥐',
    'mini-mercado': 'Mini-mercado 🏪',
    'dietetica': 'Dietética 🌿',
    'fiambreria': 'Fiambrería 🥪',
    'carniceria': 'Carnicería 🥩',
    'verduleria': 'Verdulería 🍏',
    'ferreteria': 'Ferretería 🔧',
    'profesionales': 'Servicios Profesionales 💼'
  };

  const navItems = [
    { path: '/ventas-home', label: 'Inicio de Ventas', icon: <Store size={20} />, allowed: ['ventas'] },
    { path: '/clientes', label: 'Clientes', icon: <Users size={20} />, allowed: ['admin'] },
    { path: '/facturacion', label: 'Facturación ARCA', icon: <Receipt size={20} />, allowed: ['admin'] },
    { path: '/market', label: 'Mercado', icon: <Store size={20} />, allowed: ['admin'] },
    { path: '/gestion-promociones', label: 'Promociones', icon: <Megaphone size={20} />, allowed: ['admin'] },
    { 
      label: 'Compras e Inventario', 
      icon: <Package size={20} />, 
      allowed: ['admin'],
      subItems: [
        { path: '/erp/compras', label: 'Compras', icon: <ShoppingCart size={20} />, allowed: ['admin'] },
        { path: '/erp/proveedores', label: 'Alta Proveedores', icon: <Truck size={20} />, allowed: ['admin'] },
        { path: '/inventario', label: 'Inventario', icon: <Package size={20} />, allowed: ['admin'] }
      ]
    },
    { path: '/erp/dashboard-liquidez', label: 'Cash Flow (ERP)', icon: <Activity size={20} />, allowed: ['admin'] },
    { 
      label: 'Costos (ERP)', 
      icon: <Receipt size={20} />, 
      allowed: ['admin'],
      subItems: [
        { path: '/erp/gastos', label: 'Registro de Gastos', icon: <Receipt size={20} />, allowed: ['admin'] },
        { path: '/erp/calculadora-costos', label: 'Calculadora', icon: <BarChart2 size={20} />, allowed: ['admin'] }
      ]
    },
    { path: '/erp/dashboard-proveedores', label: 'Analítica Prov. (ERP)', icon: <BarChart2 size={20} />, allowed: ['admin'] },
  ];

  const visibleNavItems = navItems.filter(item => item.allowed.includes(role || 'admin'));

  const handleLogout = async (e) => {
    e.preventDefault();
    if (isDemo) {
      salirDemo();
    } else {
      await supabase.auth.signOut();
      navigate('/');
    }
  };

  return (
    <div className="app-container">
      {/* Mobile Header */}
      <div className="mobile-header">
        <h2 className="brand-title">Argentum</h2>
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''} ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <button 
          className="sidebar-toggle-btn"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          {isSidebarCollapsed ? '>' : '<'}
        </button>
        
        <div className="sidebar-header">
          <h2 className="brand-title">Argentum</h2>
          <p className="brand-subtitle">Gestión Interna</p>
          {isDemo && (
            <div style={{
              marginTop: '12px',
              padding: '6px 12px',
              backgroundColor: '#3b82f620',
              border: '1px solid #3b82f650',
              borderRadius: '8px',
              fontSize: '0.8rem',
              color: '#60a5fa',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              Demo: {rubroNames[rubro] || rubro}
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          <ul>
            {visibleNavItems.map((item) => {
              if (item.subItems) {
                const isExpanded = expandedMenus[item.label];
                return (
                  <li key={item.label}>
                    <div 
                      className="sidebar-link"
                      onClick={() => toggleSubmenu(item.label)}
                      style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="link-icon">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <span style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', fontSize: '0.8rem' }}>▼</span>
                    </div>
                    {isExpanded && (
                      <ul style={{ paddingLeft: '16px', listStyle: 'none', marginTop: '4px' }}>
                        {item.subItems.map(subItem => {
                          const isActive = location.pathname.startsWith(subItem.path);
                          return (
                            <li key={subItem.path} style={{ marginBottom: '4px' }}>
                              <Link 
                                to={subItem.path} 
                                className={`sidebar-link ${isActive ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                              >
                                <span className="link-icon" style={{ marginRight: '8px' }}>{subItem.icon}</span>
                                {subItem.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              const isActive = location.pathname.startsWith(item.path);
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="link-icon">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button 
            onClick={handleLogout} 
            className="sidebar-link logout-link" 
            style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}
            title="Cerrar Sesión"
          >
            <span className="link-icon"><LogOut size={20} /></span>
            <span>{isDemo ? 'Salir de Demo' : 'Cerrar Sesión'}</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      <main className="main-content" style={{ display: 'flex', flexDirection: 'column' }}>
        {isDemo && (
          <div style={{
            backgroundColor: '#1e3a8a',
            color: '#93c5fd',
            padding: '10px 20px',
            fontSize: '0.85rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #2563eb'
          }}>
            <span>Estás examinando la versión de prueba para: <strong>{rubroNames[rubro] || rubro}</strong>. Todos los cambios se guardan localmente.</span>
            <button 
              onClick={salirDemo}
              style={{
                backgroundColor: '#ef4444',
                color: '#fff',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Salir de Demo
            </button>
          </div>
        )}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

