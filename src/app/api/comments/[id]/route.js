import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server-client';

// GET /api/comments/[id] - 특정 comment 조회
export async function GET(request, { params }) {
  try {
    const supabase = createServerSupabaseClient();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'comment ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const { data: comment, error } = await supabase
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
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: '댓글을 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: '댓글 정보를 불러오는 중 오류가 발생했습니다.' },
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

// PUT /api/comments/[id] - comment 업데이트
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
        { error: 'comment ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const {
      contents,
      gallery
    } = body;

    // 입력 검증
    if (!contents) {
      return NextResponse.json(
        { error: '댓글 내용은 필수입니다.' },
        { status: 400 }
      );
    }

    // 먼저 해당 comment가 현재 사용자의 것인지 확인
    const { data: existingComment, error: fetchError } = await supabase
      .from('comments')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: '댓글을 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: '댓글 조회 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    if (existingComment.user_id !== user.id) {
      return NextResponse.json(
        { error: '권한이 없습니다.' },
        { status: 403 }
      );
    }

    const { data: comment, error } = await supabase
      .from('comments')
      .update({
        contents,
        gallery: gallery !== undefined ? gallery : null,
      })
      .eq('id', id)
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

    if (error) {
      console.error('comment update error:', error);
      return NextResponse.json(
        { error: '댓글 수정 중 오류가 발생했습니다.' },
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

// DELETE /api/comments/[id] - comment 삭제
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
        { error: 'comment ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 먼저 해당 comment가 현재 사용자의 것인지 확인
    const { data: existingComment, error: fetchError } = await supabase
      .from('comments')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: '댓글을 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: '댓글 조회 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    if (existingComment.user_id !== user.id) {
      return NextResponse.json(
        { error: '권한이 없습니다.' },
        { status: 403 }
      );
    }

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('comment delete error:', error);
      return NextResponse.json(
        { error: '댓글 삭제 중 오류가 발생했습니다.' },
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
