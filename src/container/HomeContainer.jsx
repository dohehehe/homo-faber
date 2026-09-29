'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import { getLandingSections } from '@/utils/api/landing-api';
import { DEFAULT_LANDING_SECTIONS, isLandingVideo } from '@/config/landingSections';
import * as S from '@/styles/home/homeLanding.style';

const NOTICE_KEY = 'hf-notice-dismissed';

function HomeContainer() {
  const router = useRouter();
  const { t } = useLanguage();
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [sections, setSections] = useState(DEFAULT_LANDING_SECTIONS);
  const videoRef = useRef(null);

  const hero = sections.find((item) => item.id === 'hero') || DEFAULT_LANDING_SECTIONS[0];
  const find = sections.find((item) => item.id === 'find') || DEFAULT_LANDING_SECTIONS[1];
  const ask = sections.find((item) => item.id === 'ask') || DEFAULT_LANDING_SECTIONS[2];

  useEffect(() => {
    try {
      setNoticeOpen(sessionStorage.getItem(NOTICE_KEY) !== '1');
    } catch {
      setNoticeOpen(true);
    }
  }, []);

  useEffect(() => {
    getLandingSections()
      .then(setSections)
      .catch(() => { });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    video.muted = true;

    const tryPlay = () => {
      if (reduceMotion.matches) {
        video.pause();
        return;
      }
      video.play().catch(() => { });
    };

    tryPlay();
    video.addEventListener('canplay', tryPlay);
    reduceMotion.addEventListener('change', tryPlay);
    return () => {
      video.removeEventListener('canplay', tryPlay);
      reduceMotion.removeEventListener('change', tryPlay);
    };
  }, [hero.media_url]);

  const dismissNotice = () => {
    setNoticeOpen(false);
    try {
      sessionStorage.setItem(NOTICE_KEY, '1');
    } catch {
      /* ignore */
    }
  };

  const go = (href) => {
    if (!href) return;
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noreferrer');
      return;
    }
    router.push(href);
  };

  const renderBannerMedia = (section, { yellow, grayscale } = {}) => {
    if (isLandingVideo(section)) {
      return (
        <>
          <S.BannerVideo src={section.media_url} autoPlay muted loop playsInline grayscale={grayscale} />
          {yellow && <S.BannerTint />}
        </>
      );
    }
    return <S.BannerImage src={section.media_url} yellow={yellow} grayscale={grayscale} />;
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

      <S.Stack>
        <S.Hero $layer={1}>
          {isLandingVideo(hero) ? (
            <S.HeroVideo
              key={hero.media_url}
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              src={hero.media_url}
            />
          ) : (
            <S.HeroImage src={hero.media_url} />
          )}
          <S.HeroOverlay />
          <S.HeroContent>
            <S.Headline>
              {hero.title || t('pages.home.headline')}
              {hero.body && (
                <>
                  <br />
                  {hero.body}
                </>
              )}
            </S.Headline>
            <S.VisionButton type="button" onClick={() => go(hero.button_href || '/info')}>
              <S.VisionLabel>{hero.button_label || t('pages.home.vision')}</S.VisionLabel>
              <S.VisionPlus>+</S.VisionPlus>
            </S.VisionButton>
          </S.HeroContent>
        </S.Hero>

        <S.Banner $layer={2}>
          {renderBannerMedia(find, { yellow: true })}
          <S.GlassCard>
            <div>
              <S.GlassTitle>{find.title || t('pages.home.findTitle')}</S.GlassTitle>
              <S.GlassBody>{find.body || t('pages.home.findBody')}</S.GlassBody>
            </div>
            <S.GlassButton type="button" onClick={() => go(find.button_href || '/store')}>
              <S.GlassButtonLabel>{find.button_label || t('pages.home.findCta')}</S.GlassButtonLabel>
              <S.GlassButtonPlus>+</S.GlassButtonPlus>
            </S.GlassButton>
          </S.GlassCard>
        </S.Banner>

        <S.Banner $layer={3}>
          {renderBannerMedia(ask, { grayscale: true })}
          <S.GlassCard>
            <div>
              <S.GlassTitle>{ask.title || t('pages.home.askTitle')}</S.GlassTitle>
              <S.GlassBody>{ask.body || t('pages.home.askBody')}</S.GlassBody>
            </div>
            <S.GlassButton type="button" onClick={() => go(ask.button_href || '/fnq')}>
              <S.GlassButtonLabel>{ask.button_label || t('pages.home.askCta')}</S.GlassButtonLabel>
              <S.GlassButtonPlus>+</S.GlassButtonPlus>
            </S.GlassButton>
          </S.GlassCard>
        </S.Banner>
      </S.Stack>

      <S.Footer>
        <S.FooterBrand>
          <S.FooterLogo>
            HomoFaber 호모파베르
            <br />
            청계천을지로 기술유통중개소
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
            <S.FooterLink as="a" href="https://www.instagram.com/cheongyecheon/" target="_blank" rel="noreferrer">
              Instagram
            </S.FooterLink>
            <S.FooterLink as="a" href="https://blog.naver.com/homo-faber
" target="_blank" rel="noreferrer">
              Naver Blog
            </S.FooterLink>
          </S.FooterCol>
        </S.FooterLinks>
      </S.Footer>
    </S.Landing>
  );
}

export default HomeContainer;
