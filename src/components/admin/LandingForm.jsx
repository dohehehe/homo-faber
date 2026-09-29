'use client';

import { useEffect, useState } from 'react';
import { uploadImage } from '@/utils/api/image-upload-api';
import { getLandingSections, saveLandingSections } from '@/utils/api/landing-api';
import { DEFAULT_LANDING_SECTIONS, isLandingVideo } from '@/config/landingSections';
import * as S from '@/styles/admin/adminForm.style';
import styled from '@emotion/styled';

const SlotList = styled.div`
  display: grid;
  gap: 24px;
  margin-top: 20px;
`;

const SlotCard = styled.section`
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 20px;
  background: #fff;
`;

const SlotTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
`;

const Preview = styled.div`
  margin-top: 10px;
  max-width: 420px;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  background: #111;

  img,
  video {
    display: block;
    width: 100%;
    height: auto;
    max-height: 240px;
    object-fit: cover;
  }
`;

const SLOT_META = {
  hero: {
    label: '1. 히어로',
    hint: '텍스트 + 버튼. 영상 또는 이미지를 넣을 수 있습니다.',
    titleLabel: '텍스트',
    bodyLabel: '보조 텍스트',
  },
  find: {
    label: '2. Find',
    hint: '제목 + 텍스트 + 버튼',
    titleLabel: '제목',
    bodyLabel: '텍스트',
  },
  ask: {
    label: '3. Ask',
    hint: '제목 + 텍스트 + 버튼',
    titleLabel: '제목',
    bodyLabel: '텍스트',
  },
};

function LandingForm() {
  const [sections, setSections] = useState(DEFAULT_LANDING_SECTIONS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getLandingSections();
        setSections(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateSection = (id, patch) => {
    setSections((prev) => prev.map((section) => (
      section.id === id ? { ...section, ...patch } : section
    )));
  };

  const handleFileChange = async (id, file) => {
    if (!file) return;
    setError('');
    setUploadingId(id);
    const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
    const maxSizeInMB = mediaType === 'video' ? 50 : 8;
    try {
      const result = await uploadImage(file, 'landing', maxSizeInMB);
      if (!result?.success) {
        throw new Error(result?.error || '업로드에 실패했습니다.');
      }
      updateSection(id, {
        media_url: result.data.url,
        media_type: mediaType,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingId(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const saved = await saveLandingSections(sections);
      setSections(saved);
      alert('저장되었습니다.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>불러오는 중...</p>;
  }

  return (
    <S.AdminFormWrapper>
      <S.Header>
        <h1>랜딩페이지 관리</h1>
        <S.Actions>
          <S.SaveBtn type="button" onClick={handleSave} disabled={saving || uploadingId}>
            {saving ? '저장 중...' : '저장'}
          </S.SaveBtn>
        </S.Actions>
      </S.Header>

      {error && <p style={{ color: '#dc3545', marginTop: 12 }}>{error}</p>}

      <SlotList>
        {sections.map((section) => {
          const meta = SLOT_META[section.id] || SLOT_META.find;
          const video = isLandingVideo(section);
          return (
            <SlotCard key={section.id}>
              <SlotTitle>{meta.label}</SlotTitle>
              <p style={{ margin: '0 0 16px', color: '#666', fontSize: 13 }}>{meta.hint}</p>

              <S.FormField>
                <label htmlFor={`${section.id}-media`}>이미지 / 영상</label>
                <input
                  id={`${section.id}-media`}
                  type="file"
                  accept="image/*,video/mp4,video/webm,video/quicktime"
                  disabled={uploadingId === section.id}
                  onChange={(event) => handleFileChange(section.id, event.target.files?.[0])}
                />
                {uploadingId === section.id && <p>업로드 중...</p>}
                {section.media_url && (
                  <Preview>
                    {video ? (
                      <video src={section.media_url} muted playsInline controls />
                    ) : (
                      <img src={section.media_url} alt="" />
                    )}
                  </Preview>
                )}
              </S.FormField>

              <S.FormField>
                <label htmlFor={`${section.id}-title`}>{meta.titleLabel}</label>
                <input
                  id={`${section.id}-title`}
                  value={section.title || ''}
                  onChange={(event) => updateSection(section.id, { title: event.target.value })}
                />
              </S.FormField>

              <S.FormField>
                <label htmlFor={`${section.id}-body`}>{meta.bodyLabel}</label>
                <textarea
                  id={`${section.id}-body`}
                  value={section.body || ''}
                  onChange={(event) => updateSection(section.id, { body: event.target.value })}
                />
              </S.FormField>

              <S.FormGrid>
                <S.FormField>
                  <label htmlFor={`${section.id}-button`}>버튼 문구</label>
                  <input
                    id={`${section.id}-button`}
                    value={section.button_label || ''}
                    onChange={(event) => updateSection(section.id, { button_label: event.target.value })}
                  />
                </S.FormField>
                <S.FormField>
                  <label htmlFor={`${section.id}-href`}>버튼 링크</label>
                  <input
                    id={`${section.id}-href`}
                    value={section.button_href || ''}
                    onChange={(event) => updateSection(section.id, { button_href: event.target.value })}
                  />
                </S.FormField>
              </S.FormGrid>
            </SlotCard>
          );
        })}
      </SlotList>
    </S.AdminFormWrapper>
  );
}

export default LandingForm;
