import { useEffect, useState } from 'react';
import { getTimelines } from '@/utils/api/timeline-api';
import * as S from '@/styles/info/infoContainer.sytle';
import Image from 'next/image';
import useWindowSize from '@/hooks/useWindowSize';

function Timeline() {
  const [timelines, setTimelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isMobile, isReady } = useWindowSize();


  useEffect(() => {
    const fetchTimelines = async () => {
      try {
        setLoading(true);
        const data = await getTimelines();

        setTimelines(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch timelines:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimelines();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류가 발생했습니다: {error}</div>;
  }

  if (timelines.length === 0) {
    return <div>타임라인 데이터가 없습니다.</div>;
  }

  return (
    <S.InfoTimelineTable>
      <S.InfoTimelineTableHead>
        <S.InfoTimelineTableTr >
          <th>연도</th>
          <th >날짜</th>
          <th >제목</th>
          <th >이미지</th>
        </S.InfoTimelineTableTr>
      </S.InfoTimelineTableHead>

      <S.InfoTimelineTableBody>
        {timelines.map((timeline, index) => {
          const isFirstOfYear = index === 0 || timelines[index - 1].year !== timeline.year;
          const isImg = timeline.img !== null;
          return (
            <S.InfoTimelineTableTr key={timeline.id} isFirstOfYear={isFirstOfYear} isImg={isImg}>
              <S.InfoTimelineTableTdYear isFirstOfYear={isFirstOfYear}>
                {isFirstOfYear ? (
                  <span>{timeline.year}</span>
                ) : (
                  <span></span>
                )}
              </S.InfoTimelineTableTdYear>

              <S.InfoTimelineTableTdMonth isFirstOfYear={isFirstOfYear}>
                <span>{timeline.month}</span>
              </S.InfoTimelineTableTdMonth>

              <S.InfoTimelineMobile>
                <S.InfoTimelineTableTdTitle isFirstOfYear={isFirstOfYear}>
                  <span>{timeline.title}</span>
                  {timeline.info && (
                    <S.InfoTimelineInfo >
                      {timeline.info}
                    </S.InfoTimelineInfo>
                  )}
                </S.InfoTimelineTableTdTitle>
                {timeline.img && (
                  <S.InfoTimelineTableTdImg className='timeline-img'>
                    <Image src={timeline.img} alt={timeline.title} width={200} height={150} />
                  </S.InfoTimelineTableTdImg >
                )}
              </S.InfoTimelineMobile>

            </S.InfoTimelineTableTr>
          );
        })}
      </S.InfoTimelineTableBody>
    </S.InfoTimelineTable>
  );
}

export default Timeline;