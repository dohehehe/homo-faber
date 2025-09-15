/**
 * API 라우트를 통한 타임라인 관련 함수들
 * 서버사이드에서 실행되어 보안이 강화됨
 */

/**
 * 모든 타임라인 목록을 가져옵니다.
 * year, month, date 순으로 정렬됩니다.
 * @returns {Promise<Array>} 타임라인 목록
 */
export async function getTimelines() {
  try {
    const response = await fetch('/api/timeline', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '타임라인 목록을 불러오는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('API Error (getTimelines):', error);
    throw error;
  }
}

/**
 * 특정 타임라인을 가져옵니다.
 * @param {string} timelineId - 타임라인 ID
 * @returns {Promise<Object>} 타임라인 데이터
 */
export async function getTimelineById(timelineId) {
  try {
    const response = await fetch(`/api/timeline/${timelineId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `타임라인 (ID: ${timelineId})를 불러오는 중 오류가 발생했습니다.`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (getTimelineById):', error);
    throw error;
  }
}

/**
 * 새로운 타임라인을 생성합니다.
 * @param {Object} timelineData - 타임라인 데이터
 * @param {string} timelineData.year - 연도
 * @param {string} timelineData.month - 월
 * @param {string} timelineData.day - 일
 * @param {string} timelineData.title - 제목
 * @param {string} timelineData.info - 정보
 * @returns {Promise<Object>} 생성된 타임라인 데이터
 */
export async function createTimeline(timelineData) {
  try {
    const response = await fetch('/api/timeline', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(timelineData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '타임라인 생성 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (createTimeline):', error);
    throw error;
  }
}

/**
 * 타임라인을 업데이트합니다.
 * @param {string} timelineId - 타임라인 ID
 * @param {Object} updateData - 업데이트할 데이터
 * @returns {Promise<Object>} 업데이트된 타임라인 데이터
 */
export async function updateTimeline(timelineId, updateData) {
  try {
    const response = await fetch(`/api/timeline/${timelineId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `타임라인 (ID: ${timelineId}) 업데이트 중 오류가 발생했습니다.`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (updateTimeline):', error);
    throw error;
  }
}

/**
 * 타임라인을 삭제합니다.
 * @param {string} timelineId - 타임라인 ID
 * @returns {Promise<boolean>} 삭제 성공 여부
 */
export async function deleteTimeline(timelineId) {
  try {
    const response = await fetch(`/api/timeline/${timelineId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `타임라인 (ID: ${timelineId}) 삭제 중 오류가 발생했습니다.`);
    }

    return true;
  } catch (error) {
    console.error('API Error (deleteTimeline):', error);
    throw error;
  }
}
