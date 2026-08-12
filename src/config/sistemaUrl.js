// URL del sistema real (jolly-turing / argentum-sistema), donde efectivamente
// se valida trial/licencia (ver AuthContext.jsx de ese repo). Argentum-Comercios
// nunca debe manejar sesiones reales de Supabase ni dejar operar el POS: solo
// landing, checkout y demo local. Cualquier "iniciar sesión" real tiene que
// mandar acá.
export const SISTEMA_URL = 'https://argentum-pp.vercel.app/';
