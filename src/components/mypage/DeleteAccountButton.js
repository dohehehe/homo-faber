'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Popup from '@/components/common/Popup';
import * as S from '@/styles/user/deleteAccountButton.style';

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
        <S.Button
          type="button"
          onClick={() => setShowDeleteConfirm(true)}
          disabled={isDeleting}
        >
          {isDeleting ? '탈퇴 처리 중...' : '탈퇴하기'}
        </S.Button>
      </S.ButtonWrapper>

      {/* 탈퇴 확인 모달 */}
      <Popup
        isVisible={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        type="warning"
        title="정말로 계정을 삭제하시겠습니까?"
        subtitle="회원 탈퇴를 누르면 모든 데이터가 삭제됩니다."
        buttons={[
          { text: '취소', onClick: () => setShowDeleteConfirm(false), variant: 'primary' },
          { text: '회원 탈퇴', onClick: handleDeleteAccount, variant: 'danger' }
        ]}
      />

      {/* 에러 메시지 */}
      <Popup
        isVisible={!!error}
        message={error}
        onClose={() => setError('')}
        type="error"
      />
    </>
  );
}
