/**
 * API 라우트를 통한 단어 관련 함수들
 * 서버사이드에서 실행되어 보안이 강화됨
 */

/**
 * 모든 단어를 가져옵니다.
 * @returns {Promise<Array>} 단어 목록
 */
export async function getWords() {
  try {
    const response = await fetch('/api/words', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '단어 목록을 불러오는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('API Error (getWords):', error);
    throw error;
  }
}

/**
 * 이름으로 단어를 검색합니다.
 * @param {string} name - 검색할 단어명
 * @returns {Promise<Array>} 검색된 단어 목록
 */
export async function getWordsByName(name) {
  try {
    const params = new URLSearchParams();
    if (name && name.trim() !== '') {
      params.append('name', name.trim());
    }

    const response = await fetch(`/api/words?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '단어 검색 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('API Error (getWordsByName):', error);
    throw error;
  }
}

/**
 * 특정 단어를 가져옵니다.
 * @param {string} wordId - 단어 ID
 * @returns {Promise<Object>} 단어 데이터
 */
export async function getWordById(wordId) {
  try {
    if (!wordId) {
      throw new Error('단어 ID가 필요합니다.');
    }

    const response = await fetch(`/api/words/${wordId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 404) {
        throw new Error('단어를 찾을 수 없습니다.');
      }
      throw new Error(errorData.error || '단어를 불러오는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (getWordById):', error);
    throw error;
  }
}

/**
 * 단어를 생성합니다.
 * @param {Object} wordData - 단어 데이터
 * @returns {Promise<Object>} 생성된 단어 데이터
 */
export async function createWord(wordData) {
  try {
    const response = await fetch('/api/words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '단어 생성 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (createWord):', error);
    throw error;
  }
}

/**
 * 단어를 업데이트합니다.
 * @param {string} wordId - 단어 ID
 * @param {Object} updateData - 업데이트할 데이터
 * @returns {Promise<Object>} 업데이트된 단어 데이터
 */
export async function updateWord(wordId, updateData) {
  try {
    if (!wordId) {
      throw new Error('단어 ID가 필요합니다.');
    }

    const response = await fetch(`/api/words/${wordId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '단어 업데이트 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (updateWord):', error);
    throw error;
  }
}

/**
 * 단어를 삭제합니다.
 * @param {string} wordId - 단어 ID
 * @returns {Promise<boolean>} 삭제 성공 여부
 */
export async function deleteWord(wordId) {
  try {
    if (!wordId) {
      throw new Error('단어 ID가 필요합니다.');
    }

    const response = await fetch(`/api/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '단어 삭제 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('API Error (deleteWord):', error);
    throw error;
  }
}
