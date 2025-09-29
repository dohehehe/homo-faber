'use client';

import { useEffect } from 'react';
import * as S from '@/styles/user/userContainer.style';

const TermsPopup = ({ isOpen, onClose, type, content }) => {
  // ESC 키로 팝업 닫기
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <S.TermsPopupOverlay onClick={onClose}>
      <S.TermsPopupContainer onClick={(e) => e.stopPropagation()}>
        <S.TermsPopupHeader>
          <S.TermsPopupTitle>{content.title}</S.TermsPopupTitle>
          <S.TermsPopupCloseButton onClick={onClose}>✕</S.TermsPopupCloseButton>
        </S.TermsPopupHeader>
        <S.TermsPopupContent>
          {content.content.split('\n').map((line, index) => (
            <S.TermsPopupText key={index}>
              {line}
            </S.TermsPopupText>
          ))}
        </S.TermsPopupContent>
        <S.TermsPopupFooter>
          <S.TermsPopupConfirmButton onClick={onClose}>
            확인
          </S.TermsPopupConfirmButton>
        </S.TermsPopupFooter>
      </S.TermsPopupContainer>
    </S.TermsPopupOverlay>
  );
};

export default TermsPopup;
