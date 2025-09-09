import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server-client';

/**
 * DELETE /api/bookmarks/[storeId]
 * 특정 스토어의 북마크를 삭제합니다.
 */
export async function DELETE(request, { params }) {
  try {
    const supabase = createServerSupabaseClient();
    const { storeId } = params;

    // 인증된 사용자인지 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', user.id)
      .eq('store_id', storeId);

    if (error) {
      console.error(`Error removing bookmark for store ${storeId}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Bookmark removed successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Unexpected error in DELETE /api/bookmarks/${storeId}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * GET /api/bookmarks/[storeId]
 * 특정 스토어가 북마크되어 있는지 확인합니다.
 */
export async function GET(request, { params }) {
  try {
    const supabase = createServerSupabaseClient();
    const { storeId } = params;

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
      .select('id')
      .eq('user_id', user.id)
      .eq('store_id', storeId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error(`Error checking bookmark for store ${storeId}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ isBookmarked: !!data });
  } catch (error) {
    console.error(`Unexpected error in GET /api/bookmarks/${storeId}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
