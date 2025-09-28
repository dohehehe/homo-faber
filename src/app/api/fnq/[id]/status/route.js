import { NextResponse } from 'next/server';
import { updateFnqStatus } from '@/utils/supabase/fnq';

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

    const updatedFnq = await updateFnqStatus(id, status_id);

    return NextResponse.json({
      success: true,
      data: updatedFnq
    });

  } catch (error) {
    console.error('fnq 상태 업데이트 오류:', error);
    return NextResponse.json(
      { error: error.message || 'fnq 상태 업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
