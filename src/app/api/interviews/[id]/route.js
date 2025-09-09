import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';

/**
 * GET /api/interviews/[id]
 * 특정 인터뷰를 가져옵니다.
 */
export async function GET(request, { params }) {
  const supabase = createServerSupabaseClientSimple();
  const { id } = params;

  try {
    const { data, error } = await supabase
      .from('interview')
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
      console.error(`Error fetching interview with ID ${id}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error(`Unexpected error in GET /api/interviews/${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * PUT /api/interviews/[id]
 * 인터뷰를 업데이트합니다.
 */
export async function PUT(request, { params }) {
  const supabase = createServerSupabaseClientSimple();
  const { id } = params;
  const updateData = await request.json();

  try {
    const { data, error } = await supabase
      .from('interview')
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
      console.error(`Error updating interview with ID ${id}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Interview not found or no changes made' }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error(`Unexpected error in PUT /api/interviews/${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * DELETE /api/interviews/[id]
 * 인터뷰를 삭제합니다.
 */
export async function DELETE(request, { params }) {
  const supabase = createServerSupabaseClientSimple();
  const { id } = params;

  try {
    const { error } = await supabase
      .from('interview')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting interview with ID ${id}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Interview deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Unexpected error in DELETE /api/interviews/${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
