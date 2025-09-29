import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';

// GET /api/supporters - 모든 서포터 조회
export async function GET(request) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const { searchParams } = new URL(request.url);
    const searchKeyword = searchParams.get('search');

    let query = supabase
      .from('supporter')
      .select('*');

    // 검색 키워드가 있는 경우
    if (searchKeyword && searchKeyword.trim() !== '') {
      query = query.or(`name.ilike.%${searchKeyword}%,description.ilike.%${searchKeyword}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '서포터 목록을 불러오는 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 한국어 가나다순 정렬
    const sortedData = (data || []).sort((a, b) => {
      return a.name.localeCompare(b.name, 'ko-KR');
    });

    return NextResponse.json({ data: sortedData });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST /api/supporters - 서포터 생성
export async function POST(request) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const body = await request.json();

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
      is_active = true
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
      .insert({
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
      .select()
      .single();

    if (error) {
      console.error('Supporter creation error:', error);
      return NextResponse.json(
        { error: '서포터 생성 중 오류가 발생했습니다.' },
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
