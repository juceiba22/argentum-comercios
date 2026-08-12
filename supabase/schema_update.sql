-- ==========================================
-- SCRIPT DE ACTUALIZACIÓN DE ESQUEMA SUPABASE
-- Modelo de prueba de 15 días y Licencias
-- ==========================================

-- 1. Tabla 'tenants' (o comercios)
CREATE TABLE IF NOT EXISTS public.tenants (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Agregar campos para la prueba gratuita
DO $$
BEGIN
  -- Fecha de fin de la prueba (15 días a partir de la creación)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tenants' AND column_name='trial_ends_at') THEN
    ALTER TABLE public.tenants ADD COLUMN trial_ends_at timestamp with time zone DEFAULT (now() + interval '15 days');
  END IF;

  -- Estado general del comercio
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tenants' AND column_name='is_active') THEN
    ALTER TABLE public.tenants ADD COLUMN is_active boolean DEFAULT true;
  END IF;
END $$;


-- 2. Tabla 'licencias_activas'
CREATE TABLE IF NOT EXISTS public.licencias_activas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL, -- Vinculado al tenant
  plan text NOT NULL,
  estado text DEFAULT 'activa',
  fecha_compra timestamp with time zone DEFAULT now(),
  valida_hasta timestamp with time zone NOT NULL,
  external_reference_pago text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  
  -- Relación con la tabla tenants (Opcional pero recomendada para consistencia referencial)
  CONSTRAINT fk_licencias_tenants FOREIGN KEY (email) REFERENCES public.tenants (email) ON DELETE CASCADE
);


-- 3. Tabla 'licencias_pagos' (para rastrear intentos de pago de Mercado Pago)
CREATE TABLE IF NOT EXISTS public.licencias_pagos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  plan text NOT NULL,
  monto numeric NOT NULL,
  estado text DEFAULT 'pendiente',
  external_reference text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 4. Índices para agilizar las validaciones por email
CREATE INDEX IF NOT EXISTS idx_tenants_email ON public.tenants(email);
CREATE INDEX IF NOT EXISTS idx_licencias_activas_email ON public.licencias_activas(email);
CREATE INDEX IF NOT EXISTS idx_licencias_pagos_ext_ref ON public.licencias_pagos(external_reference);
