import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/server-client';

/**
 * PUT /api/user/profile
 * 사용자 프로필을 업데이트합니다.
 */
export async function PUT(request) {
  try {
    const supabase = createServerSupabaseClient();
    const profileData = await request.json();

    const { name, password } = profileData;

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

    const updateData = {};

    if (name) {
      updateData.data = { name };
    }

    if (password) {
      updateData.password = password;
    }

    // updateData가 비어있으면 업데이트할 것이 없음
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: '업데이트할 데이터가 없습니다.' },
        { status: 400 },
      );
    }

    // 사용자 프로필 업데이트
    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) {
      console.error('Error updating user profile:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // users 테이블도 함께 업데이트
    if (name) {
      const { error: usersTableError } = await supabase
        .from('users')
        .update({ name: name })
        .eq('id', user.id);

      if (usersTableError) {
        console.error('Error updating users table:', usersTableError);
        // users 테이블 업데이트 실패해도 auth 업데이트는 성공으로 처리
      }
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error in PUT /api/user/profile:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
