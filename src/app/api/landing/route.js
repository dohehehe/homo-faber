import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';
import { DEFAULT_LANDING_SECTIONS, mergeLandingSections } from '@/config/landingSections';

export async function GET() {
  try {
    const supabase = createServerSupabaseClientSimple();
    const { data, error } = await supabase
      .from('landing_sections')
      .select('*')
      .order('sort_order');

    if (error) {
      console.error('Landing sections fetch error:', error);
      return NextResponse.json({ sections: DEFAULT_LANDING_SECTIONS });
    }

    return NextResponse.json({ sections: mergeLandingSections(data || []) });
  } catch (error) {
    console.error('Landing GET error:', error);
    return NextResponse.json({ sections: DEFAULT_LANDING_SECTIONS });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const sections = Array.isArray(body?.sections) ? body.sections : [];
    if (sections.length === 0) {
      return NextResponse.json({ error: '저장할 섹션이 없습니다.' }, { status: 400 });
    }

    const supabase = createServerSupabaseClientSimple();
    const payload = sections.map((section, index) => ({
      id: section.id,
      sort_order: section.sort_order ?? index + 1,
      media_url: section.media_url || null,
      media_type: section.media_type === 'video' ? 'video' : 'image',
      title: section.title || '',
      body: section.body || '',
      button_label: section.button_label || '',
      button_href: section.button_href || '',
      updated_at: new Date().toISOString(),
    }));

    const { data, error } = await supabase
      .from('landing_sections')
      .upsert(payload, { onConflict: 'id' })
      .select();

    if (error) {
      console.error('Landing sections update error:', error);
      return NextResponse.json({ error: '랜딩 정보 저장 중 오류가 발생했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ sections: mergeLandingSections(data || payload) });
  } catch (error) {
    console.error('Landing PUT error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
