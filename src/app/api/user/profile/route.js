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

    // 인증된 사용자인지 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // 사용자 프로필 업데이트
    const { data, error } = await supabase.auth.updateUser({
      data: profileData
    });

    if (error) {
      console.error('Error updating user profile:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error in PUT /api/user/profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
