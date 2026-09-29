'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import Button from '@/components/admin/Button';
import KeywordSection from '@/components/admin/KeywordSection';
import * as S from '@/styles/admin/AdminLayout.style';

const TabRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const TABS = [
  { id: 'material', label: '공정' },
  { id: 'category', label: '제품개발/부품제조' },
];

export default function KeywordAdminPage() {
  const [tab, setTab] = useState('material');

  return (
    <S.AdminPageWrapper>
      <S.AdminHeader>
        <h1>키워드 수정</h1>
      </S.AdminHeader>
      <TabRow>
        {TABS.map((item) => (
          <Button
            key={item.id}
            active={tab === item.id}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </TabRow>
      <KeywordSection key={tab} kind={tab} />
    </S.AdminPageWrapper>
  );
}
