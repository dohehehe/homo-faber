import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server-client';

/**
 * POST /api/auth/signup
 * 사용자 회원가입을 처리합니다.
 */
export async function POST(request) {
  try {
    const supabase = createServerSupabaseClient();
    const { email, password, userData } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: '이메일과 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
      },
    });

    if (error) {
      console.error('Sign up error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 회원가입 성공 시 users 테이블에 사용자 정보 생성
    if (data?.user) {
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          name: userData?.name || '사용자',
          email: email,
        });

      if (insertError) {
        console.error('Error creating user in users table:', insertError);
        // users 테이블 삽입 실패해도 회원가입은 성공으로 처리
      }
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error in POST /api/auth/signup:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
