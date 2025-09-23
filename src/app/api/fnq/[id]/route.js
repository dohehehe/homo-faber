import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server-client';

// GET /api/fnq/[id] - 특정 fnq 조회
export async function GET(request, { params }) {
  try {
    const supabase = createServerSupabaseClient();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'fnq ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const { data: fnq, error } = await supabase
      .from('fnq')
      .select(`
        *,
        fnq_status:status_id (
          id,
          status,
          name
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'fnq를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'fnq 정보를 불러오는 중 오류가 발생했습니다.' },
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

// PUT /api/fnq/[id] - fnq 업데이트
export async function PUT(request, { params }) {
  try {
    const supabase = createServerSupabaseClient();
    const { id } = params;

    // 현재 사용자 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'fnq ID가 필요합니다.' },
        { status: 400 }
      );
    }

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

    // 먼저 해당 fnq가 현재 사용자의 것인지 확인
    const { data: existingFnq, error: fetchError } = await supabase
      .from('fnq')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'fnq를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'fnq 조회 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    if (existingFnq.user_id !== user.id) {
      return NextResponse.json(
        { error: '권한이 없습니다.' },
        { status: 403 }
      );
    }

    const { data: fnq, error } = await supabase
      .from('fnq')
      .update({
        title,
        img: img || null,
        detail,
        count: count || null,
        due_date: due_date || null,
        budget: budget || null,
        status_id: status_id || null,
      })
      .eq('id', id)
      .select(`
        *,
        fnq_status:status_id (
          id,
          status,
          name
        )
      `)
      .single();

    if (error) {
      console.error('fnq update error:', error);
      return NextResponse.json(
        { error: 'fnq 업데이트 중 오류가 발생했습니다.' },
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

// DELETE /api/fnq/[id] - fnq 삭제
export async function DELETE(request, { params }) {
  try {
    const supabase = createServerSupabaseClient();
    const { id } = params;

    // 현재 사용자 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: 'fnq ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 먼저 해당 fnq가 현재 사용자의 것인지 확인
    const { data: existingFnq, error: fetchError } = await supabase
      .from('fnq')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'fnq를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'fnq 조회 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    if (existingFnq.user_id !== user.id) {
      return NextResponse.json(
        { error: '권한이 없습니다.' },
        { status: 403 }
      );
    }

    const { error } = await supabase
      .from('fnq')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('fnq delete error:', error);
      return NextResponse.json(
        { error: 'fnq 삭제 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
