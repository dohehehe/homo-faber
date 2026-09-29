import styled from '@emotion/styled';
import theme from '@/styles/Theme';
import { captionText } from '@/styles/typography';

export const ListLabelBar = styled.div`
  display: grid;
  grid-template-columns: 78px 160px 90px minmax(0, 1fr) 64px;
  gap: 10px;
  width: 100%;
  padding: 10px 20px;
  color: #a0a0a0;
  background-color: #ffffff;
  box-sizing: border-box;
  border-bottom: 0.5px solid #efefef;

  ${theme.media.mobile} {
    grid-template-columns: repeat(7, minmax(0, 1fr));
    padding: 8px 10px;
  }
`;

export const ListLabel = styled('span', {
  shouldForwardProp: (prop) => prop !== '$active',
})`
  min-width: 0;
  color: ${(props) => (props.$active ? '#000' : '#a0a0a0')};

  ${theme.media.mobile} {
    &:nth-of-type(1) {
      grid-column: 1;
    }

    &:nth-of-type(2) {
      grid-column: 2;
    }

    &:nth-of-type(3) {
      grid-column: 3;
    }

    &:nth-of-type(4) {
      grid-column: 4 / span 3;
    }

    &:nth-of-type(5) {
      grid-column: 7;
    }
  }
`;

export const TableWrapper = styled.article`
  width: 100%;
  overflow: visible;
  flex: none;
  position: relative;
  z-index: 0;
`;

export const StoreTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  display: block;
`;

export const TableHeader = styled.thead`
  display: none;
`;

export const TableHeaderCell = styled.th`
  padding: 8px 20px;
  text-align: left;
  font-weight: 400;
  color: #a0a0a0;
  white-space: nowrap;

  ${theme.media.mobile} {
    padding: 8px 0;
  }
`;

export const SortButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
`;

export const SortIcon = styled('img', {
  shouldForwardProp: (prop) => prop !== '$asc' && prop !== '$active',
})`
  width: 6.3px;
  height: 7px;
  display: block;
  transform: ${(props) => (props.$asc ? 'none' : 'rotate(180deg)')};
  opacity: ${(props) => (props.$active === false ? 0.35 : 1)};
`;

export const TableHeaderCellBookmark = styled.th`
  width: 28px;
  padding: 8px 0;

  ${theme.media.mobile} {
    display: none;
  }
`;

export const TableBody = styled.tbody`
  display: block;
`;

export const StatusRow = styled.tr`
  display: block;
  padding: 20px 10px;

  td {
    display: block;
    width: 100%;
  }
`;

export const TableRow = styled('tr', {
  shouldForwardProp: (prop) => prop !== 'isHovered',
})`
  display: grid;
  grid-template-columns: 78px 160px 90px minmax(0, 1fr) 64px;
  gap: 10px;
  padding: 10px 20px;
  align-items: start;
  position: relative;
  border-top: 0.5px solid #efefef;
  background-color: ${(props) => (props.isHovered ? '#f9f9f9' : 'transparent')};
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }

  ${theme.media.mobile} {
    grid-template-columns: repeat(7, minmax(0, 1fr));
    padding: 10px;
    min-height: 52px;
  }
`;

export const TableCell = styled.td`
  padding: 0;
  vertical-align: top;
  color: #000;
  min-width: 0;

  ${theme.media.mobile} {
    display: block;
    width: auto;
  }
`;

export const LabelCell = styled(TableCell)`
  ${captionText}

  ${theme.media.mobile} {
    grid-column: 1;
  }
`;

export const BookmarkCell = styled(TableCell)`
  position: absolute;
  left: 4px;
  top: 10px;
  width: auto;
  padding: 0;

  ${theme.media.mobile} {
    display: none;
  }
`;

export const BookmarkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const BookmarkIcon = styled.span`
  color: ${(props) => (props.isBookmarked ? '#111' : '#ccc')};
`;

export const TitleCell = styled(TableCell)`
  ${theme.media.mobile} {
    grid-column: 2;
  }
`;

export const Name = styled.div`
  font-weight: 400;
`;

export const IndustryCell = styled(TableCell)`
  ${theme.media.mobile} {
    grid-column: 3;
    min-width: 0;
  }
`;

export const Industry = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  color: #a0a0a0;
  ${captionText}
`;

export const Line = styled.div`
  display: none;
`;

export const KeywordCell = styled(TableCell)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${theme.media.mobile} {
    max-width: none;
    overflow: visible;
    text-overflow: unset;
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
    grid-column: 4 / span 3;
  }
`;

export const ContactCell = styled(TableCell)`
  color: #a0a0a0;
  ${captionText}

  ${theme.media.mobile} {
    width: auto;
    padding-right: 0;
    grid-column: 7;
    min-width: 0;
  }
`;
