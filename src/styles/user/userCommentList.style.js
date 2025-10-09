import styled from '@emotion/styled';
import theme from '@/styles/Theme';

export const CommentTableHeaderCell = styled.th`
  padding: 14px 15px 13px 15px;
  text-align: left;
  font-size: 1.2rem;
  font-weight: 800;
  transform: scaleX(0.8);
  transform-origin: left;
  -webkit-transform: scaleX(0.8) translateZ(0);
  transform: scaleX(0.8) translateZ(0);

  ${theme.media.mobile} {
    padding: 11px 14px 10px 16px;
    font-size: 1.1rem;
  }
`;

export const CommentTableBody = styled.tbody`
  overflow-y: auto;
  letter-spacing: 0.1rem;
  -webkit-overflow-scrolling: touch;
`;

export const CommentTableRow = styled.tr`
  padding-left: 1px;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #f8f9fa;
    cursor: pointer;
  }
`;

export const CommentTableCell = styled.td`
  padding: 9px 0px 6px 0px;
  vertical-align: middle;
  font-size: 1.1rem;

  ${theme.media.mobile} {
    padding: 9px 0px 6px 0px;
  }
`;

export const CommentTitleCell = styled(CommentTableCell)`
  display: flex;
  align-items: center;
  padding-left: 10px;
  letter-spacing: 0.18rem;
  width: 160px;
  overflow-x: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
      display: none;
  }

  ${theme.media.mobile} {
    width: 120px;
    overflow-x: auto;
    padding-left: 13px;
  }
`;

export const CommentStoreName = styled.div`
  font-weight: 700;
  margin-right: 12px;

  ${theme.media.mobile} {
    margin-right: 10px;
  }
`;

export const CommentLine = styled.div`
  border-bottom: 1.6px dotted; 
  flex: 1;
`;

export const CommentContentCell = styled(CommentTableCell)`
  width: 600px;
  display: block;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 10px;

  ${theme.media.mobile} {
    width: calc(100dvw - 125px);
    padding-left: 10px;
    overflow-x: scroll;
    text-overflow: unset;
    white-space: unset;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const CommentText = styled.div`
  font-size: 1rem;
  line-height: 1.4;
  color: #333;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${theme.media.mobile} {
    font-size: 1.1rem;
  }
`;

export const CommentDateCell = styled(CommentTableCell)`
  padding-left: 15px;
  font-family: var(--font-abeezee);
  letter-spacing: 0.05rem;
  font-size: 1.14rem;
  padding-right: 7px;
  width: 140px;

  ${theme.media.mobile} {
    width: 27px;
    margin-left: -22px;
    padding: unset;
  }
`;

export const CommentStatus = styled.span`
  color: #28A745;
  font-weight: 600;
  font-size: 0.9rem;
`;

export const NoComments = styled.div`
  width: 100%;
  text-align: center;
  color: #666;
  font-size: 14px;
  padding: 20px;
`;
