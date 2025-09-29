import styled from '@emotion/styled';
import theme from '@/styles/Theme';

export const FnqTableHeaderCell = styled.th`
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

export const FnqTableBody = styled.tbody`
  overflow-y: auto;
  letter-spacing: 0.1rem;
  -webkit-overflow-scrolling: touch;
`;

export const FnqTableRow = styled.tr`
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

  ${theme.media.mobile} {
    width: 100dvw;
  }
`;

export const FnqTableCell = styled.td`
  padding: 11px 0px 9px 0px;
  vertical-align: middle;
  font-size: 1.1rem;

  ${theme.media.mobile} {
    padding: 11px 0px 9px 0px;
  }
`;

export const FnqTitleCell = styled(FnqTableCell)`
  display: flex;
  align-items: center;
  padding-left: 10px;
  letter-spacing: 0.18rem;
  width: 110px;
  overflow-x: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
      display: none;
  }

  ${theme.media.mobile} {
    width: 90px;
    flex-shrink: 0;
    overflow-x: auto;
    padding-left: 11px;
    overflow-x: unset;
  }
`;

export const FnqName = styled.div`
  font-weight: 700;
  margin-right: 12px;

  ${theme.media.mobile} {
    margin-right: 5px;
    font-size: 1rem;
  }
`;

export const FnqStatus = styled(FnqName)`
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

export const FnqLine = styled.div`
  border-bottom: 1.6px dotted; 
  flex: 1;
`;

export const FnqKeywordCell = styled(FnqTableCell)`
  width: 470px;
  display: block;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 10px;

  ${theme.media.mobile} {
    width: usnet;
    flex-grow: 1;
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

export const FnqContactCell = styled(FnqTableCell)`
  padding-left: 15px;
  font-family: var(--font-abeezee);
  letter-spacing: 0.05rem;
  font-size: 1.14rem;
  text-align: right;
  padding-right: 7px;

  ${theme.media.mobile} {
    width: unset;
    margin-left: auto;
    padding: unset;
    padding-right: 5px;
    padding-left: 10px;
    font-size: 1.1rem;
    letter-spacing: 0.01rem;
  }
`;

export const NoFnqs = styled.div`
  width: 100%;
  text-align: center;
  color: #666;
  font-size: 14px;
  padding: 20px;
`;