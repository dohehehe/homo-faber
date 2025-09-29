import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server-client';

// GET /api/fnq - 모든 fnq 조회
export async function GET(request) {
  try {
    const supabase = createServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    const searchKeyword = searchParams.get('search');
    const userId = searchParams.get('user_id');

    let query = supabase
      .from('fnq')
      .select(`
        *,
        fnq_status:status_id (
          id,
          status,
          name
        )
      `)
      .order('created_at', { ascending: false });

    // 사용자별 필터링
    if (userId) {
      query = query.eq('user_id', userId);
    }

    // 검색 키워드가 있는 경우
    if (searchKeyword && searchKeyword.trim() !== '') {
      query = query.or(`title.ilike.%${searchKeyword}%,detail.ilike.%${searchKeyword}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'fnq 목록을 불러오는 중 오류가 발생했습니다.' },
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

// POST /api/fnq - fnq 생성
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
      title,
      img,
      detail,
      count,
      due_date,
      budget,
      status_id
    } = body;

    // 입력 검증
    if (!title || !detail) {
      return NextResponse.json(
        { error: '제목과 상세내용은 필수입니다.' },
        { status: 400 }
      );
    }

    // fnq 생성 (user_id는 RLS를 통해 자동 설정됨)
    const { data: fnq, error: fnqError } = await supabase
      .from('fnq')
      .insert({
        title,
        img: img || null,
        detail,
        count: count || null,
        due_date: due_date || null,
        budget: budget || null,
        status_id: status_id || null,
      })
      .select(`
        *,
        fnq_status:status_id (
          id,
          status,
          name
        )
      `)
      .single();

    if (fnqError) {
      console.error('fnq creation error:', fnqError);
      return NextResponse.json(
        { error: 'fnq 생성 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: fnq });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
