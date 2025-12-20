import { createBrowserClient } from '@supabase/ssr';

// 환경변수를 API를 통해 가져오기
let supabaseConfig = null;
let supabaseClient = null;
let configPromise = null;
let isInitializing = false;

async function getSupabaseConfig() {
  if (supabaseConfig) {
    return supabaseConfig;
  }

  if (configPromise) {
    return configPromise;
  }

  configPromise = (async () => {
    try {
      const response = await fetch('/api/config/supabase');
      if (!response.ok) {
        throw new Error('Failed to fetch Supabase config');
      }
      const data = await response.json();
      supabaseConfig = {
        url: data.supabaseUrl,
        anonKey: data.supabaseAnonKey,
      };
      return supabaseConfig;
    } catch (error) {
      console.error('Error fetching Supabase config:', error);
      throw new Error('Missing Supabase environment variables');
    }
  })();

  return configPromise;
}

// 비동기 초기화 함수
async function initializeClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  if (isInitializing) {
    // 이미 초기화 중이면 대기
    while (isInitializing) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    return supabaseClient;
  }

  isInitializing = true;
  try {
    const config = await getSupabaseConfig();
    supabaseClient = createBrowserClient(config.url, config.anonKey);
    return supabaseClient;
  } finally {
    isInitializing = false;
  }
}

// 동기 버전 - 초기화가 완료된 경우에만 사용 가능
export const createClient = () => {
  if (supabaseClient) {
    return supabaseClient;
  }
  
  // 초기화가 안 된 경우 자동으로 초기화 시도 (동기적으로는 불가능하므로 에러)
  throw new Error('Supabase client not initialized. Call initializeSupabase() first in your app initialization.');
};

// 비동기 버전 - 자동 초기화
export const createClientAsync = async () => {
  return await initializeClient();
};

// 초기화 함수 (앱 시작 시 한 번 호출)
export const initializeSupabase = async () => {
  return await initializeClient();
};
