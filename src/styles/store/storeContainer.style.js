import styled from '@emotion/styled';
import theme from '@/styles/Theme';

export const StoreWrapper = styled('main', {
  shouldForwardProp: (prop) => prop !== 'hasDetail' && prop !== 'pathname',
})`
  width: 100%;
  min-height: 100vh;
  padding: var(--header-height, 50px) 0 0;
  position: relative;
  z-index: 2;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding-right: ${(props) =>
    props.hasDetail ? 'max(500px, calc(100% * 4 / 12))' : '0'};
  transition: padding-right 0.35s ease;

  overflow: visible;

  ${theme.media.mobile} {
    display: block;
    padding-right: 0;
  }
`;

export const StorePageName = styled.h1`
  display: none;
`;

export const StoreChrome = styled.div`
  position: sticky;
  top: var(--header-height, 50px);
  z-index: 20;
  background-color: #ffffff;
  isolation: isolate;
`;

export const StoreToolbar = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 20px 8px;
  flex-wrap: wrap;
  background-color: #ffffff;

  ${theme.media.mobile} {
    flex-direction: column;
    gap: 10px;
    padding: 7px 8px;
    flex-wrap: nowrap;
  }
`;

export const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  ${theme.media.mobile} {
    width: 100%;
    flex-wrap: nowrap;
  }
`;

export const SearchField = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 300px;
  height: 30px;
  padding: 0 8px;
  border-radius: 5px;
  background: rgba(227, 227, 227, 0.3);
  color: #000;

  ${theme.media.mobile} {
    flex: 1;
    width: auto;
    min-width: 0;
    gap: 20px;
  }
`;

export const SearchLabel = styled.span`
  flex-shrink: 0;
  color: #000;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  outline: none;
  color: #000;

  &::placeholder {
    color: #c7c7c7;
  }
`;

export const FieldSelect = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 139px;
  height: 30px;
  padding: 0 22px 0 8px;
  border-radius: 5px;
  background: rgba(227, 227, 227, 0.3);
  color: #000;
  position: relative;

  ${theme.media.mobile} {
    flex-shrink: 0;
    width: 139px;
    gap: 8px;
  }
`;

export const SelectChevron = styled.img`
  position: absolute;
  right: 8px;
  top: 50%;
  width: 14px;
  height: 7px;
  transform: translateY(-50%) rotate(180deg);
  pointer-events: none;
`;

export const IndustrySelect = styled.select`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  outline: none;
  color: #a0a0a0;
  cursor: pointer;
  appearance: none;
`;

export const TagPanel = styled.div`
  flex: 1;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 4px;

  ${theme.media.mobile} {
    min-width: 0;
    width: 100%;
    padding-top: 0;
  }
`;

export const TagRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;

export const TagItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px 10px;
  align-items: center;
  flex: 1;
  min-width: 0;
`;

export const TagClearButton = styled.button`
  margin-top: 2px;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background: transparent;
  color: #a0a0a0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 11px;
    height: 11px;
    display: block;
  }

  &:hover {
    color: #000;
  }
`;

export const TagLegend = styled.span`
  color: #000;
  margin-right: 4px;
`;

export const Tag = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})`
  border: none;
  background: none;
  padding: 0;
  color: ${(props) => (props.active ? '#000' : '#a0a0a0')};
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

export const CapacityNote = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})`
  border: none;
  background: none;
  padding: 0;
  text-align: left;
  color: ${(props) => (props.active ? '#000' : '#c7c7c7')};
  cursor: pointer;
`;

export const StoreFilterWrapper = styled.div`
  display: none;
`;

export const StoreFilterBtn = styled.button`
  display: none;
`;

export const ResetFilterBtn = styled.button`
  display: none;
`;
