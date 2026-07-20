import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const AuthContext = createContext();

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
      setLoading(false);
      return;
    }

    const resolveRole = (sessionUser) => {
      if (!sessionUser) return null;
      if (sessionUser.email === 'ventas@argentum.com') return 'ventas';
      return sessionUser.user_metadata?.role || 'admin';
    };

    // Inicializar sesión
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setRole(resolveRole(session?.user));
      setLoading(false);
    });

    // Escuchar cambios de estado
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Si entra en demo durante la sesión, prevenir sobreescribir con null de Supabase
      if (localStorage.getItem('argentum_demo_mode') === 'true') return;
      setUser(session?.user || null);
      setRole(resolveRole(session?.user));
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, salirDemo }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

