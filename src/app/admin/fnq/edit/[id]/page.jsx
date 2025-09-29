"use client";

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useFnq } from '@/hooks/useFnq';
import { useFnqStatuses } from '@/hooks/useFnq';
import { updateFnqStatus } from '@/utils/api/fnq-api';
import * as S from '@/styles/fnq/fnqDeatilContainer.style';
import FnqStatus from '@/components/fnq/FnqStatus';
import * as S2 from '@/styles/admin/adminForm.style';
import EditorFnqRenderer from '@/components/fnq/EditorFnqRenderer';
import Button from '@/components/admin/Button';
import styled from '@emotion/styled';

const StatusSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  min-width: 120px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const StatusUpdateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export default function AdminFnqEditPage() {
  const params = useParams();
  const fnqId = params.id;
  const router = useRouter();
  const { fnq, isLoading, error, loading, refetch } = useFnq(fnqId);
  const { statuses, loading: statusLoading } = useFnqStatuses();
  const [selectedStatusId, setSelectedStatusId] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // fnq 데이터가 로드되면 현재 상태를 선택된 상태로 설정
  useEffect(() => {
    if (fnq?.status_id) {
      setSelectedStatusId(fnq.status_id);
    }
  }, [fnq]);

  const handleStatusChange = (e) => {
    setSelectedStatusId(e.target.value);
  };

  const handleSave = async () => {
    if (!selectedStatusId) {
      alert('상태를 선택해주세요.');
      return;
    }

    if (selectedStatusId === fnq?.status_id) {
      alert('현재 상태와 동일합니다.');
      return;
    }

    setIsSaving(true);
    try {
      await updateFnqStatus(fnqId, selectedStatusId);
      alert('상태가 성공적으로 업데이트되었습니다.');
      refetch(); // 데이터 새로고침
      router.push('/admin/fnq');
    } catch (error) {
      console.error('상태 업데이트 오류:', error);
      alert('상태 업데이트 중 오류가 발생했습니다: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const formatNumber = (value) => {
    if (!value) return '-';
    const numericValue = typeof value === 'number' ? value : parseInt(value);
    if (isNaN(numericValue)) return '-';
    return numericValue.toLocaleString('ko-KR') + ' 원';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleBack = () => {
    router.push('/admin/fnq');
  };

  return (
    <S2.AdminFormWrapper>
      <S2.Header>
        <h1>문의 상태 수정</h1>
        <S2.Actions>
          <Button onClick={handleBack}>목록으로</Button>
          <Button className="edit" onClick={handleSave} disabled={isSaving}>
            {isSaving ? '저장 중...' : '저장'}
          </Button>
        </S2.Actions>
      </S2.Header>

      {fnqId &&
        <div style={{ padding: '0 10px' }}>
          <S.Header style={{ marginTop: '30px' }}>
            <S.HeaderTitle>
              <S.Title>{fnq?.title}</S.Title>
              <S.CreatedAt>{fnq?.created_at && formatDate(fnq?.created_at)}</S.CreatedAt>
              <S.StatusWrapper>
                <StatusUpdateWrapper>
                  <label style={{ fontWeight: 'bold', fontSize: '14px' }}>상태 변경:</label>
                  <StatusSelect
                    value={selectedStatusId}
                    onChange={handleStatusChange}
                    disabled={statusLoading || isSaving}
                  >
                    <option value="">상태를 선택하세요</option>
                    {statuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </StatusSelect>
                </StatusUpdateWrapper>
              </S.StatusWrapper>
              <S.InfoWrapper>
                <S.InfoTitle>수량</S.InfoTitle>
                <S.InfoValue>{fnq?.count ? fnq?.count : '-'}</S.InfoValue>
                <S.InfoTitle>예산</S.InfoTitle>
                <S.InfoValue>{formatNumber(fnq?.budget)}</S.InfoValue>
                <S.InfoTitle>희망 납기일</S.InfoTitle>
                <S.InfoValue>{fnq?.due_date ? formatDate(fnq?.due_date) : '-'}</S.InfoValue>
              </S.InfoWrapper>
            </S.HeaderTitle>
          </S.Header>

          {fnq?.img && fnq?.img.length > 0 && (
            <S.FileWrapper>
              <S.FileList>
                {fnq.img.map((file, idx) => {
                  let fileData;

                  try {
                    // JSON 문자열인 경우 파싱
                    if (typeof file === 'string' && file.startsWith('{')) {
                      fileData = JSON.parse(file);
                    } else if (typeof file === 'object') {
                      fileData = file;
                    } else {
                      fileData = { url: file, name: `첨부 파일 ${idx + 1}` };
                    }
                  } catch (error) {
                    console.error('파일 데이터 파싱 오류:', error);
                    fileData = { url: file, name: `첨부 파일 ${idx + 1}` };
                  }

                  return (
                    <S.File
                      key={`file-${fnqId}-${idx}-${fileData.name || idx}`}
                      href={fileData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📎 {fileData.name}
                    </S.File>
                  );
                })}
              </S.FileList>
            </S.FileWrapper>
          )}

          <EditorFnqRenderer item={fnq?.detail} />
        </div>
      }
    </S2.AdminFormWrapper>
  );
}

