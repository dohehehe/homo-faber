import { createClient } from './client';

export async function getFnqs(userId = null) {
  const supabase = createClient();

  let query = supabase
    .from('fnq')
    .select('*')
    .order('created_at', { ascending: false });

  // 사용자별 필터링
  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function getFnqById(id) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('fnq')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createFnq(fnqData) {
  const supabase = createClient();

  try {
    const { data: fnq, error: fnqError } = await supabase
      .from('fnq')
      .insert({
        title: fnqData.title,
        material: fnqData.material || null,
        img: fnqData.img || null,
        detail: fnqData.detail,
        count: fnqData.count || null,
        due_date: fnqData.due_date || null,
        budget: fnqData.budget || null,
      })
      .select()
      .single();

    if (fnqError) throw fnqError;

    return fnq;
  } catch (error) {
    console.error('fnq 생성 중 오류:', error);
    throw error;
  }
}

export async function updateFnq(fnqId, fnqData) {
  const supabase = createClient();

  try {
    const { data: fnq, error: fnqError } = await supabase
      .from('fnq')
      .update({
        title: fnqData.title,
        material: fnqData.material || null,
        img: fnqData.img || null,
        detail: fnqData.detail,
        count: fnqData.count || null,
        due_date: fnqData.due_date || null,
        budget: fnqData.budget || null,
      })
      .eq('id', fnqId)
      .select()
      .single();

    if (fnqError) throw fnqError;

    return fnq;
  } catch (error) {
    console.error('fnq 업데이트 중 오류:', error);
    throw error;
  }
}

export async function deleteFnq(fnqId) {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from('fnq')
      .delete()
      .eq('id', fnqId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('fnq 삭제 중 오류:', error);
    throw error;
  }
}

export async function searchFnqs(searchKeyword, userId = null) {
  const supabase = createClient();

  let query = supabase
    .from('fnq')
    .select('*')
    .or(`title.ilike.%${searchKeyword}%,material.ilike.%${searchKeyword}%,detail.ilike.%${searchKeyword}%`)
    .order('created_at', { ascending: false });

  // 사용자별 필터링
  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}
