import { createClient } from './client';

export async function getSupporters() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('supporter')
    .select('*');

  if (error) throw error;

  // 한국어 가나다순 정렬
  const sortedData = data.sort((a, b) => {
    return a.name.localeCompare(b.name, 'ko-KR');
  });

  return sortedData;
}

export async function getSupporterById(id) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('supporter')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createSupporter(supporterData) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('supporter')
    .insert(supporterData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSupporter(id, supporterData) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('supporter')
    .update(supporterData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSupporter(id) {
  const supabase = createClient();

  const { error } = await supabase
    .from('supporter')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { success: true };
}
