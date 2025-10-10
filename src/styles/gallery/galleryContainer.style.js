import styled from '@emotion/styled';
import theme from '@/styles/Theme';
import { motion } from 'motion/react';

export const GalleryWrapper = styled(motion.main)`
  width: 100%;
  height: 100%;
  padding-left: 60px;
  padding-top: 27px;
  z-index: 3;
  background: rgb(255, 255, 255);
  overflow: hidden;
  border-left: solid 3px #DADADA;
  box-shadow: -8px 4px 10px 0 rgba(0,0,0,0.25);
  font-family: var(--font-gothic);
  pointer-events: auto;

  & .masonry-grid {
  display: flex;
  margin-left: -30px;
  /* gutter size offset */
  width: auto;
}

  & .masonry-grid_column {
  padding-left: 30px;
  /* gutter size */
  background-clip: padding-box;
}

  & .masonry-grid_column>div {
  margin-bottom: 15px;
  }

  ${theme.media.mobile} { 
    padding: 0px 7px 0px 5px;
    border-left: none;
  }
`;

export const GalleryName = styled.h1`
  font-family: var(--font-gothic);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.3rem;
  position: absolute;
  transform: rotate(90deg);
  transform-origin: top left;
  top: 17px;
  left: 27px;

  ${theme.media.mobile} { 
    transform: rotate(0deg);
    transform-origin: top left;
    top: 13px;
    left:9px;
    font-size: 1rem;
    z-index: 3;
  }
`;

export const GalleryContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 60px 30px 20px 10px;
  overflow-y: scroll;
  z-index: 3;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${theme.media.mobile} { 
    padding: 50px 10px 10px 10px;
  }
`;

// react-masonry-css를 위한 글로벌 스타일
export const GalleryGrid = styled.div`
  /* react-masonry-css는 자동으로 클래스를 생성하므로 여기서는 기본 스타일만 설정 */
  width: 100%;
  margin: 0 auto;
`;

export const GalleryImage = styled.img`
  width: 100%;
  height: auto;
  position: relative;
  display: block;
  object-fit: contain;
  margin-bottom: 18px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px 0 rgba(0,0,0,0.25);

  ${theme.media.mobile} {
    padding-right: 0px;
  }

  &:hover {
    transform: scale(1.05);
    transition: all 0.2s ease; 
    opacity: 0.8;
  }
`;

