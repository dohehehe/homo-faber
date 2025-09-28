/**
 * API 라우트를 통한 fnq 관련 함수들
 * 서버사이드에서 실행되어 보안이 강화됨
 */

/**
 * 모든 fnq를 가져옵니다.
 * @param {string} searchKeyword - 검색 키워드 (선택사항)
 * @param {string} userId - 사용자 ID (선택사항)
 * @returns {Promise<Array>} fnq 목록
 */
export async function getFnqs(searchKeyword = '', userId = null) {
  try {
    const params = new URLSearchParams();
    if (searchKeyword && searchKeyword.trim() !== '') {
      params.append('search', searchKeyword.trim());
    }
    if (userId) {
      params.append('user_id', userId);
    }

    const response = await fetch(`/api/fnq?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'fnq 목록을 불러오는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('API Error (getFnqs):', error);
    throw error;
  }
}

/**
 * 특정 fnq를 가져옵니다.
 * @param {string} fnqId - fnq ID
 * @returns {Promise<Object>} fnq 데이터
 */
export async function getFnqById(fnqId) {
  try {
    if (!fnqId) {
      throw new Error('fnq ID가 필요합니다.');
    }

    const response = await fetch(`/api/fnq/${fnqId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 404) {
        throw new Error('fnq를 찾을 수 없습니다.');
      }
      throw new Error(errorData.error || 'fnq 정보를 불러오는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (getFnqById):', error);
    throw error;
  }
}

/**
 * fnq를 생성합니다.
 * @param {Object} fnqData - fnq 데이터
 * @returns {Promise<Object>} 생성된 fnq 데이터
 */
export async function createFnq(fnqData) {
  try {
    const response = await fetch('/api/fnq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fnqData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'fnq 생성 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (createFnq):', error);
    throw error;
  }
}

/**
 * fnq를 업데이트합니다.
 * @param {string} fnqId - fnq ID
 * @param {Object} updateData - 업데이트할 데이터
 * @returns {Promise<Object>} 업데이트된 fnq 데이터
 */
export async function updateFnq(fnqId, updateData) {
  try {
    if (!fnqId) {
      throw new Error('fnq ID가 필요합니다.');
    }

    const response = await fetch(`/api/fnq/${fnqId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'fnq 업데이트 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (updateFnq):', error);
    throw error;
  }
}

/**
 * fnq를 삭제합니다.
 * @param {string} fnqId - fnq ID
 * @returns {Promise<boolean>} 삭제 성공 여부
 */
export async function deleteFnq(fnqId) {
  try {
    if (!fnqId) {
      throw new Error('fnq ID가 필요합니다.');
    }

    const response = await fetch(`/api/fnq/${fnqId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'fnq 삭제 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('API Error (deleteFnq):', error);
    throw error;
  }
}

/**
 * fnq 상태를 업데이트합니다.
 * @param {string} fnqId - fnq ID
 * @param {string} statusId - 새로운 상태 ID
 * @returns {Promise<Object>} 업데이트된 fnq 데이터
 */
export async function updateFnqStatus(fnqId, statusId) {
  try {
    if (!fnqId) {
      throw new Error('fnq ID가 필요합니다.');
    }

    if (!statusId) {
      throw new Error('상태 ID가 필요합니다.');
    }

    const response = await fetch(`/api/fnq/${fnqId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status_id: statusId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'fnq 상태 업데이트 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (updateFnqStatus):', error);
    throw error;
  }
}

/**
 * 모든 fnq_status를 가져옵니다.
 * @returns {Promise<Array>} fnq_status 목록
 */
export async function getFnqStatuses() {
  try {
    const response = await fetch('/api/fnq-status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'fnq_status 목록을 불러오는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('API Error (getFnqStatuses):', error);
    throw error;
  }
}

