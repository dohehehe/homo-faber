import styled from '@emotion/styled';
import theme from '@/styles/Theme';

export const Landing = styled.main`
  position: relative;
  z-index: 1;
  width: 100%;
  background: #fbfbfb;
  font-family: 'Pretendard', var(--font-inter), Helvetica, sans-serif;
  color: #111;
`;

export const Stack = styled.div`
  position: relative;
`;

export const NoticeCard = styled.aside`
  position: fixed;
  top: var(--header-height, 50px);
  left: 20px;
  z-index: 20;
  width: 320px;
  padding: 10px 15px 15px;
  background: rgba(227, 227, 227, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 5px;
  color: #000;

  ${theme.media.mobile} {
    left: 16px;
    width: calc(100% - 32px);
    max-width: 320px;
  }
`;

export const NoticePlus = styled.span`
  display: block;
  width: 11px;
  height: 11px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 400;
  color: #444;
  line-height: 11px;
`;

export const NoticeClose = styled.button`
  position: absolute;
  top: 8px;
  right: 10px;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  color: #444;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s ease;

  ${NoticeCard}:hover & {
    opacity: 1;
  }

  &:focus-visible {
    opacity: 1;
  }

  ${theme.media.mobile} {
    opacity: 1;
  }
`;

export const NoticeTitle = styled.h2`
  font-size: 11px;
  font-weight: 400;
  margin-bottom: 10px;
  letter-spacing: -0.01em;
  line-height: 1;
`;

export const NoticeBody = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.01em;
  color: #000;
  word-break: keep-all;
`;

export const Hero = styled('section', {
  shouldForwardProp: (prop) => prop !== '$layer',
})`
  position: sticky;
  top: 0;
  z-index: ${(props) => props.$layer || 1};
  isolation: isolate;
  overflow: hidden;
  height: 100dvh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding: calc(var(--header-height, 50px) + 30px) 24px 40px;
  text-align: center;
  background: #111;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.22);

  @media (prefers-reduced-motion: reduce) {
    position: relative;
  }
`;

export const HeroVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export const HeroImage = styled('div', {
  shouldForwardProp: (prop) => prop !== 'src',
})`
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.25);
  pointer-events: none;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

export const Headline = styled.h1`
  font-family: var(--font-inter), 'Helvetica Neue', 'Pretendard', sans-serif;
  font-size: 40px;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.3;
  color: #111;
  max-width: 831px;
  word-break: keep-all;
  background: linear-gradient(180deg, #fff 9.46%, rgba(255, 255, 255, 0) 143.92%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  ${theme.media.mobile} {
    font-size: 24px;
  }
`;

export const Subhead = styled.p`
  display: none;
`;

export const VisionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  border: none;
  border-radius: 15px;
  background: rgba(239, 239, 239, 0.9);
  color: #000;
  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.01em;
  cursor: pointer;
`;

export const VisionLabel = styled.span`
  padding: 0 10px;
`;

export const VisionPlus = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 21px;
  height: 21px;
  border-radius: 20px;
  background: #d5d5d5;
  font-size: 14px;
  line-height: 1;
  color: #000;
`;

export const Banner = styled('section', {
  shouldForwardProp: (prop) => prop !== '$layer',
})`
  position: sticky;
  top: 0;
  z-index: ${(props) => props.$layer || 2};
  width: 100%;
  height: 100dvh;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.22);

  @media (prefers-reduced-motion: reduce) {
    position: relative;
  }
`;

export const BannerImage = styled('div', {
  shouldForwardProp: (prop) => prop !== 'src' && prop !== 'yellow' && prop !== 'grayscale',
})`
  position: absolute;
  inset: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  ${(props) => props.yellow && `
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: #ffea00;
      mix-blend-mode: multiply;
      pointer-events: none;
    }
  `}
  ${(props) => props.grayscale && `
    filter: grayscale(1) contrast(1.15);
  `}
`;

export const BannerVideo = styled('video', {
  shouldForwardProp: (prop) => prop !== 'grayscale',
})`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${(props) => props.grayscale && `
    filter: grayscale(1) contrast(1.15);
  `}
`;

export const BannerTint = styled.div`
  position: absolute;
  inset: 0;
  background: #ffea00;
  mix-blend-mode: multiply;
  pointer-events: none;
`;

export const GlassCard = styled.div`
  position: relative;
  z-index: 1;
  width: 300px;
  height: 300px;
  padding: 40px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 50px;
  background: rgba(123, 123, 123, 0.4);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  color: #fff;
  text-align: center;
`;

export const GlassTitle = styled.h2`
  font-family: var(--font-inter), 'Helvetica Neue', sans-serif;
  font-size: 50px;
  font-weight: 100;
  letter-spacing: -0.03em;
  line-height: 1;
  opacity: 0.8;
`;

export const GlassBody = styled.p`
  margin-top: 15px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.01em;
  word-break: keep-all;
`;

export const GlassButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  border: none;
  border-radius: 15px;
  background: rgba(160, 160, 160, 0.3);
  backdrop-filter: blur(15px);
  color: #fff;
  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
`;

export const GlassButtonLabel = styled.span`
  padding: 0 10px;
`;

export const GlassButtonPlus = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 21px;
  height: 21px;
  border-radius: 20px;
  background: rgba(160, 160, 160, 0.3);
  font-size: 14px;
  line-height: 1;
`;

export const Footer = styled.footer`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: flex-start;
  gap: 5px;
  width: 100%;
  padding: 20px 10px 30px;
  background: #f4f4f4;
  color: #000;

  ${theme.media.mobile} {
    flex-direction: column;
    gap: 24px;
  }
`;

export const FooterBrand = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0 5px;
`;

export const FooterLogo = styled.p`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

export const FooterCopy = styled.p`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.01em;
`;

export const FooterLinks = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 5px;

  ${theme.media.mobile} {
    justify-content: flex-start;
    width: 100%;
  }
`;

export const FooterCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 154px;
  font-size: 12px;
  line-height: 1.26;
`;

export const FooterLink = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
