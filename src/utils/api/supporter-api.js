/**
 * API 라우트를 통한 서포터 관련 함수들
 * 서버사이드에서 실행되어 보안이 강화됨
 */

/**
 * 모든 서포터를 가져옵니다.
 * @param {string} searchKeyword - 검색 키워드 (선택사항)
 * @returns {Promise<Array>} 서포터 목록
 */
export async function getSupporters(searchKeyword = '') {
  try {
    const params = new URLSearchParams();
    if (searchKeyword && searchKeyword.trim() !== '') {
      params.append('search', searchKeyword.trim());
    }

    const response = await fetch(`/api/supporters?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '서포터 목록을 불러오는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('API Error (getSupporters):', error);
    throw error;
  }
}

/**
 * 특정 서포터를 가져옵니다.
 * @param {string} supporterId - 서포터 ID
 * @returns {Promise<Object>} 서포터 데이터
 */
export async function getSupporterById(supporterId) {
  try {
    if (!supporterId) {
      throw new Error('서포터 ID가 필요합니다.');
    }

    const response = await fetch(`/api/supporters/${supporterId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 404) {
        throw new Error('서포터를 찾을 수 없습니다.');
      }
      throw new Error(errorData.error || '서포터 정보를 불러오는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (getSupporterById):', error);
    throw error;
  }
}

/**
 * 서포터를 생성합니다.
 * @param {Object} supporterData - 서포터 데이터
 * @returns {Promise<Object>} 생성된 서포터 데이터
 */
export async function createSupporter(supporterData) {
  try {
    const response = await fetch('/api/supporters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(supporterData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '서포터 생성 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (createSupporter):', error);
    throw error;
  }
}

/**
 * 서포터를 업데이트합니다.
 * @param {string} supporterId - 서포터 ID
 * @param {Object} updateData - 업데이트할 데이터
 * @returns {Promise<Object>} 업데이트된 서포터 데이터
 */
export async function updateSupporter(supporterId, updateData) {
  try {
    if (!supporterId) {
      throw new Error('서포터 ID가 필요합니다.');
    }

    const response = await fetch(`/api/supporters/${supporterId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '서포터 업데이트 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (updateSupporter):', error);
    throw error;
  }
}

/**
 * 서포터를 삭제합니다.
 * @param {string} supporterId - 서포터 ID
 * @returns {Promise<boolean>} 삭제 성공 여부
 */
export async function deleteSupporter(supporterId) {
  try {
    if (!supporterId) {
      throw new Error('서포터 ID가 필요합니다.');
    }

    const response = await fetch(`/api/supporters/${supporterId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '서포터 삭제 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('API Error (deleteSupporter):', error);
    throw error;
  }
}
