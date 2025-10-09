import { useState, useEffect, useCallback } from 'react';
import { getCommentsByUser } from '@/utils/api/comments-api';
import { useAuth } from '@/contexts/AuthContext';

// 전역 캐시 객체
let userCommentsCache = null;
let userCommentsCacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5분

/**
 * 현재 사용자의 댓글 목록을 가져오는 훅 (캐시 포함)
 * @returns {Object} comments, loading, error, refetch, invalidateCache
 */
export function useComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchComments = useCallback(async (forceRefresh = false) => {
    if (!user?.id) {
      setComments([]);
      setLoading(false);
      return;
    }

    // 캐시가 유효하고 강제 새로고침이 아닌 경우 캐시 사용
    if (!forceRefresh && userCommentsCache && userCommentsCacheTimestamp &&
      (Date.now() - userCommentsCacheTimestamp) < CACHE_DURATION) {
      setComments(userCommentsCache);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getCommentsByUser(user.id);
      const commentsArray = Array.isArray(data) ? data : [];

      // 캐시 업데이트
      userCommentsCache = commentsArray;
      userCommentsCacheTimestamp = Date.now();

      setComments(commentsArray);
    } catch (err) {
      console.error('Error fetching user comments:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // 캐시 무효화 함수
  const invalidateCache = useCallback(() => {
    userCommentsCache = null;
    userCommentsCacheTimestamp = null;
  }, []);

  return {
    comments,
    loading,
    error,
    refetch: () => fetchComments(true),
    invalidateCache
  };
}
