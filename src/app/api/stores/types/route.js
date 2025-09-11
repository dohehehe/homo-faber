import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';

// GET /api/stores/types - 모든 타입 정보 조회
export async function GET(request) {
  try {
    const supabase = createServerSupabaseClientSimple();

    // 병렬로 모든 타입 정보 조회
    const [
      industryTypesResult,
      capacityTypesResult,
      materialTypesResult
    ] = await Promise.all([
      supabase
        .from('industry_types')
        .select('id, name')
        .order('name'),
      supabase
        .from('capacity_types')
        .select('id, name')
        .order('name'),
      supabase
        .from('material_types')
        .select('id, name')
        .order('name')
    ]);

    // 에러 확인
    if (industryTypesResult.error) {
      console.error('Industry types error:', industryTypesResult.error);
      return NextResponse.json(
        { error: '업종 타입 정보를 불러오는 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    if (capacityTypesResult.error) {
      console.error('Capacity types error:', capacityTypesResult.error);
      return NextResponse.json(
        { error: '용량 타입 정보를 불러오는 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    if (materialTypesResult.error) {
      console.error('Material types error:', materialTypesResult.error);
      return NextResponse.json(
        { error: '재료 타입 정보를 불러오는 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    const data = {
      industryTypes: industryTypesResult.data || [],
      capacityTypes: capacityTypesResult.data || [],
      materialTypes: materialTypesResult.data || []
    };


    return NextResponse.json({ data }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
