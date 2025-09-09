import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server-client';

/**
 * POST /api/auth/signout
 * 사용자 로그아웃을 처리합니다.
 */
export async function POST(request) {
  try {
    const supabase = createServerSupabaseClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Sign out error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Successfully signed out' });
  } catch (error) {
    console.error('Unexpected error in POST /api/auth/signout:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
