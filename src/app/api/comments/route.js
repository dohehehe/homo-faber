import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server-client';

// GET /api/comments - 모든 comments 조회
export async function GET(request) {
  try {
    const supabase = createServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get('store_id');
    const userId = searchParams.get('user_id');

    let query = supabase
      .from('comments')
      .select(`
        *,
        stores(
          id,
          name
        ),
        users(
          id,
          name
        )
      `)
      .order('created_at', { ascending: false });

    // 스토어별 필터링
    if (storeId) {
      query = query.eq('store_id', storeId);
    }

    // 사용자별 필터링
    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '댓글 목록을 불러오는 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST /api/comments - comment 생성
export async function POST(request) {
  try {
    const supabase = createServerSupabaseClient();

    // 현재 사용자 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      store_id,
      contents,
      gallery
    } = body;

    // 입력 검증
    if (!store_id || !contents) {
      return NextResponse.json(
        { error: '스토어 ID와 댓글 내용은 필수입니다.' },
        { status: 400 }
      );
    }

    // 스토어 존재 여부 확인
    const { data: store, error: storeError } = await supabase
      .from('stores')
      .select('id')
      .eq('id', store_id)
      .single();

    if (storeError || !store) {
      return NextResponse.json(
        { error: '존재하지 않는 스토어입니다.' },
        { status: 404 }
      );
    }

    // comment 생성 (user_id는 RLS를 통해 자동 설정됨)
    const { data: comment, error: commentError } = await supabase
      .from('comments')
      .insert({
        store_id,
        contents,
        gallery: gallery || null,
      })
      .select(`
        *,
        stores(
          id,
          name
        ),
        users(
          id,
          name
        )
      `)
      .single();

    if (commentError) {
      console.error('comment creation error:', commentError);
      return NextResponse.json(
        { error: '댓글 생성 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: comment });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
