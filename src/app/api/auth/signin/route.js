import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server-client';

/**
 * POST /api/auth/signin
 * 사용자 로그인을 처리합니다.
 */
export async function POST(request) {
  try {
    const supabase = createServerSupabaseClient();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: '이메일과 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 성공적인 로그인 후 세션 새로고침
    if (data?.user) {
      await supabase.auth.refreshSession();
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error in POST /api/auth/signin:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
