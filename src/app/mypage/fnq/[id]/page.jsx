'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFnq, useFnqActions } from '@/hooks/useFnq';
import FnqDetail from '@/components/fnq/FnqDetail';
import FnqEditForm from '@/components/fnq/FnqEditForm';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

export default function FnqDetailPage() {
  const params = useParams();
  const router = useRouter();
  const fnqId = params.id;

  const { fnq, loading, error, refetch } = useFnq(fnqId);
  const { deleteFnq, loading: actionLoading } = useFnqActions();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    refetch();
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 FNQ를 삭제하시겠습니까?')) {
      try {
        await deleteFnq(fnqId);
        router.push('/mypage/fnq');
      } catch (error) {
        console.error('삭제 중 오류:', error);
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} onRetry={refetch} />;
  }

  if (!fnq) {
    return <Error message="FNQ를 찾을 수 없습니다." onRetry={handleBack} />;
  }

  return (
    <div className="fnq-detail-page">
      {isEditing ? (
        <FnqEditForm
          fnq={fnq}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <FnqDetail
          fnq={fnq}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onBack={handleBack}
          loading={actionLoading}
        />
      )}
    </div>
  );
}