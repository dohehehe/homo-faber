import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';

// GET /api/words/[id] - 특정 단어 조회
export async function GET(request, { params }) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: '단어 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('word')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: '단어를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: '데이터를 불러오는 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// PUT /api/words/[id] - 단어 업데이트
export async function PUT(request, { params }) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: '단어 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('word')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '단어 업데이트 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE /api/words/[id] - 단어 삭제
export async function DELETE(request, { params }) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: '단어 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('word')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '단어 삭제 중 오류가 발생했습니다.' },
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
