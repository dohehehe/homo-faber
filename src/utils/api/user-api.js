/**
 * API 라우트를 통한 사용자 관련 함수들
 * 서버사이드에서 실행되어 보안이 강화됨
 */

/**
 * 사용자 프로필을 업데이트합니다.
 * @param {Object} profileData - 업데이트할 프로필 데이터
 * @returns {Promise<Object>} 업데이트된 사용자 데이터
 */
export async function updateUserProfile(profileData) {
  try {
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '프로필 업데이트 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (updateUserProfile):', error);
    throw error;
  }
}
