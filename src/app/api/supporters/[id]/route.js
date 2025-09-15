import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';

// GET /api/supporters/[id] - 특정 서포터 조회
export async function GET(request, { params }) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: '서포터 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('supporter')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: '서포터를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '서포터 정보를 불러오는 중 오류가 발생했습니다.' },
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

// PUT /api/supporters/[id] - 서포터 수정
export async function PUT(request, { params }) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: '서포터 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const {
      name,
      description,
      website,
      logo_url,
      contact_email,
      contact_phone,
      address,
      latitude,
      longitude,
      is_active
    } = body;

    // 입력 검증
    if (!name) {
      return NextResponse.json(
        { error: '서포터명은 필수입니다.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('supporter')
      .update({
        name,
        description,
        website,
        logo_url,
        contact_email,
        contact_phone,
        address,
        latitude,
        longitude,
        is_active
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: '서포터를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      console.error('Supporter update error:', error);
      return NextResponse.json(
        { error: '서포터 수정 중 오류가 발생했습니다.' },
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

// DELETE /api/supporters/[id] - 서포터 삭제
export async function DELETE(request, { params }) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: '서포터 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('supporter')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supporter deletion error:', error);
      return NextResponse.json(
        { error: '서포터 삭제 중 오류가 발생했습니다.' },
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
