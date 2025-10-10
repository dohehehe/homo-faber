import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';

// GET /api/gallery/[id] - 특정 갤러리 이미지 조회
export async function GET(request, { params }) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: '갤러리 이미지 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('store_gallery')
      .select(`
        *,
        stores(
          id,
          name,
          person
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: '갤러리 이미지를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: '갤러리 이미지를 불러오는 중 오류가 발생했습니다.' },
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

// PUT /api/gallery/[id] - 갤러리 이미지 업데이트
export async function PUT(request, { params }) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: '갤러리 이미지 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const { image_url, order_num } = body;

    const updateData = {};
    if (image_url !== undefined) updateData.image_url = image_url;
    if (order_num !== undefined) updateData.order_num = order_num;

    const { data, error } = await supabase
      .from('store_gallery')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        stores(
          id,
          name,
          person
        )
      `)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '갤러리 이미지 업데이트 중 오류가 발생했습니다.' },
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

// DELETE /api/gallery/[id] - 갤러리 이미지 삭제
export async function DELETE(request, { params }) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: '갤러리 이미지 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('store_gallery')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '갤러리 이미지 삭제 중 오류가 발생했습니다.' },
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
