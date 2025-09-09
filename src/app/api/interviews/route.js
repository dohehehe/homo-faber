import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';

/**
 * GET /api/interviews
 * 모든 인터뷰 목록을 가져옵니다.
 */
export async function GET(request) {
  const supabase = createServerSupabaseClientSimple();
  const { searchParams } = new URL(request.url);
  const storeId = searchParams.get('store_id');

  try {
    let query = supabase
      .from('interview')
      .select(`
        *,
        stores(
          id,
          name,
          person
        )
      `);

    if (storeId) {
      query = query.eq('store_id', storeId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching interviews:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error('Unexpected error in GET /api/interviews:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * POST /api/interviews
 * 새로운 인터뷰를 생성합니다.
 */
export async function POST(request) {
  const supabase = createServerSupabaseClientSimple();
  const interviewData = await request.json();

  try {
    const { data, error } = await supabase
      .from('interview')
      .insert([
        {
          store_id: interviewData.store_id,
          contents: interviewData.contents,
          intro: interviewData.intro,
          cover_img: interviewData.cover_img,
          date: interviewData.date,
          interviewee: interviewData.interviewee,
          created_at: new Date().toISOString()
        }
      ])
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
      console.error('Error creating interview:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error in POST /api/interviews:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}