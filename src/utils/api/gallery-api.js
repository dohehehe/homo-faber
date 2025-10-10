/**
 * API 라우트를 통한 갤러리 관련 함수들
 * 서버사이드에서 실행되어 보안이 강화됨
 */

/**
 * 모든 갤러리 이미지를 가져옵니다.
 * @param {string} storeId - 특정 스토어 ID (선택사항)
 * @returns {Promise<Array>} 갤러리 이미지 목록
 */
export async function getGalleryImages(storeId = null) {
  try {
    const params = new URLSearchParams();
    if (storeId) {
      params.append('store_id', storeId);
    }

    const response = await fetch(`/api/gallery?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '갤러리 이미지를 불러오는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('API Error (getGalleryImages):', error);
    throw error;
  }
}

/**
 * Public 갤러리 이미지를 페이지네이션으로 가져옵니다.
 * @param {number} page - 페이지 번호 (0부터 시작)
 * @param {number} limit - 한 페이지당 이미지 수
 * @returns {Promise<Object>} 갤러리 이미지 목록과 페이지네이션 정보
 */
export async function getPublicGalleryImages(page = 0, limit = 8) {
  try {
    const params = new URLSearchParams();
    params.append('type', 'public');
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await fetch(`/api/gallery?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '갤러리 이미지를 불러오는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return {
      data: result.data || [],
      hasMore: result.hasMore || false,
      page: result.page || 0,
      limit: result.limit || limit
    };
  } catch (error) {
    console.error('API Error (getPublicGalleryImages):', error);
    throw error;
  }
}

/**
 * 특정 갤러리 이미지를 가져옵니다.
 * @param {string} imageId - 갤러리 이미지 ID
 * @returns {Promise<Object>} 갤러리 이미지 데이터
 */
export async function getGalleryImageById(imageId) {
  try {
    if (!imageId) {
      throw new Error('갤러리 이미지 ID가 필요합니다.');
    }

    const response = await fetch(`/api/gallery/${imageId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 404) {
        throw new Error('갤러리 이미지를 찾을 수 없습니다.');
      }
      throw new Error(errorData.error || '갤러리 이미지를 불러오는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (getGalleryImageById):', error);
    throw error;
  }
}

/**
 * 갤러리 이미지를 생성합니다.
 * @param {Object} imageData - 갤러리 이미지 데이터
 * @returns {Promise<Object>} 생성된 갤러리 이미지 데이터
 */
export async function createGalleryImage(imageData) {
  try {
    const response = await fetch('/api/gallery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imageData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '갤러리 이미지 생성 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (createGalleryImage):', error);
    throw error;
  }
}

/**
 * 갤러리 이미지를 업데이트합니다.
 * @param {string} imageId - 갤러리 이미지 ID
 * @param {Object} updateData - 업데이트할 데이터
 * @returns {Promise<Object>} 업데이트된 갤러리 이미지 데이터
 */
export async function updateGalleryImage(imageId, updateData) {
  try {
    if (!imageId) {
      throw new Error('갤러리 이미지 ID가 필요합니다.');
    }

    const response = await fetch(`/api/gallery/${imageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '갤러리 이미지 업데이트 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (updateGalleryImage):', error);
    throw error;
  }
}

/**
 * 갤러리 이미지를 삭제합니다.
 * @param {string} imageId - 갤러리 이미지 ID
 * @returns {Promise<boolean>} 삭제 성공 여부
 */
export async function deleteGalleryImage(imageId) {
  try {
    if (!imageId) {
      throw new Error('갤러리 이미지 ID가 필요합니다.');
    }

    const response = await fetch(`/api/gallery/${imageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '갤러리 이미지 삭제 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('API Error (deleteGalleryImage):', error);
    throw error;
  }
}
