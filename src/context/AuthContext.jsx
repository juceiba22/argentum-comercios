import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

// Argentum-Comercios es solo landing + checkout + demo local. NUNCA debe
// manejar sesiones reales de Supabase: el sistema real (con el gate de
// trial/licencia) es jolly-turing (ver SISTEMA_URL en config/sistemaUrl.js).
// "user" acá solo puede existir por haber entrado al modo demo (datos
// falsos en localStorage, ver services/demoService.js) — nunca por login
// real. Si en el futuro hace falta autenticación real en este repo, que
// redirija a SISTEMA_URL en vez de reimplementar login acá.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const salirDemo = () => {
    localStorage.removeItem('argentum_demo_mode');
    localStorage.removeItem('argentum_rubro');
    setUser(null);
    setRole(null);
    window.location.href = '/';
  };

  useEffect(() => {
    const isDemo = localStorage.getItem('argentum_demo_mode') === 'true';
    if (isDemo) {
      const rubro = localStorage.getItem('argentum_rubro') || 'carniceria';
      setUser({
        email: `admin@${rubro}.com`,
        user_metadata: { role: 'admin', rubro }
      });
      setRole('admin');
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, salirDemo }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

