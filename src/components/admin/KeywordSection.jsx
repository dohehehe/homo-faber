'use client';

import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Button from '@/components/admin/Button';
import * as S from '@/styles/admin/AdminLayout.style';

const Section = styled.section`
  margin-bottom: 36px;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
`;

const Name = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
`;

const Count = styled.span`
  margin-left: 10px;
  color: #666;
  font-size: 0.85rem;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
`;

const RowMain = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 8px;
  margin-right: 12px;
`;

async function readError(response) {
  try {
    const body = await response.json();
    return body.error || '요청에 실패했습니다.';
  } catch {
    return '요청에 실패했습니다.';
  }
}

const KeywordSection = ({ kind }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/keywords/${kind}`);
      if (!response.ok) throw new Error(await readError(response));
      const result = await response.json();
      setItems(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [kind]);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreate = async () => {
    const name = newName.trim();
    if (!name || busy) return;
    setBusy(true);
    try {
      const response = await fetch(`/api/keywords/${kind}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error(await readError(response));
      setNewName('');
      setCreating(false);
      await load();
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleUpdate = async (id) => {
    const name = editingName.trim();
    if (!name || busy) return;
    setBusy(true);
    try {
      const response = await fetch(`/api/keywords/${kind}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error(await readError(response));
      setEditingId(null);
      setEditingName('');
      await load();
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (item) => {
    if (busy) return;
    const linked = item.storeCount > 0
      ? `${item.name}을 삭제하면 연결된 가게 ${item.storeCount}곳의 연결도 함께 삭제됩니다. 가게 정보는 그대로 둡니다. 계속할까요?`
      : `${item.name}을 삭제할까요?`;
    if (!confirm(linked)) return;

    setBusy(true);
    try {
      const response = await fetch(`/api/keywords/${kind}/${item.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(await readError(response));
      await load();
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Section>
      <Toolbar>
        <Button
          className="create"
          onClick={() => {
            setCreating(true);
            setEditingId(null);
            setNewName('');
          }}
        >
          추가
        </Button>
      </Toolbar>

      {loading && <S.LoadingMessage>불러오는 중...</S.LoadingMessage>}
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      {!loading && !error && items.length === 0 && !creating && (
        <S.EmptyMessage>등록된 키워드가 없습니다.</S.EmptyMessage>
      )}
      {!loading && !error && (items.length > 0 || creating) && (
        <S.AdminList>
          {creating && (
            <S.AdminCard>
              <RowMain>
                <EditInput
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') handleCreate();
                  }}
                  placeholder="이름을 입력하세요"
                  autoFocus
                />
              </RowMain>
              <S.AdminActions>
                <Button className="edit" onClick={handleCreate}>저장</Button>
                <Button onClick={() => { setCreating(false); setNewName(''); }}>취소</Button>
              </S.AdminActions>
            </S.AdminCard>
          )}
          {items.map((item) => (
            <S.AdminCard key={item.id}>
              {editingId === item.id ? (
                <RowMain>
                  <EditInput
                    value={editingName}
                    onChange={(event) => setEditingName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') handleUpdate(item.id);
                    }}
                  />
                </RowMain>
              ) : (
                <RowMain>
                  <Name>{item.name}</Name>
                  <Count>연결된 가게 {item.storeCount}</Count>
                </RowMain>
              )}
              <S.AdminActions>
                {editingId === item.id ? (
                  <>
                    <Button className="edit" onClick={() => handleUpdate(item.id)}>저장</Button>
                    <Button onClick={() => setEditingId(null)}>취소</Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="edit"
                      onClick={() => {
                        setCreating(false);
                        setNewName('');
                        setEditingId(item.id);
                        setEditingName(item.name);
                      }}
                    >
                      수정
                    </Button>
                    <Button className="delete" onClick={() => handleDelete(item)}>삭제</Button>
                  </>
                )}
              </S.AdminActions>
            </S.AdminCard>
          ))}
        </S.AdminList>
      )}
    </Section>
  );
};

export default KeywordSection;
