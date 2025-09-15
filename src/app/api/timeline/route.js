import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';

/**
 * GET /api/timeline
 * 모든 타임라인 목록을 가져옵니다.
 * year, month, date 순으로 정렬됩니다.
 */
export async function GET(request) {
  const supabase = createServerSupabaseClientSimple();

  try {
    const { data, error } = await supabase
      .from('timeline')
      .select('*')
      .order('year', { ascending: true })
      .order('month', { ascending: true })

    if (error) {
      console.error('Error fetching timelines:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error('Unexpected error in GET /api/timeline:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * POST /api/timeline
 * 새로운 타임라인을 생성합니다.
 */
export async function POST(request) {
  const supabase = createServerSupabaseClientSimple();
  const timelineData = await request.json();

  try {
    const { data, error } = await supabase
      .from('timeline')
      .insert([
        {
          year: timelineData.year,
          month: timelineData.month,
          title: timelineData.title,
          info: timelineData.info
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating timeline:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error in POST /api/timeline:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
