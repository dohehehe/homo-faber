import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server-client';

/**
 * GET /api/bookmarks
 * 사용자의 북마크 목록을 가져옵니다.
 */
export async function GET(request) {
  try {
    const supabase = createServerSupabaseClient();

    // 인증된 사용자인지 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from('bookmarks')
      .select(`
        *,
        stores (
          id,
          name,
          address,
          keyword,
          store_industry (
            industry_types (name)
          ),
          store_contacts (
            phone
          )
        )
      `)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching bookmarks:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error('Unexpected error in GET /api/bookmarks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * POST /api/bookmarks
 * 북마크를 추가합니다.
 */
export async function POST(request) {
  try {
    const supabase = createServerSupabaseClient();
    const { storeId } = await request.json();

    if (!storeId) {
      return NextResponse.json(
        { error: '스토어 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 인증된 사용자인지 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from('bookmarks')
      .insert([
        {
          user_id: user.id,
          store_id: storeId,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error adding bookmark:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error in POST /api/bookmarks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
