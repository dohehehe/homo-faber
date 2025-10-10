/**
 * API 라우트를 통한 comments 관련 함수들
 * 서버사이드에서 실행되어 보안이 강화됨
 */

/**
 * 모든 댓글을 가져옵니다.
 * @param {string} storeId - 스토어 ID (선택사항)
 * @param {string} userId - 사용자 ID (선택사항)
 * @returns {Promise<Array>} 댓글 목록
 */
export async function getComments(storeId = null, userId = null) {
  try {
    const params = new URLSearchParams();
    if (storeId) {
      params.append('store_id', storeId);
    }
    if (userId) {
      params.append('user_id', userId);
    }

    const response = await fetch(`/api/comments?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '댓글 목록을 불러오는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('API Error (getComments):', error);
    throw error;
  }
}

/**
 * 특정 댓글을 가져옵니다.
 * @param {string} commentId - 댓글 ID
 * @returns {Promise<Object>} 댓글 데이터
 */
export async function getCommentById(commentId) {
  try {
    if (!commentId) {
      throw new Error('댓글 ID가 필요합니다.');
    }

    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 404) {
        throw new Error('댓글을 찾을 수 없습니다.');
      }
      throw new Error(errorData.error || '댓글 정보를 불러오는 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (getCommentById):', error);
    throw error;
  }
}

/**
 * 댓글을 생성합니다.
 * @param {Object} commentData - 댓글 데이터
 * @param {string} commentData.store_id - 스토어 ID
 * @param {Object} commentData.contents - 댓글 내용 (JSON)
 * @returns {Promise<Object>} 생성된 댓글 데이터
 */
export async function createComment(commentData) {
  try {
    const { store_id, contents } = commentData;

    if (!store_id || !contents) {
      throw new Error('스토어 ID와 댓글 내용은 필수입니다.');
    }

    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '댓글 생성 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (createComment):', error);
    throw error;
  }
}

/**
 * 댓글을 업데이트합니다.
 * @param {string} commentId - 댓글 ID
 * @param {Object} updateData - 업데이트할 데이터
 * @param {Object} updateData.contents - 댓글 내용 (JSON)
 * @returns {Promise<Object>} 업데이트된 댓글 데이터
 */
export async function updateComment(commentId, updateData) {
  try {
    if (!commentId) {
      throw new Error('댓글 ID가 필요합니다.');
    }

    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 403) {
        throw new Error('댓글을 수정할 권한이 없습니다.');
      }
      if (response.status === 404) {
        throw new Error('댓글을 찾을 수 없습니다.');
      }
      throw new Error(errorData.error || '댓글 업데이트 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('API Error (updateComment):', error);
    throw error;
  }
}

/**
 * 댓글을 삭제합니다.
 * @param {string} commentId - 댓글 ID
 * @returns {Promise<boolean>} 삭제 성공 여부
 */
export async function deleteComment(commentId) {
  try {
    if (!commentId) {
      throw new Error('댓글 ID가 필요합니다.');
    }

    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 403) {
        throw new Error('댓글을 삭제할 권한이 없습니다.');
      }
      if (response.status === 404) {
        throw new Error('댓글을 찾을 수 없습니다.');
      }
      throw new Error(errorData.error || '댓글 삭제 중 오류가 발생했습니다.');
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('API Error (deleteComment):', error);
    throw error;
  }
}

/**
 * 특정 스토어의 댓글을 가져옵니다.
 * @param {string} storeId - 스토어 ID
 * @returns {Promise<Array>} 해당 스토어의 댓글 목록
 */
export async function getCommentsByStore(storeId) {
  try {
    if (!storeId) {
      throw new Error('스토어 ID가 필요합니다.');
    }

    return await getComments(storeId);
  } catch (error) {
    console.error('API Error (getCommentsByStore):', error);
    throw error;
  }
}

/**
 * 특정 사용자의 댓글을 가져옵니다.
 * @param {string} userId - 사용자 ID
 * @returns {Promise<Array>} 해당 사용자의 댓글 목록
 */
export async function getCommentsByUser(userId) {
  try {
    if (!userId) {
      throw new Error('사용자 ID가 필요합니다.');
    }

    return await getComments(null, userId);
  } catch (error) {
    console.error('API Error (getCommentsByUser):', error);
    throw error;
  }
}
