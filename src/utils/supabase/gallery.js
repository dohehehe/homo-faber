import { createClient } from './client';

export async function getGalleryImages(storeId = null) {
  const supabase = createClient();

  let query = supabase
    .from('store_gallery')
    .select(`
      *,
      stores(
        id,
        name,
        person
      )
    `)
    .order('order_num', { ascending: true });

  // 특정 스토어의 갤러리만 조회하는 경우
  if (storeId) {
    query = query.eq('store_id', storeId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function getGalleryImageById(id) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('store_gallery')
    .select(`
      *,
      stores(
        id,
        name,
        person
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createGalleryImage(galleryData) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('store_gallery')
    .insert({
      store_id: galleryData.store_id,
      image_url: galleryData.image_url,
      order_num: galleryData.order_num || 1,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateGalleryImage(id, galleryData) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('store_gallery')
    .update({
      image_url: galleryData.image_url,
      order_num: galleryData.order_num,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteGalleryImage(id) {
  const supabase = createClient();

  const { error } = await supabase
    .from('store_gallery')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { success: true };
}
