"use client";

import { useFnqs } from '@/hooks/useFnq';
import { deleteFnq } from '@/utils/api/fnq-api';
import AdminPage from '@/components/admin/AdminPage';
import styled from '@emotion/styled';

const FnqInfo = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  align-items: center;
`;

const FnqTitle = styled.h3`
  color: #333;
  font-size: 1.1rem;
  font-weight: 500;
`;

const FnqDate = styled.p`
  color: #444;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const FnqStatus = styled.p`
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
        return '#777';
    }
  }};
  font-size: 1.1rem;
  font-weight: 800;
`;

const FnqAdminPage = () => {
  const { fnqs, loading: isLoading, error } = useFnqs();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const renderFnqItem = (fnq) => (
    <FnqInfo>
      <FnqStatus status={fnq.fnq_status?.name || fnq.fnq_status?.status || '확인중'}>
        {fnq.fnq_status?.name || '(상태 정보 없음)'}
      </FnqStatus>
      <FnqTitle>{fnq.title || '알 수 없음'}</FnqTitle>
      <FnqDate>
        {formatDate(fnq.created_at) || '(날짜 정보 없음)'}
      </FnqDate>
    </FnqInfo>
  );

  return (
    <AdminPage
      title="문의 관리"
      createPath="/admin/fnq"
      isLoading={isLoading}
      error={error}
      items={fnqs}
      renderItem={renderFnqItem}
      onDelete={deleteFnq}
    />
  );
};

export default FnqAdminPage;
