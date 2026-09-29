import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';
import { getKeywordKind } from '@/utils/keyword-kinds';

export async function PUT(request, { params }) {
  try {
    const kind = getKeywordKind(params.kind);
    if (!kind) {
      return NextResponse.json({ error: '잘못된 키워드 종류입니다.' }, { status: 400 });
    }
    if (!params.id) {
      return NextResponse.json({ error: '키워드 ID가 필요합니다.' }, { status: 400 });
    }

    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    if (!name) {
      return NextResponse.json({ error: '이름을 입력해주세요.' }, { status: 400 });
    }

    const supabase = createServerSupabaseClientSimple();
    const { data: existingName, error: duplicateError } = await supabase
      .from(kind.table)
      .select('id')
      .eq('name', name)
      .limit(1);

    if (duplicateError) {
      console.error('Keyword duplicate check error:', duplicateError);
      return NextResponse.json({ error: '키워드 확인 중 오류가 발생했습니다.' }, { status: 500 });
    }
    if (existingName?.[0] && existingName[0].id !== params.id) {
      return NextResponse.json({ error: '이미 있는 이름입니다.' }, { status: 409 });
    }

    const { data, error } = await supabase
      .from(kind.table)
      .update({ name })
      .eq('id', params.id)
      .select('id, name')
      .single();

    if (error) {
      console.error('Keyword update error:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: '키워드를 찾을 수 없습니다.' }, { status: 404 });
      }
      if (error.code === '23505') {
        return NextResponse.json({ error: '이미 있는 이름입니다.' }, { status: 409 });
      }
      return NextResponse.json({ error: '키워드 수정 중 오류가 발생했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const kind = getKeywordKind(params.kind);
    if (!kind) {
      return NextResponse.json({ error: '잘못된 키워드 종류입니다.' }, { status: 400 });
    }
    if (!params.id) {
      return NextResponse.json({ error: '키워드 ID가 필요합니다.' }, { status: 400 });
    }

    const supabase = createServerSupabaseClientSimple();
    const { error: linkError } = await supabase
      .from(kind.junction)
      .delete()
      .eq(kind.foreignKey, params.id);

    if (linkError) {
      console.error('Keyword link delete error:', linkError);
      return NextResponse.json(
        { error: '연결된 가게 키워드를 삭제하는 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    const { data, error } = await supabase
      .from(kind.table)
      .delete()
      .eq('id', params.id)
      .select('id, name');

    if (error) {
      console.error('Keyword delete error:', error);
      return NextResponse.json({ error: '키워드 삭제 중 오류가 발생했습니다.' }, { status: 500 });
    }
    if (!data || data.length === 0) {
      return NextResponse.json({ error: '키워드를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ data: data[0] });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
