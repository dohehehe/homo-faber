'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '@/data/translations';

const LanguageContext = createContext({});

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ko'); // 기본값: 한국어
  const [isLoading, setIsLoading] = useState(true);

  // localStorage에서 언어 설정 불러오기
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'ko' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
    setIsLoading(false);
  }, []);

  // 언어 변경 함수
  const changeLanguage = (newLanguage) => {
    if (newLanguage === 'ko' || newLanguage === 'en') {
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
    }
  };

  // 언어 토글 함수
  const toggleLanguage = () => {
    const newLanguage = language === 'ko' ? 'en' : 'ko';
    changeLanguage(newLanguage);
  };

  // 번역 함수 - t('nav.home') 형태로 사용
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // 현재 언어에서 찾을 수 없으면 한국어로 폴백
        value = translations.ko;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // 번역을 찾을 수 없으면 키 자체를 반환
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // 현재 언어가 한국어인지 확인
  const isKorean = language === 'ko';
  const isEnglish = language === 'en';

  const value = {
    language,
    changeLanguage,
    toggleLanguage,
    isKorean,
    isEnglish,
    isLoading,
    t, // 번역 함수
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
