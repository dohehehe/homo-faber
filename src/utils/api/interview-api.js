/**
 * API 라우트를 통한 인터뷰 관련 함수들
 * 서버사이드에서 실행되어 보안이 강화됨
 */

/**
 * 모든 인터뷰를 가져옵니다.
 * @param {string} storeId - 특정 스토어 ID (선택사항)
 * @returns {Promise<Array>} 인터뷰 목록
 */
export async function getInterviews(storeId = null) {
  try {
    const params = new URLSearchParams();
    if (storeId) {
      params.append('store_id', storeId);
    }

    const response = await fetch(`/api/interviews?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '인터뷰를 불러오는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('API Error (getInterviews):', error);
    throw error;
  }
}

/**
 * 특정 스토어의 인터뷰 목록을 가져옵니다.
 * @param {string} storeId - 스토어 ID
 * @returns {Promise<Array>} 인터뷰 목록
 */
export async function getInterviewsByStore(storeId) {
  try {
    if (!storeId) {
      throw new Error('스토어 ID가 필요합니다.');
    }

    return await getInterviews(storeId);
  } catch (error) {
    console.error('API Error (getInterviewsByStore):', error);
    throw error;
  }
}

/**
 * 특정 인터뷰를 가져옵니다.
 * @param {string} interviewId - 인터뷰 ID
 * @returns {Promise<Object>} 인터뷰 데이터
 */
export async function getInterviewById(interviewId) {
  try {
    if (!interviewId) {
      throw new Error('인터뷰 ID가 필요합니다.');
    }

    const response = await fetch(`/api/interviews/${interviewId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 404) {
        throw new Error('인터뷰를 찾을 수 없습니다.');
      }
      throw new Error(errorData.error || '인터뷰를 불러오는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (getInterviewById):', error);
    throw error;
  }
}

/**
 * 인터뷰를 생성합니다.
 * @param {Object} interviewData - 인터뷰 데이터
 * @returns {Promise<Object>} 생성된 인터뷰 데이터
 */
export async function createInterview(interviewData) {
  try {
    const response = await fetch('/api/interviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(interviewData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '인터뷰 생성 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (createInterview):', error);
    throw error;
  }
}

/**
 * 인터뷰를 업데이트합니다.
 * @param {string} interviewId - 인터뷰 ID
 * @param {Object} updateData - 업데이트할 데이터
 * @returns {Promise<Object>} 업데이트된 인터뷰 데이터
 */
export async function updateInterview(interviewId, updateData) {
  try {
    if (!interviewId) {
      throw new Error('인터뷰 ID가 필요합니다.');
    }

    const response = await fetch(`/api/interviews/${interviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '인터뷰 업데이트 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (updateInterview):', error);
    throw error;
  }
}

/**
 * 인터뷰를 삭제합니다.
 * @param {string} interviewId - 인터뷰 ID
 * @returns {Promise<boolean>} 삭제 성공 여부
 */
export async function deleteInterview(interviewId) {
  try {
    if (!interviewId) {
      throw new Error('인터뷰 ID가 필요합니다.');
    }

    const response = await fetch(`/api/interviews/${interviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '인터뷰 삭제 중 오류가 발생했습니다.');
    }

    return true;
  } catch (error) {
    console.error('API Error (deleteInterview):', error);
    throw error;
  }
}