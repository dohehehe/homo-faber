/**
 * 서버사이드 이미지 업로드 API 함수들
 * 보안이 강화된 이미지 업로드 처리
 */

/**
 * 단일 이미지 업로드
 * @param {File} file - 업로드할 이미지 파일
 * @param {string} bucket - Supabase 버킷 이름 (기본값: 'gallery')
 * @param {number} maxSizeInMB - 최대 파일 크기 (MB 단위, 기본값: 1)
 * @returns {Promise<Object>} 업로드 결과
 */
export async function uploadImage(file, bucket = 'gallery', maxSizeInMB = 1) {
  try {
    console.log('uploadImage API 호출:', { file, bucket, maxSizeInMB });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', bucket);
    formData.append('maxSizeInMB', maxSizeInMB.toString());

    console.log('FormData 생성 완료, API 요청 시작');

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    console.log('API 응답 상태:', response.status, response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API 에러 응답:', errorData);
      return {
        success: false,
        error: errorData.error || '이미지 업로드 중 오류가 발생했습니다.'
      };
    }

    const result = await response.json();
    console.log('API 성공 응답:', result);
    return result;
  } catch (error) {
    console.error('Image upload error:', error);
    return {
      success: false,
      error: error.message || '이미지 업로드 중 오류가 발생했습니다.'
    };
  }
}

/**
 * 여러 이미지 업로드
 * @param {File[]} files - 업로드할 이미지 파일 배열
 * @param {string} bucket - Supabase 버킷 이름
 * @param {number} maxSizeInMB - 최대 파일 크기 (MB 단위)
 * @returns {Promise<Object[]>} 업로드 결과 배열
 */
export async function uploadMultipleImages(files, bucket = 'gallery', maxSizeInMB = 1) {
  try {
    const uploadPromises = files.map(file => uploadImage(file, bucket, maxSizeInMB));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Multiple images upload error:', error);
    return {
      success: false,
      error: error.message || '여러 이미지 업로드 중 오류가 발생했습니다.'
    };
  }
}

/**
 * 이미지와 함께 스토어 생성
 * @param {Object} storeData - 스토어 데이터
 * @param {File} cardImageFile - 카드 이미지 파일
 * @param {File} thumbnailImageFile - 썸네일 이미지 파일
 * @param {File[]} galleryFiles - 갤러리 이미지 파일 배열
 * @returns {Promise<Object>} 생성된 스토어 데이터
 */
export async function createStoreWithImages(storeData, cardImageFile = null, thumbnailImageFile = null, galleryFiles = []) {
  try {
    const formData = new FormData();

    // 스토어 데이터 추가
    formData.append('storeData', JSON.stringify(storeData));

    // 이미지 파일들 추가
    if (cardImageFile) {
      formData.append('cardImage', cardImageFile);
    }
    if (thumbnailImageFile) {
      formData.append('thumbnailImage', thumbnailImageFile);
    }
    galleryFiles.forEach(file => {
      formData.append('galleryImages', file);
    });

    const response = await fetch('/api/stores/with-images', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '스토어 생성 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Create store with images error:', error);
    throw error;
  }
}

/**
 * 이미지와 함께 스토어 업데이트
 * @param {string} storeId - 스토어 ID
 * @param {Object} storeData - 스토어 데이터
 * @param {File} cardImageFile - 카드 이미지 파일
 * @param {File} thumbnailImageFile - 썸네일 이미지 파일
 * @param {File[]} galleryFiles - 갤러리 이미지 파일 배열
 * @returns {Promise<Object>} 업데이트된 스토어 데이터
 */
export async function updateStoreWithImages(storeId, storeData, cardImageFile = null, thumbnailImageFile = null, galleryFiles = []) {
  try {
    const formData = new FormData();

    // 스토어 데이터 추가
    formData.append('storeData', JSON.stringify(storeData));
    formData.append('storeId', storeId);

    // 이미지 파일들 추가
    if (cardImageFile) {
      formData.append('cardImage', cardImageFile);
    }
    if (thumbnailImageFile) {
      formData.append('thumbnailImage', thumbnailImageFile);
    }
    galleryFiles.forEach(file => {
      formData.append('galleryImages', file);
    });

    const response = await fetch(`/api/stores/${storeId}/with-images`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '스토어 업데이트 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Update store with images error:', error);
    throw error;
  }
}
