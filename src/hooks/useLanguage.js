'use client';

import { useLanguage as useLanguageContext } from '@/contexts/LanguageContext';

/**
 * 언어 전환을 위한 커스텀 훅
 * @returns {Object} 언어 관련 상태와 함수들
 */
export const useLanguage = () => {
  const context = useLanguageContext();

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};

export default useLanguage;
