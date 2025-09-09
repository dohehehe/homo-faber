import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server-client';

/**
 * GET /api/auth/session
 * 현재 사용자 세션 정보를 가져옵니다.
 */
export async function GET(request) {
  try {
    const supabase = createServerSupabaseClient();

    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Get session error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error('Unexpected error in GET /api/auth/session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * POST /api/auth/session
 * 사용자 세션을 새로고침합니다.
 */
export async function POST(request) {
  try {
    const supabase = createServerSupabaseClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Refresh user error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Unexpected error in POST /api/auth/session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
