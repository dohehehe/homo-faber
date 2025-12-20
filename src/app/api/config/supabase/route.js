import { NextResponse } from 'next/server';

/**
 * GET /api/config/supabase
 * Supabase 클라이언트 설정 정보를 반환합니다 (서버 사이드에서만 접근 가능)
 */
export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Supabase 환경 변수가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      supabaseUrl,
      supabaseAnonKey,
    });
  } catch (error) {
    console.error('Supabase config API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

