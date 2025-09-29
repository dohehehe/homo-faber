/**
 * API 라우트를 통한 북마크 관련 함수들
 * 서버사이드에서 실행되어 보안이 강화됨
 */

/**
 * 사용자의 북마크 목록을 가져옵니다.
 * @returns {Promise<Array>} 북마크 목록
 */
export async function getBookmarks() {
  try {
    const response = await fetch('/api/bookmarks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '북마크 목록을 불러오는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('API Error (getBookmarks):', error);
    throw error;
  }
}

/**
 * 북마크를 추가합니다.
 * @param {string} storeId - 스토어 ID
 * @returns {Promise<Object>} 생성된 북마크 데이터
 */
export async function addBookmark(storeId) {
  try {
    const response = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ storeId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '북마크 추가 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (addBookmark):', error);
    throw error;
  }
}

/**
 * 북마크를 삭제합니다.
 * @param {string} storeId - 스토어 ID
 * @returns {Promise<boolean>} 삭제 성공 여부
 */
export async function removeBookmark(storeId) {
  try {
    const response = await fetch(`/api/bookmarks/${storeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '북마크 삭제 중 오류가 발생했습니다.');
    }

    return true;
  } catch (error) {
    console.error('API Error (removeBookmark):', error);
    throw error;
  }
}

/**
 * 특정 스토어가 북마크되어 있는지 확인합니다.
 * @param {string} storeId - 스토어 ID
 * @returns {Promise<boolean>} 북마크 여부
 */
export async function isBookmarked(storeId) {
  try {
    const response = await fetch(`/api/bookmarks/${storeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '북마크 확인 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.isBookmarked;
  } catch (error) {
    console.error('API Error (isBookmarked):', error);
    throw error;
  }
}
