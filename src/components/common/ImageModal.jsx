'use client';

import { useEffect } from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/Theme';
import { motion, AnimatePresence } from 'motion/react';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  position: relative;
  max-width: 90dvw;
  max-height: 90dvh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90dvh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: -30px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }

  ${theme.media.mobile} {
      top: unset;
      bottom: -50px;
      right: unset;
      width: 30px;
      height: 30px;
      font-size: 16px;
  }
`;

function ImageModal({ isOpen, imageUrl, imageName, onClose }) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // 배경 클릭으로 모달 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleOverlayClick}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ModalImage
              src={imageUrl}
              alt={imageName || '갤러리 이미지'}
              onClick={(e) => e.stopPropagation()}
            />
            <CloseButton onClick={onClose}>
              ×
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}

export default ImageModal;
