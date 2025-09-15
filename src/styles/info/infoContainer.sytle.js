import styled from '@emotion/styled';
import theme from '@/styles/Theme';
import { motion } from 'motion/react';

export const InfoWrapper = styled(motion.main, {
  shouldForwardProp: (prop) => prop !== 'gradientCss' && prop !== 'pathname',
})`
  width: 100%;
  height: 100%;
  padding-left: 70px;
  padding-right: 70px;
  padding-top: 57px;
  z-index: 3;
  background:rgb(255, 255, 255);
  background: ${(props) => props.gradientCss};
  background-size: 200% 200%;
  background-position: -100% -100%;
  cursor: ${(props) => (props.pathname && (props.pathname === '/' || props.pathname.startsWith('/info/'))) ? 'pointer' : 'default'};
  display: flex;
  flex-direction: column;
  border-left: solid 3px #DADADA;
  box-shadow: -8px 4px 10px 0 rgba(0,0,0,0.25);
  font-family: var(--font-gothic);
  pointer-events: auto;
  position: relative;
  color: #333;
  overflow-y: scroll;

  ${theme.media.mobile} { 
    padding: 50px 10px 20px 10px;
    overflow-x: hidden;
  }
`;


export const InfoPageName = styled.div`
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.3rem;
  position: fixed;
  transform: rotate(90deg);
  transform-origin: top left;
  top: 17px;
  right: calc(80dvw - 62px);

  ${theme.media.mobile} { 
    transform: rotate(0deg);
    transform-origin: top left;
    bottom: calc(87dvh - 32px);
    left:10px;
    top: unset;
    right: unset;
    font-size: 1rem;
  }
`
export const Infoh1 = styled.h1`
  font-size: 3.3rem;
  font-weight: 800;
  margin-bottom: 10px;
  line-height: 1.4;
  word-break: keep-all;

  ${theme.media.mobile} {
    font-size: 2.2rem;
  }
`


export const Infoh3 = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 10px;
  line-height: 1.8;
  font-style: italic;
  width: 100%;
  max-width: 450px;
  margin-left: auto;
  margin-right: 20px;
  color: #888;
  text-indent: -170px;
  margin-bottom: 200px;
  word-break: keep-all;

  ${theme.media.tablet} {
    text-indent: 0px;
    font-size: 1rem;
    width: 80%;
    margin-right: 5px;
    margin-bottom: 200px;
    text-align: right;
  }
`

export const Infoh2 = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  line-height: 1.6;

  ${theme.media.mobile} {
    font-size: 1.3rem;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 50px;
    font-weight: 800;
  }
`

export const InfoArticle = styled.article`
  max-width: 700px;
  margin-left: 100px;
  margin-top: 20px;
  margin-bottom: 260px;
  word-break: keep-all;
  margin-left: auto;

  ${theme.media.mobile} {
    margin-left: 0;
    margin-top: 0px;
    margin-bottom: 200px;
  }
`

export const InfoSubTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 30px;
  margin-top: 160px;
  margin-left: 100px;

  &:first-of-type {
    margin-top: 0px;
  }

  & + p {
    text-indent: 100px;

    ${theme.media.mobile} {
      text-indent: 80px;
    }
  }

  ${theme.media.mobile} {
    font-size: 1.15rem;
    margin-left: 0;
    font-weight: 700;
    // text-align: center;
    // padding-right: 15px;
  }
`

export const InfoPara = styled.p`
  font-size: 1.23rem;
  font-weight: 400;
  line-height: 1.88;
  letter-spacing: 0.01rem;
  margin-bottom:40px;
  color: black;
  word-break: keep-all;

  ${theme.media.mobile} {
    font-size: 1.15rem;
    margin-left: 0;
    line-height: 1.85;
  }
`
export const InfoParaLink = styled.div`
  font-size: 1rem;
  font-weight: 700;
  margin-top: 120px;
  margin-bottom: 20px;
  text-align: right;
  color: black;
  line-height: 1.7;
  span {
    text-decoration: underline wavy 1px;
    text-underline-offset: 5px;
    cursor: pointer;
    font-weight: 900;
  }

  ${theme.media.mobile} {
    width: 80%;
    font-size: 1rem;
    margin-left: auto;
    margin-top: 80px;
    margin-bottom: 10px;
  }
`

/*-------------------------------- Timeline --------------------------------*/
export const InfoTimelineTable = styled.table`
  width: 100%;
  // max-width: 800px;
  border-collapse: collapse;
  border: none;
  margin-bottom: 250px;
`

export const InfoTimelineTableHead = styled.thead`
  display: none;
`
export const InfoTimelineTableBody = styled.tbody`
  width: calc(100% - 23dvw);  

  ${theme.media.mobile} {
    width: 100%;
  }
`

export const InfoTimelineTableTr = styled.tr`
  border-top: ${(props) => props.isFirstOfYear ? '1.2px solid #000' : 'none'};
  display: flex;
  position: relative;
  width: calc(100% - 23dvw);  

  &:hover {
    background-color: var(--yellow);

    span {
    font-weight: 600;
    }

    &::after {
      display: ${(props) => props.isImg ? 'block' : 'none'};
      pointer-events: none;
      content: '';
      position: absolute;
      top: 0;
      right: -24vw;
      width: 24vw;
      height: 100%;
      background-color: var(--yellow);
    }

    .timeline-img {
      // width: 24dvw;
      height: auto;
      z-index: 2;

      img {
        padding-left: 3dvw;
      }
    }
  }

  ${theme.media.mobile} {
    width: calc(100dvw - 30px);
  }
`

export const InfoTimelineTableTd = styled.td`
  padding: 12px;
  vertical-align: top;
  line-height: 1.5;
  font-size: 1.1rem;
  border-top: ${(props) => props.isFirstOfYear ? 'none' : '1px dotted rgb(167, 167, 167)'};

  ${theme.media.mobile} {
    padding: 10px;
  }
`

export const InfoTimelineTableTdYear = styled(InfoTimelineTableTd)`
  min-width: 80px;
  text-align: center;
  border-bottom: none;
  flex-shrink: 0;
  font-size: 1.15rem;
  font-weight: 800;
  font-family: var(--font-abeezee);
  background-color: rgb(248, 248, 248);
  padding-right: 2px;

  ${theme.media.mobile} {
    min-width: 55px;
  }
`

export const InfoTimelineTableTdMonth = styled(InfoTimelineTableTd)`
  width: 80px;
  flex-shrink: 0;
  text-align: right;
  font-weight: 500;
  font-family: var(--font-abeezee);
  font-size: 1.15rem;
  background-color: rgb(248, 248, 248);
  padding-right: 13px;
  padding-left: 5px;

  ${theme.media.mobile} {
    min-width: 65px;
    word-break: keep-all;
    width:60px;
    // text-align: center;
    padding-right: 7px;
  }
`

export const InfoTimelineTableTdTitle = styled(InfoTimelineTableTd)`
  flex-grow: 1;
  font-weight: 500;
  line-height: 1.6;
  word-break: keep-all;
  padding-left: 18px;

  ${theme.media.mobile} {
    padding-left: 10px;
    flex-grow: unset;
    flex-shrink: 1;
    flex-wrap: wrap;
  }
`

export const InfoTimelineInfo = styled.div`
  margin-top: 8px;
  margin-left: 10%;
  font-weight: 400;

  ${theme.media.mobile} {
    margin-left: 0;
  }
`

export const InfoTimelineTableTdImg = styled.td`
  width: 24dvw;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: -1px;
  right: -24dvw;
  transition: all .4s ;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: top;
    margin-top: 1px;
    border-top: 1px dotted rgb(167, 167, 167);
    padding-left: 7dvw;
  }

  &:hover {
    // right: -100px;
    width: 25dvw;
    height: auto;
    z-index: 2;

    img {
      padding-left: 0dvw;
    }
  }

  ${theme.media.mobile} {
    width: 30dvw;
    display: none;
    position: relative;
  }
`

/*-------------------------------- Credits --------------------------------*/
export const InfoCreditsTable = styled.table`
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 250px;

  ${theme.media.mobile} {
    margin-bottom: 100px;
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