import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// 서버사이드용 Supabase 클라이언트 생성
export const createServerSupabaseClient = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // 서버 컴포넌트에서는 쿠키 설정이 제한될 수 있음
            console.warn('Cookie setting failed:', error);
          }
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            console.warn('Cookie removal failed:', error);
          }
        },
      },
    }
  );
};

// 서버사이드에서 사용할 간단한 클라이언트 (쿠키 없이)
export const createServerSupabaseClientSimple = () => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get() { return undefined; },
        set() { },
        remove() { },
      },
    }
  );
};
