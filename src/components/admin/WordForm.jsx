'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { createWord, updateWord, getWordById } from '@/utils/api/word-api';
import { useImageUpload } from '@/hooks/useImageUpload';
import Button from '@/components/admin/Button';
import * as S from '@/styles/admin/adminForm.style';

const WordForm = ({
  mode = 'create',
  wordId,
}) => {
  // 기본값 설정
  const formMode = mode;
  const formWordId = wordId;
  const router = useRouter();
  const [error, setError] = useState(null);
  const [wordData, setWordData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // 이미지 관련 상태
  const [imagePreview, setImagePreview] = useState('');
  const [localImage, setLocalImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // 이미지 업로드 훅 사용
  const { processImageForPreview, uploadImageToServer } = useImageUpload({
    bucket: 'gallery',
    maxSizeInMB: 0.5
  });

  // react-hook-form 설정
  const {
    setValue,
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      meaning: '',
      source: '',
      image: '',
    },
    mode: 'onChange', // 실시간 유효성 검사
  });

  // 컴포넌트 언마운트 시 로컬 URL 정리
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (formMode === 'edit' && formWordId) {
          setIsDataLoading(true);
          setError(null);

          // 단어 데이터 로드
          const word = await getWordById(formWordId);
          console.log('Loaded word data:', word);
          setWordData(word);

          // 기본 정보 설정
          setValue('name', word.name || '');
          setValue('meaning', word.meaning || '');
          setValue('source', word.source || '');
          setValue('image', word.image || '');

          // 이미지 미리보기 설정
          if (word.img) {
            setImagePreview(word.img);
          }

          // 폼 유효성 검사 트리거
          await trigger(['name', 'meaning']);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsDataLoading(false);
      }
    };

    loadData();
  }, [formMode, formWordId, setValue]);

  const handleBack = () => {
    router.push('/admin/word');
  };

  const handleImagePreview = async (file) => {
    try {
      const result = await processImageForPreview(file);
      if (result.success) {
        const imageUrl = result.file.url;
        const originalFile = result.file.originalFile;

        // 로컬 파일 저장
        setLocalImage(originalFile);
        // 미리보기 설정
        setImagePreview(imageUrl);
      } else {
        alert('이미지 처리에 실패했습니다: ' + result.error);
      }
    } catch (error) {
      console.error('이미지 처리 오류:', error);
      alert('이미지 처리 중 오류가 발생했습니다.');
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 선택할 수 있습니다.');
        return;
      }
      handleImagePreview(file);
    }
  };

  const handleSave = useCallback(async (formData) => {
    try {
      setIsSaving(true);

      let imageData = wordData?.img || [];

      // 이미지가 선택된 경우 업로드
      if (localImage) {
        setIsUploading(true);
        const uploadResult = await uploadImageToServer(localImage);
        if (uploadResult.success) {
          imageData = uploadResult.file.url;
        } else {
          alert('이미지 업로드에 실패했습니다: ' + uploadResult.error);
          return;
        }
        setIsUploading(false);
      }

      const newWordData = {
        name: formData.name,
        meaning: formData.meaning,
        source: formData.source || '',
        img: imageData ? imageData : (wordData?.img || []),
      };

      if (formMode === 'create') {
        await createWord(newWordData);
        alert('단어가 성공적으로 등록되었습니다.');
        router.push('/admin/word');
      } else {
        await updateWord(formWordId, newWordData);
        alert('수정 완료');
        router.push('/admin/word');
      }

    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  }, [formMode, formWordId, router, localImage, uploadImageToServer, wordData]);

  if (isDataLoading) {
    return (
      <S.AdminFormWrapper>
        <S.Header>
          <h1>{formMode === 'create' ? '단어 등록' : '단어 수정'}</h1>
          <Button onClick={handleBack}>목록으로</Button>
        </S.Header>
        <S.LoadingMessage>단어 데이터를 불러오는 중...</S.LoadingMessage>
      </S.AdminFormWrapper>
    );
  }

  if (error) {
    return (
      <S.AdminFormWrapper>
        <S.Header>
          <h1>{formMode === 'create' ? '단어 등록' : '단어 수정'}</h1>
          <Button onClick={handleBack}>목록으로</Button>
        </S.Header>
        <S.ErrorMessage>오류가 발생했습니다: {error}</S.ErrorMessage>
      </S.AdminFormWrapper>
    );
  }

  return (
    <S.AdminFormWrapper>
      <S.Header>
        <h1>{formMode === 'create' ? '단어 등록' : '단어 수정'}</h1>
        <S.Actions>
          <Button onClick={handleBack}>목록으로</Button>
          <Button className="edit" onClick={handleSubmit(handleSave)} disabled={isSaving || isUploading}>
            {isSaving ? '저장 중...' : isUploading ? '이미지 업로드 중...' : '저장'}
          </Button>
        </S.Actions>
      </S.Header>

      <S.FormSection>
        <h2>{formMode === 'edit' && wordData?.name ? wordData.name : '단어 정보'}</h2>

        <S.FormGrid>
          <div>
            <S.FormField>
              <label htmlFor="name">단어명 <span style={{ color: 'red' }}>*</span></label>
              <input
                id="name"
                type="text"
                {...register('name', {
                  required: '단어명은 필수 입력값입니다.',
                  minLength: { value: 1, message: '단어명을 입력해주세요.' }
                })}
                placeholder="(필수) 단어명을 입력하세요"
              />
              {errors.name && (
                <S.ErrorInputMessage>
                  {errors.name.message}
                </S.ErrorInputMessage>
              )}
            </S.FormField>

            <S.FormField>
              <label htmlFor="source">출처</label>
              <input
                id="source"
                type="text"
                {...register('source')}
                placeholder="출처를 입력하세요 (선택사항)"
              />
            </S.FormField>
          </div>

          <div>
            <S.FormField>
              <label htmlFor="meaning">의미 <span style={{ color: 'red' }}>*</span></label>
              <textarea
                id="meaning"
                {...register('meaning', {
                  required: '의미는 필수 입력값입니다.',
                  minLength: { value: 1, message: '의미를 입력해주세요.' }
                })}
                placeholder="(필수) 단어의 의미를 자세히 입력하세요"
                rows={6}
              />
              {errors.meaning && (
                <S.ErrorInputMessage>
                  {errors.meaning.message}
                </S.ErrorInputMessage>
              )}
            </S.FormField>

            <S.FormField>
              <label htmlFor="image">이미지</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
              />
              <Button
                className="create"
                onClick={() => document.getElementById('image').click()}
                disabled={isUploading}
              >
                {isUploading ? '업로드 중...' : '이미지 선택'}
              </Button>
              {imagePreview && (
                <div className="image-preview" style={{ marginTop: '10px' }}>
                  <Image
                    src={imagePreview}
                    alt="이미지 미리보기"
                    width={300}
                    height={200}
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              )}
            </S.FormField>
          </div>
        </S.FormGrid>
      </S.FormSection>
    </S.AdminFormWrapper>
  );
};

export default WordForm;
