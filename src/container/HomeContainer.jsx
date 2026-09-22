'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import * as S from '@/styles/home/homeLanding.style';

const NOTICE_KEY = 'hf-notice-dismissed';

function HomeContainer() {
  const router = useRouter();
  const { t } = useLanguage();
  const [noticeOpen, setNoticeOpen] = useState(false);

  useEffect(() => {
    try {
      setNoticeOpen(sessionStorage.getItem(NOTICE_KEY) !== '1');
    } catch {
      setNoticeOpen(true);
    }
  }, []);

  const dismissNotice = () => {
    setNoticeOpen(false);
    try {
      sessionStorage.setItem(NOTICE_KEY, '1');
    } catch {
      /* ignore */
    }
  };

  return (
    <S.Landing>
      {noticeOpen && (
        <S.NoticeCard>
          <S.NoticePlus aria-hidden="true">+</S.NoticePlus>
          <S.NoticeClose type="button" aria-label="닫기" onClick={dismissNotice}>
            ×
          </S.NoticeClose>
          <S.NoticeTitle>{t('pages.home.noticeTitle')}</S.NoticeTitle>
          <S.NoticeBody>{t('pages.home.noticeBody')}</S.NoticeBody>
        </S.NoticeCard>
      )}

      <S.Hero>
        <S.Headline>
          {t('pages.home.headline')}
          <br />
          {t('pages.home.subhead')}
        </S.Headline>
        <S.VisionButton type="button" onClick={() => router.push('/info')}>
          <S.VisionLabel>{t('pages.home.vision')}</S.VisionLabel>
          <S.VisionPlus>+</S.VisionPlus>
        </S.VisionButton>
      </S.Hero>

      <S.Banner>
        <S.BannerImage src="/img/landing-find.png" yellow />
        <S.GlassCard>
          <div>
            <S.GlassTitle>{t('pages.home.findTitle')}</S.GlassTitle>
            <S.GlassBody>{t('pages.home.findBody')}</S.GlassBody>
          </div>
          <S.GlassButton type="button" onClick={() => router.push('/store')}>
            <S.GlassButtonLabel>{t('pages.home.findCta')}</S.GlassButtonLabel>
            <S.GlassButtonPlus>+</S.GlassButtonPlus>
          </S.GlassButton>
        </S.GlassCard>
      </S.Banner>

      <S.Banner>
        <S.BannerImage src="/img/landing-ask.jpg" grayscale />
        <S.GlassCard>
          <div>
            <S.GlassTitle>{t('pages.home.askTitle')}</S.GlassTitle>
            <S.GlassBody>{t('pages.home.askBody')}</S.GlassBody>
          </div>
          <S.GlassButton type="button" onClick={() => router.push('/fnq')}>
            <S.GlassButtonLabel>{t('pages.home.askCta')}</S.GlassButtonLabel>
            <S.GlassButtonPlus>+</S.GlassButtonPlus>
          </S.GlassButton>
        </S.GlassCard>
      </S.Banner>

      <S.Footer>
        <S.FooterBrand>
          <S.FooterLogo>
            청계천을지로 기술유통중개소
            <br />
            Home Faber
          </S.FooterLogo>
          <S.FooterCopy>{t('pages.home.footerCopy')}</S.FooterCopy>
        </S.FooterBrand>
        <S.FooterLinks>
          <S.FooterCol>
            <S.FooterLink onClick={() => router.push('/info')}>Information</S.FooterLink>
            <S.FooterLink>Term of Use</S.FooterLink>
            <S.FooterLink>Privacy Policy</S.FooterLink>
          </S.FooterCol>
          <S.FooterCol>
            <S.FooterLink as="a" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              Instagram
            </S.FooterLink>
            <S.FooterLink as="a" href="https://blog.naver.com/" target="_blank" rel="noreferrer">
              Naver Blog
            </S.FooterLink>
          </S.FooterCol>
        </S.FooterLinks>
      </S.Footer>
    </S.Landing>
  );
}

export default HomeContainer;
