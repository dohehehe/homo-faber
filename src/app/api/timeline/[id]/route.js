import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';

/**
 * GET /api/timeline/[id]
 * 특정 타임라인을 가져옵니다.
 */
export async function GET(request, { params }) {
  const supabase = createServerSupabaseClientSimple();
  const { id } = params;

  try {
    const { data, error } = await supabase
      .from('timeline')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching timeline with ID ${id}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Timeline not found' }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error(`Unexpected error in GET /api/timeline/${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * PUT /api/timeline/[id]
 * 타임라인을 업데이트합니다.
 */
export async function PUT(request, { params }) {
  const supabase = createServerSupabaseClientSimple();
  const { id } = params;
  const updateData = await request.json();

  try {
    const { data, error } = await supabase
      .from('timeline')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating timeline with ID ${id}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Timeline not found or no changes made' }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error(`Unexpected error in PUT /api/timeline/${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * DELETE /api/timeline/[id]
 * 타임라인을 삭제합니다.
 */
export async function DELETE(request, { params }) {
  const supabase = createServerSupabaseClientSimple();
  const { id } = params;

  try {
    const { error } = await supabase
      .from('timeline')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting timeline with ID ${id}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Timeline deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Unexpected error in DELETE /api/timeline/${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

