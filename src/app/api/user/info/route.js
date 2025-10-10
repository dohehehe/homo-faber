import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server-client';

/**
 * GET /api/user/info
 * 현재 로그인한 사용자의 정보를 users 테이블에서 가져옵니다.
 */
export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    // 인증된 사용자인지 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 },
      );
    }

    console.log('Auth user ID:', user.id);
    console.log('Auth user email:', user.email);

    // users 테이블에서 사용자 정보 조회
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, created_at, updated_at')
      .eq('id', user.id)
      .single();

    console.log('Users table query result:', { data, error });

    if (error) {
      console.error('Error fetching user info:', error);

      // 사용자가 users 테이블에 없는 경우, 자동으로 생성
      if (error.code === 'PGRST116' || error.message.includes('No rows found')) {
        console.log('User not found in users table, creating new record...');

        const { data: newUserData, error: insertError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            name: user.user_metadata?.name || '사용자',
            email: user.email,
          })
          .select('id, name, email, created_at, updated_at')
          .single();

        if (insertError) {
          console.error('Error creating user in users table:', insertError);
          // 생성 실패 시 fallback
          return NextResponse.json({
            data: {
              id: user.id,
              name: user.user_metadata?.name || '사용자',
              email: user.email
            }
          });
        }

        return NextResponse.json({ data: newUserData });
      }

      // 다른 오류의 경우 fallback
      return NextResponse.json({
        data: {
          id: user.id,
          name: user.user_metadata?.name || '사용자',
          email: user.email
        }
      });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error in GET /api/user/info:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
