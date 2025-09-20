'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as S from '@/styles/user/userContainer.style';
import { useAuth } from '@/contexts/AuthContext';

export default function DeleteAccountButton({ user }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { signOut } = useAuth();

  const handleDeleteAccount = async () => {
    if (!user) return;

    setIsDeleting(true);
    setError('');

    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '계정 삭제 중 오류가 발생했습니다.');
      }

      await signOut();

      router.push('/');
    } catch (err) {
      setError(err.message || '계정 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <>
      <S.ButtonWrapper>
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          }}
        >
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isDeleting}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            {isDeleting ? '탈퇴 처리 중...' : '탈퇴하기'}
          </button>
        </div>
      </S.ButtonWrapper>

      {/* 탈퇴 확인 모달 */}
      {showDeleteConfirm && (
        <S.ErrorPopupOverlay onClick={() => setShowDeleteConfirm(false)}>
          <S.ErrorPopupContainer onClick={(e) => e.stopPropagation()}>
            <div>정말로 계정을 탈퇴하시겠습니까?</div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
              확인을 누르면 모든 데이터가 삭제됩니다.
            </div>
            <div
              style={{
                display: 'flex',
                gap: '10px',
                marginTop: '20px',
                justifyContent: 'center',
              }}
            >
              <S.ErrorPopupCloseButton
                onClick={() => setShowDeleteConfirm(false)}
              >
                취소
              </S.ErrorPopupCloseButton>
              <S.ErrorPopupCloseButton
                onClick={handleDeleteAccount}
                style={{ backgroundColor: '#dc3545', color: 'white' }}
              >
                탈퇴하기
              </S.ErrorPopupCloseButton>
            </div>
          </S.ErrorPopupContainer>
        </S.ErrorPopupOverlay>
      )}

      {/* 에러 메시지 */}
      {error && (
        <S.ErrorPopupOverlay onClick={() => setError('')}>
          <S.ErrorPopupContainer onClick={(e) => e.stopPropagation()}>
            {error}
            <S.ErrorPopupCloseButton onClick={() => setError('')}>
              확인
            </S.ErrorPopupCloseButton>
          </S.ErrorPopupContainer>
        </S.ErrorPopupOverlay>
      )}
    </>
  );
}
