import styled from '@emotion/styled';
import theme from '@/styles/Theme';


export const BookmarkTableHeaderCell = styled.th`
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

export const BookmarkTableBody = styled.tbody`
  overflow-y: auto;
  letter-spacing: 0.1rem;
  -webkit-overflow-scrolling: touch;
`;

export const BookmarkTableRow = styled.tr`
  padding-left: 1px;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: ${props => {
    const status = props.status;
    switch (status) {
      case '확인중':
      case 'pending':
        return '#FFD375';
      case '중개중':
      case 'in_progress':
        return '#87DE9B';
      case '답변완료':
      case 'completed':
        return '#7FBDFF';
      default:
        return 'white';
    }
  }};
    cursor: pointer;
  }
`;

export const BookmarkTableCell = styled.td`
  padding: 11px 0px 9px 0px;
  vertical-align: middle;
  font-size: 1.1rem;

  ${theme.media.mobile} {
    padding: 11px 0px 9px 0px;
  }
`;

export const BookmarkTitleCell = styled(BookmarkTableCell)`
  display: flex;
  align-items: center;
  padding-left: 10px;
  letter-spacing: 0.18rem;
  width: 201.8px;
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

export const BookmarkTitleCellFnq = styled(BookmarkTitleCell)`
  width: 110px;
  padding: 4px 0px 4px 10px;

  ${theme.media.mobile} {
    width: 95px;
  }
`;


export const BookmarkName = styled.div`
  font-weight: 700;
  margin-right: 12px;

  ${theme.media.mobile} {
    margin-right: 10px;
  }
`;

export const BookmarkStatus = styled(BookmarkName)`
  color: ${props => {
    const status = props.status;
    switch (status) {
      case '확인중':
      case 'pending':
        return '#F39D00';
      case '중개중':
      case 'in_progress':
        return '#28A745';
      case '답변완료':
      case 'completed':
        return '#007BFF';
    }
  }};
  font-weight: 900;
  margin-left: 3px;
`;

export const BookmarkIndustry = styled.div`
  margin-right: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

export const BookmarkLine = styled.div`
  border-bottom: 1.6px dotted; 
  flex: 1;
`;

export const BookmarkKeywordCell = styled(BookmarkTableCell)`
  width: 570px;
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

export const BookmarkContactCell = styled(BookmarkTableCell)`
  padding-left: 15px;
  font-family: var(--font-abeezee);
  letter-spacing: 0.05rem;
  font-size: 1.14rem;
  text-align: right;
  padding-right: 7px;
  width: 140px;

  ${theme.media.mobile} {
    width: 27px;
    margin-left: -22px;
    padding: unset;
  }
`;

export const NoBookmarks = styled.div`
  width: 100%;
  text-align: center;
  color: #666;
  font-size: 14px;
  padding: 20px;
`;