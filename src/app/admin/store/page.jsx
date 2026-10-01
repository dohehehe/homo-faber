"use client";

import { useMemo, useState } from 'react';
import { useAllStores } from '@/hooks/useStores';
import { deleteStore } from '@/utils/api/stores-api';
import AdminPage from '@/components/admin/AdminPage';
import styled from '@emotion/styled';

const StoreInfo = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StoreName = styled.h3`
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
`;

const StoreDescription = styled.p`
  color: #444;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const StoreAddress = styled.p`
  color: #888;
  font-size: 0.8rem;
  padding-left: 10px;
`;

const ImageStatus = styled.div`
  display: flex;
  gap: 15px;
  margin-left: auto;
  align-items: center;
  margin-right: 20px;
`;

const ImageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
`;

const StatusIndicator = styled.span`
  font-weight: bold;
  font-size: 14px;
  color: ${props => props.hasImage ? '#28a745' : '#dc3545'};
`;

const SearchField = styled.input`
  width: 100%;
  max-width: 360px;
  margin-bottom: 16px;
  padding: 10px 12px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #333;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const StoreAdminPage = () => {
  const { stores, isLoading, error } = useAllStores({ fresh: true });
  const [nameQuery, setNameQuery] = useState('');
  const keyword = nameQuery.trim().toLowerCase();
  const filteredStores = useMemo(() => {
    if (!keyword) return stores;
    return stores.filter((store) =>
      (store.name || '').toLowerCase().includes(keyword),
    );
  }, [stores, keyword]);

  const renderStoreItem = (store) => (
    <StoreInfo>
      <StoreName>{store.name || '알 수 없음'}</StoreName>
      <StoreDescription>
        {store.person || '(이름 정보 없음)'}
      </StoreDescription>
      <StoreAddress>
        {store.address || '(주소 정보 없음)'}
      </StoreAddress>
      <ImageStatus>
        <ImageInfo>
          <span>명함:</span>
          <StatusIndicator hasImage={!!store.card_img}>
            {store.card_img ? 'O' : 'X'}
          </StatusIndicator>
        </ImageInfo>
        <ImageInfo>
          <span>갤러리:</span>
          <StatusIndicator hasImage={store.store_gallery && store.store_gallery.length > 0}>
            {store.store_gallery && store.store_gallery.length > 0 ? 'O' : 'X'}
          </StatusIndicator>
          {store.store_gallery && store.store_gallery.length > 0 && (
            <span style={{ color: '#666', fontSize: '0.7rem' }}>
              ({store.store_gallery.length}개)
            </span>
          )}
        </ImageInfo>
      </ImageStatus>
    </StoreInfo>
  );

  return (
    <AdminPage
      title="가게 관리"
      createPath="/admin/store"
      isLoading={isLoading}
      error={error}
      items={filteredStores}
      renderItem={renderStoreItem}
      onDelete={deleteStore}
      emptyMessage={keyword ? '일치하는 가게가 없습니다.' : '등록된 가게가 없습니다.'}
      toolbar={(
        <SearchField
          type="search"
          value={nameQuery}
          onChange={(event) => setNameQuery(event.target.value)}
          placeholder="가게 이름으로 검색"
          aria-label="가게 이름 검색"
        />
      )}
    />
  );
};

export default StoreAdminPage;
