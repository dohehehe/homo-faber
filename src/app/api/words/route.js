import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';

// GET /api/words - 모든 단어 조회
export async function GET(request) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    let query = supabase
      .from('word')
      .select('*')
      .order('name', { ascending: true });

    // 이름으로 검색하는 경우
    if (name && name.trim() !== '') {
      query = query.ilike('name', `%${name}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '데이터를 불러오는 중 오류가 발생했습니다.' },
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

// POST /api/words - 단어 생성
export async function POST(request) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const body = await request.json();

    const { name, meaning, source, img } = body;

    // 입력 검증
    if (!name || !meaning) {
      return NextResponse.json(
        { error: '단어명과 의미는 필수입니다.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('word')
      .insert([
        {
          name,
          meaning,
          source: source || null,
          img: img || []
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '단어 생성 중 오류가 발생했습니다.' },
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
