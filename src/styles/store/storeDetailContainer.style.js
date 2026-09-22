'use client';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import theme from '@/styles/Theme';

export const DetailWrapper = styled(motion.main, {
  shouldForwardProp: (prop) => prop !== 'isMobile'
})`
  width: calc(100% * 4 / 12);
  min-width: 500px;
  height: calc(100dvh - 50px);
  padding: 15px;
  background-color: #fbfbfb;
  position: fixed;
  right: 0;
  top: 50px;
  z-index: 40;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-left: 0.5px solid #efefef;

  ${theme.media.mobile} {
    width: 100%;
    min-width: 0;
    top: 50px;
    height: calc(100dvh - 50px);
    left: 0;
    right: 0;
    border-left: none;
    padding: 15px;
    gap: 15px;
  }
`;

export const DetailPageName = styled.h1`
  display: none;
`;

export const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  ${theme.media.mobile} {
    margin-bottom: 0;
  }
`;

export const CloseButton = styled.button`
  width: 21px;
  height: 21px;
  padding: 5px;
  border: none;
  border-radius: 20px;
  background: #d5d5d5;
  color: #000;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;

  img,
  svg {
    width: 11px;
    height: 11px;
    display: block;
  }
`;

export const InterviewButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  margin: 12px 0 16px;
  padding: 3px;
  background: rgba(227, 227, 227, 0.3);
  color: #a0a0a0;
  border: none;
  border-radius: 15px;
  font-weight: 400;
  cursor: pointer;

  ${theme.media.mobile} {
    margin: 0 0 10px;
  }
`;

export const InterviewLabel = styled.span`
  padding: 0 10px;
`;

export const InterviewArrow = styled.span`
  width: 21px;
  height: 21px;
  padding: 5px;
  border-radius: 20px;
  background: rgba(227, 227, 227, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 11px;
    height: 11px;
    display: block;
    transform: rotate(90deg);
  }
`;

export const StoreDetailCard = styled.article`
  color: #000;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${theme.media.mobile} {
    gap: 15px;
  }
`;

export const StoreDetailSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

export const StoreImgSection = styled.section`
  width: 100%;
  display: flex;
  gap: 8px;
  overflow-x: auto;

  ${theme.media.mobile} {
    gap: 10px;
    overflow-x: auto;
    flex-wrap: nowrap;
  }
`;

export const StoreName = styled.h2`
  font-weight: 400;
  color: #000;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
`;

export const StoreNameTxt = styled.span``;

export const BookmarkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const BookmarkIcon = styled.span`
  color: ${(props) => (props.isBookmarked ? '#111' : '#ccc')};
`;

export const StoreAdress = styled.h3`
  font-weight: 400;
  margin: 4px 0 0;
  color: #555;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 10px 0;

  ${theme.media.mobile} {
    border-top: 0.5px solid rgba(227, 227, 227, 0.3);
  }
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

export const SectionLabel = styled.p`
  width: 100%;
  font-weight: 400;
  color: #a0a0a0;
  padding: 10px 0;
  margin: 0;
  border-bottom: 0.5px solid rgba(227, 227, 227, 0.9);

  ${theme.media.mobile} {
    padding: 0;
    border-bottom: none;
  }
`;

export const StoreTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  width: 100%;
  margin: 0;

  ${theme.media.mobile} {
    gap: 10px 3px;
  }
`;

export const StoreTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 5px;
  border-radius: 3px;
  background: rgba(227, 227, 227, 0.3);
  font-weight: 400;
`;

export const StoreCapacity = styled.div`
  color: #c9a227;
  margin: 4px 0 8px;
`;

export const StoreIndustry = styled.div`
  color: #555;
`;

export const StoreContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  margin: 8px 0 12px;
`;

export const StoreContact = styled.div`
  display: flex;
  gap: 6px;
`;

export const StoreContactTxt = styled.div`
  color: #555;
  white-space: nowrap;
`;

export const StoreContactContent = styled.div`
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const LockedContactGroup = styled.button`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font: inherit;
  color: #a0a0a0;

  ${StoreContactTxt},
  ${StoreContactContent} {
    color: inherit;
  }

  &:hover {
    color: #000;
  }
`;

export const SignupHint = styled.p`
  margin: 8px 0 0;
  color: #a0a0a0;

  a {
    color: #000;
    text-decoration: underline;
  }
`;

export const StoreDescription = styled.div`
  color: #333;
`;

export const StoreCardImg = styled.img`
  width: 48%;
  min-width: 140px;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;

  ${theme.media.mobile} {
    flex: 0 0 270px;
    width: 270px;
    min-width: 270px;
    max-width: 270px;
    height: 270px;
    border-radius: 10px;
  }
`;

export const StoreImgList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const StoreImg = styled.img`
  width: 48%;
  min-width: 140px;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;

  ${theme.media.mobile} {
    flex: 0 0 270px;
    width: 270px;
    min-width: 270px;
    max-width: 270px;
    height: 270px;
    border-radius: 10px;
  }
`;
