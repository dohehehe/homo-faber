'use client';

import { useFnqs } from '@/hooks/useFnq';
import { useAuth } from '@/contexts/AuthContext';
import useWindowSize from '@/hooks/useWindowSize';
import Loader from '@/components/common/Loader';
import * as S2 from '@/styles/user/mypageContainer.style';
import * as S from '@/styles/user/userFnqList.style';
import Link from 'next/link';

function UserFnqList() {
  const { user } = useAuth();
  const { isMobile, isReady } = useWindowSize();
  const { fnqs, loading: fnqsLoading } = useFnqs('', user?.id);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleFnqClick = (fnqId) => {
    // fnq 상세 페이지로 이동 (필요시 구현)
    console.log('fnq clicked:', fnqId);
  };

  return (
    <S2.TableSection>
      <S2.TableWrapper>
        <S2.Table>
          <S2.TableHeader>
            <tr style={{ display: 'flex' }}>
              <S.FnqTableHeaderCell style={{ width: isReady && isMobile ? '87px' : '108px' }}>진행 상태</S.FnqTableHeaderCell>
              <S.FnqTableHeaderCell style={{ width: isReady && isMobile ? 'unset' : '475px' }}>프로젝트 이름</S.FnqTableHeaderCell>
              <S.FnqTableHeaderCell style={{ marginLeft: isReady && isMobile ? 'auto' : 'unset', marginRight: isReady && isMobile ? '38px' : 'usnet' }}>등록일</S.FnqTableHeaderCell>
            </tr>
          </S2.TableHeader>

          <S.FnqTableBody>
            {fnqsLoading ? (
              <tr>
                <td colSpan={isReady && isMobile ? 2 : 3}>
                  <Loader baseColor="rgb(255, 255, 255)" style={{ marginTop: '5px' }} />
                </td>
              </tr>
            ) : fnqs.length > 0 ? (
              fnqs.map((fnq) => (
                <S.FnqTableRow key={fnq.id} status={fnq.fnq_status?.name || fnq.fnq_status?.status || null} onClick={() => handleFnqClick(fnq.id)} >
                  <S.FnqTitleCell>
                    <S.FnqStatus status={fnq.fnq_status?.name || fnq.fnq_status?.status || '확인중'}>
                      {fnq.fnq_status?.name || fnq.fnq_status?.status || '확인중'}
                    </S.FnqStatus>
                    <S.FnqLine></S.FnqLine>
                  </S.FnqTitleCell>

                  <S.FnqKeywordCell>
                    {fnq?.detail}
                    <S.FnqLine />
                  </S.FnqKeywordCell>

                  <S.FnqContactCell>
                    {fnq.created_at ? formatDate(fnq.created_at) : <S.FnqLine style={{ marginLeft: '-14px', marginRight: '-4px' }}></S.FnqLine>}
                  </S.FnqContactCell>
                </S.FnqTableRow>
              ))
            ) : (
              <tr>
                <td colSpan={3}>
                  <S.NoFnqs>
                    아직 문의한 프로젝트가 없습니다<br />
                    <Link href="/fnq" style={{ paddingTop: '15px', display: 'block', fontWeight: '800' }}>
                      - 프로젝트 자문 구하기 -
                    </Link>
                  </S.NoFnqs>
                </td>
              </tr>
            )}
          </S.FnqTableBody>
        </S2.Table>
      </S2.TableWrapper>
    </S2.TableSection >
  );
}

export default UserFnqList;
