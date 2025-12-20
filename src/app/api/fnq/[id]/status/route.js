import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { status_id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'fnq ID가 필요합니다.' },
        { status: 400 }
      );
    }

    if (!status_id) {
      return NextResponse.json(
        { error: '상태 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClientSimple();

    const { data: fnq, error: fnqError } = await supabase
      .from('fnq')
      .update({
        status_id: status_id,
      })
      .eq('id', id)
      .select(`
        *,
        fnq_status:status_id (
          id,
          status,
          name
        )
      `)
      .single();

    if (fnqError) {
      throw fnqError;
    }

    return NextResponse.json({
      success: true,
      data: fnq
    });

  } catch (error) {
    console.error('fnq 상태 업데이트 오류:', error);
    return NextResponse.json(
      { error: error.message || 'fnq 상태 업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
