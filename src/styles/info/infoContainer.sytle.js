import styled from '@emotion/styled';
import theme from '@/styles/Theme';
import { motion } from 'motion/react';

export const InfoWrapper = styled(motion.main, {
  shouldForwardProp: (prop) => prop !== 'gradientCss' && prop !== 'pathname',
})`
  width: 100%;
  min-height: 100vh;
  padding: calc(var(--header-height, 50px) + 30px) 20px 80px;
  z-index: 3;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;
  overflow: visible;
  pointer-events: auto;
  position: relative;

  ${theme.media.mobile} { 
    padding: calc(var(--header-height, 50px) + 20px) 16px 60px;
    overflow-x: hidden;
    word-break: keep-all;
  }
`;


export const InfoPageName = styled.div`
  display: none;
`;

export const InfoPageContent = styled.div`
  width: 100%;
  max-width: 700px;
  height: auto;
  overflow: visible;
  padding: 0;

  ${theme.media.mobile} {
    padding-bottom: 40px;
  }
`;


export const Infoh1 = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 1.4;
  word-break: keep-all;
  letter-spacing: -0.01em;
  color: #000;

  ${theme.media.mobile} {
    font-size: 1.4rem;
    width: 100%;
  }
`;


export const Infoh3 = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 48px;
  line-height: 1.6;
  font-style: italic;
  width: 100%;
  color: #a0a0a0;
  word-break: keep-all;
  letter-spacing: -0.01em;

  ${theme.media.tablet} {
    font-size: 0.9rem;
    margin-bottom: 40px;
  }
`;

export const Infoh2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 30px;
  line-height: 1.6;
  letter-spacing: -0.01em;
  color: #000;

  ${theme.media.mobile} {
    font-size: 1rem;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 50px;
    font-weight: 700;
  }
`;

export const InfoArticle = styled.article`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 80px;
  word-break: keep-all;

  ${theme.media.mobile} {
    margin-top: 0px;
    margin-bottom: 60px;
  }
`

export const InfoSubTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 48px;
  letter-spacing: -0.01em;
  color: #000;

  &:first-of-type {
    margin-top: 0px;
  }

  ${theme.media.mobile} {
    font-size: 1rem;
    font-weight: 700;
  }
`

export const InfoPara = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.01em;
  margin-bottom:40px;
  color: #000;
  word-break: keep-all;

  ${theme.media.mobile} {
    font-size: 1rem;
    margin-left: 0;
    line-height: 1.6;
  }
`;
export const InfoParaLink = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  margin-top: 120px;
  margin-bottom: 20px;
  text-align: right;
  color: #a0a0a0;
  line-height: 1.6;
  letter-spacing: -0.01em;
  span {
    text-decoration: underline wavy 1px;
    text-underline-offset: 5px;
    cursor: pointer;
    font-weight: 400;
    color: #000;
  }

  ${theme.media.mobile} {
    font-size: 1rem;
    margin-left: auto;
    margin-top: 80px;
    margin-bottom: 10px;
    text-align: left;
    text-indent: -10px;
    padding-left: 10px;
  }
`

/*-------------------------------- Timeline --------------------------------*/
export const InfoTimelineTable = styled.table`
  width: 100%;
  // max-width: 800px;
  border-collapse: collapse;
  border: none;
  margin-bottom: 80px;
`

export const InfoTimelineTableHead = styled.thead`
  display: none;
`
export const InfoTimelineTableBody = styled.tbody`
  width: 100%;
`

export const InfoTimelineTableTr = styled.tr`
  border-top: ${(props) => props.isFirstOfYear ? '1.2px solid #000' : 'none'};
  display: flex;
  position: relative;
  width: 100%;

  &:hover {
    background-color: var(--yellow);

    .timeline-img {
      height: auto;
      z-index: 2;
    }
  }
`

export const InfoTimelineTableTd = styled.td`
  padding: 12px;
  vertical-align: top;
  line-height: 1.5;
  font-size: 1rem;
  border-top: ${(props) => props.isFirstOfYear ? 'none' : '1px dotted rgb(167, 167, 167)'};

  ${theme.media.tablet} {
    padding: 6px 10px 10px 10px;
  }
`

export const InfoTimelineTableTdYear = styled(InfoTimelineTableTd)`
  min-width: 80px;
  text-align: center;
  border-bottom: none;
  flex-shrink: 0;
  font-size: 1rem;
  font-weight: 800;
  font-family: var(--font-abeezee);
  background-color: rgb(248, 248, 248);
  padding-right: 2px;

  ${theme.media.tablet} {
    min-width: 55px;
    padding-top: 8px;
  }
`

export const InfoTimelineTableTdMonth = styled(InfoTimelineTableTd)`
  width: 90px;
  flex-shrink: 0;
  text-align: right;
  font-weight: 500;
  font-family: var(--font-abeezee);
  font-size: 1rem;
  background-color: rgb(248, 248, 248);
  padding-right: 13px;
  padding-left: 5px;

  ${theme.media.tablet} {
    min-width: 65px;
    word-break: keep-all;
    width:65px;
    line-height: 1.8;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    flex-shrink: 0;
  }
`
export const InfoTimelineMobile = styled.td`
  display: flex; 
  flex-direction: column;
  gap: 5px;
  flex-grow: 1;
  flex-wrap: wrap;
  width: 10px;
  margin-left: 2px;
  padding: 0;
  border: none;
`

export const InfoTimelineTableTdTitle = styled.div`
  flex-grow: 1;
  font-weight: 500;
  line-height: 1.6;
  word-break: keep-all;
  padding-left: 18px;
  padding: 12px;
  padding-left: 18px;
  vertical-align: top;
  line-height: 1.5;
  font-size: 1rem;
  border-top: ${(props) => props.isFirstOfYear ? 'none' : '1px dotted rgb(167, 167, 167)'};

  ${theme.media.tablet} {
    padding-left: 10px;
    flex-grow: unset;
    flex-shrink: 1;
    flex-wrap: wrap;
    padding-top: 10px;
    font-size: 1.05rem;
  }
`


export const InfoTimelineInfo = styled.div`
  margin-top: 8px;
  margin-left: 10%;
  font-weight: 400;
  word-break: keep-all;

  ${theme.media.tablet} {
    margin-left: 0;
    font-size: 1rem;
  }
`

export const InfoTimelineTableTdImg = styled.div`
  width: 100%;
  display: block;
  position: static;
  height: auto;
  padding-left: 7px;
  padding-right: 20px;
  margin-bottom: 15px;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    vertical-align: top;
    margin-left: 5px;
    padding-left: 0px;
    border-top: none;
  }
`


/*-------------------------------- Credits --------------------------------*/
export const InfoCreditsTable = styled.table`
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin: 0 auto;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 80px;

  ${theme.media.mobile} {
    margin-bottom: 40px;
  }
`

export const InfoCreditsTableTr = styled.tr`
`

export const InfoCreditsTableTh = styled.th`
  padding: 6px 10px;
  font-weight: 600;
  text-align: right;
  width: 50%;
  vertical-align: top;

  ${theme.media.mobile} {
    width: unset;
    min-width: 100px;
    flex-shrink: 0;
  }
`

export const InfoCreditsTableTd = styled.td`
  padding: 6px 10px;
  vertical-align: top;
  word-break: keep-all;
`