import { getSupporters } from '@/utils/api/supporter-api';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import theme from '@/styles/Theme';

const SupporterWrapper = styled.section`
  width: 100%;
  max-width: 900px;
  display: flex;
  gap: 17px 18px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 250px;

  ${theme.media.mobile} {
    margin-top: 0px;
    width: 95%;
    gap: 17px 15px;
  }
`;

const SupporterItem = styled.div`
  font-family: var(--font-gothic);
  font-size: 1.15rem;
  font-weight: 500;
  text-align: center;

  ${theme.media.mobile} {
    font-size: 1.1rem;
  }
`;

function Supporter() {
  const [supporters, setSupporters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupporters = async () => {
      try {
        setLoading(true);
        const data = await getSupporters();

        setSupporters(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch supporters:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSupporters();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류가 발생했습니다: {error}</div>;
  }

  if (supporters.length === 0) {
    return <div>지원자 데이터가 없습니다.</div>;
  }

  return (
    <>
      <SupporterWrapper>
        {supporters.map((supporter) => (
          <SupporterItem key={supporter.id}>
            <h1>{supporter.name}</h1>
          </SupporterItem>
        ))}

      </SupporterWrapper>
    </>
  );
}

export default Supporter;