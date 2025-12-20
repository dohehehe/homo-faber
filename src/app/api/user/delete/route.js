import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerSupabaseClient } from '@/utils/supabase/server-client';

export async function DELETE(request) {
  try {
    const supabase = createServerSupabaseClient();
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

    const userId = user.id;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!serviceRoleKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 },
      );
    }

    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    // users 테이블에서 사용자 데이터 삭제
    const { error: deleteUserError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', userId);

    if (deleteUserError) {
      console.error('Error deleting user data:', deleteUserError);
    }

    // auth.users에서 사용자 완전 삭제
    const { error: deleteAuthError } =
      await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteAuthError) {
      console.error('Error deleting auth user:', deleteAuthError);
      return NextResponse.json(
        { error: '계정 삭제에 실패했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: '계정이 성공적으로 삭제되었습니다.',
    });
  } catch (error) {
    console.error('Unexpected error in DELETE /api/user/delete:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
