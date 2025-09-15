import { createClient } from './client';

/**
 * 타임라인을 생성합니다.
 * @param {Object} timelineData - 타임라인 데이터
 * @param {string} timelineData.year - 연도
 * @param {string} timelineData.month - 월
 * @param {string} timelineData.day - 일
 * @param {string} timelineData.title - 제목
 * @param {string} timelineData.info - 정보
 * @returns {Promise<Object>} 생성된 타임라인 데이터
 */
export async function createTimeline(timelineData) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('timeline')
    .insert([
      {
        year: timelineData.year,
        month: timelineData.month,
        day: timelineData.day,
        title: timelineData.title,
        info: timelineData.info
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 모든 타임라인을 가져옵니다.
 * year, month, date 순으로 정렬됩니다.
 * @returns {Promise<Array>} 타임라인 목록
 */
export async function getTimelines() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('timeline')
    .select('*')
    .order('year', { ascending: true })
    .order('month', { ascending: true })
    .order('day', { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * 특정 타임라인을 가져옵니다.
 * @param {string} timelineId - 타임라인 ID
 * @returns {Promise<Object>} 타임라인 데이터
 */
export async function getTimelineById(timelineId) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('timeline')
    .select('*')
    .eq('id', timelineId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * 타임라인을 업데이트합니다.
 * @param {string} timelineId - 타임라인 ID
 * @param {Object} updateData - 업데이트할 데이터
 * @returns {Promise<Object>} 업데이트된 타임라인 데이터
 */
export async function updateTimeline(timelineId, updateData) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('timeline')
    .update(updateData)
    .eq('id', timelineId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * 타임라인을 삭제합니다.
 * @param {string} timelineId - 타임라인 ID
 * @returns {Promise<boolean>} 삭제 성공 여부
 */
export async function deleteTimeline(timelineId) {
  const supabase = createClient();

  const { error } = await supabase
    .from('timeline')
    .delete()
    .eq('id', timelineId);

  if (error) throw error;
  return true;
}
