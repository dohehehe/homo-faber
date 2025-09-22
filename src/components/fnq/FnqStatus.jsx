'use client';

import * as S from '@/styles/fnq/fnqStatus.style';

function FnqStatus({ currentStatus, allStatuses = [] }) {
  // 상태 순서 정의 (진행 순서대로)
  const statusOrder = ['pending', 'in_progress', 'completed'];

  // 현재 상태의 인덱스 찾기
  const currentStatusIndex = statusOrder.findIndex(status =>
    currentStatus?.status === status || currentStatus?.name === status
  );

  // 상태별 정보 매핑
  const getStatusInfo = (status) => {
    const statusMap = {
      'pending': { name: '확인중', color: '#FF9800', description: '문의사항을 검토 중입니다' },
      'in_progress': { name: '중개중', color: '#2196F3', description: '적합한 전문가를 찾고 있습니다' },
      'completed': { name: '답변완료', color: '#4CAF50', description: '전문가의 답변을 받으셨습니다' }
    };

    return statusMap[status] || { name: '알 수 없음', color: '#9E9E9E', description: '상태를 확인할 수 없습니다' };
  };

  return (
    <S.StatusContainer>
      <S.ProgressLine>
        {statusOrder.slice(0, -1).map((_, index) => {
          const isCompleted = index < currentStatusIndex;
          return (
            <S.LineSegment
              key={index}
              isCompleted={isCompleted}
            />
          );
        })}
      </S.ProgressLine>

      <S.ProgressBar>
        {statusOrder.map((status, index) => {
          const statusInfo = getStatusInfo(status);
          const isCompleted = index <= currentStatusIndex;
          const isCurrent = index === currentStatusIndex;

          return (
            <S.StatusStep key={status} isCompleted={isCompleted} isCurrent={isCurrent}>
              <S.StatusCircle
                color={statusInfo.color}
                isCompleted={isCompleted}
                isCurrent={isCurrent}
              >
              </S.StatusCircle>

              <S.StatusLabel isCurrent={isCurrent}>
                {statusInfo.name}
              </S.StatusLabel>

              {/* <S.StatusDescription isCurrent={isCurrent}>
                {statusInfo.description}
              </S.StatusDescription> */}
            </S.StatusStep>
          );
        })}
      </S.ProgressBar>


    </S.StatusContainer>
  );
}

export default FnqStatus;