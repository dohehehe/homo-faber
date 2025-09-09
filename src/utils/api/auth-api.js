/**
 * API 라우트를 통한 인증 관련 함수들
 * 서버사이드에서 실행되어 보안이 강화됨
 */

/**
 * 사용자 로그인을 처리합니다.
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @returns {Promise<Object>} 로그인 결과
 */
export async function signIn(email, password) {
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { data: null, error: { message: result.error } };
    }

    return { data: result.data, error: null };
  } catch (error) {
    console.error('API Error (signIn):', error);
    return { data: null, error };
  }
}

/**
 * 사용자 회원가입을 처리합니다.
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @param {Object} userData - 사용자 데이터
 * @returns {Promise<Object>} 회원가입 결과
 */
export async function signUp(email, password, userData) {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, userData }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { data: null, error: { message: result.error } };
    }

    return { data: result.data, error: null };
  } catch (error) {
    console.error('API Error (signUp):', error);
    return { data: null, error };
  }
}

/**
 * 사용자 로그아웃을 처리합니다.
 * @returns {Promise<Object>} 로그아웃 결과
 */
export async function signOut() {
  try {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: { message: result.error } };
    }

    return { error: null };
  } catch (error) {
    console.error('API Error (signOut):', error);
    return { error };
  }
}

/**
 * 현재 사용자 세션을 가져옵니다.
 * @returns {Promise<Object>} 세션 정보
 */
export async function getSession() {
  try {
    const response = await fetch('/api/auth/session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return { session: null, error: { message: result.error } };
    }

    return { session: result.session, error: null };
  } catch (error) {
    console.error('API Error (getSession):', error);
    return { session: null, error };
  }
}

/**
 * 사용자 정보를 새로고침합니다.
 * @returns {Promise<Object>} 사용자 정보
 */
export async function refreshUser() {
  try {
    const response = await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return { user: null, error: { message: result.error } };
    }

    return { user: result.user, error: null };
  } catch (error) {
    console.error('API Error (refreshUser):', error);
    return { user: null, error };
  }
}
