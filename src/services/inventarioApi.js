import { supabase } from './supabaseClient';
import { isDemoMode, demoDb } from './demoService';

export const getInventario = async () => {
  if (isDemoMode()) {
    return demoDb.getInventario();
  }

  const { data, error } = await supabase
    .from('inventario')
    .select('*')
    .order('nombre', { ascending: true });

  if (error) throw error;
  return data;
};

export const addMercaderia = async (item) => {
  if (isDemoMode()) {
    return demoDb.addInventario(item);
  }

  const { data, error } = await supabase
    .from('inventario')
    .insert([item])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateMercaderia = async (id, itemData) => {
  if (isDemoMode()) {
    return demoDb.updateInventario(id, itemData);
  }

  const { data, error } = await supabase
    .from('inventario')
    .update({ ...itemData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteMercaderia = async (id) => {
  if (isDemoMode()) {
    return demoDb.deleteInventario(id);
  }

  const { error } = await supabase
    .from('inventario')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

export const uploadImage = async (file) => {
  if (isDemoMode()) {
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=60';
  }

  if (!file) return null;
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('productos')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('productos')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

