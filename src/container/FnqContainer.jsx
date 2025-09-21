'use client';
import { useAuth } from '@/contexts/AuthContext';
import * as S from '@/styles/fnq/fnqContainer.style';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useFnqStatuses } from '@/hooks/useFnq';
import Image from 'next/image';
import Popup from '@/components/common/Popup';

function FnqContainer() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showLoginRequiredPopup, setShowLoginRequiredPopup] = useState(false);
  const [isDataRestored, setIsDataRestored] = useState(false);
  const router = useRouter();

  // fnq_status 데이터 가져오기
  const { statuses, loading: statusesLoading, error: statusesError } = useFnqStatuses();

  // localStorage 키
  const TEMP_FNQ_DATA_KEY = 'temp_fnq_data';
  const TEMP_FNQ_FILES_KEY = 'temp_fnq_files';

  // 파일 업로드 관련 상태
  const [filePreviews, setFilePreviews] = useState({});
  const [localFiles, setLocalFiles] = useState({});

  // 파일 업로드 훅 (gallery 버킷, 5MB 제한) - 임시로 gallery 버킷 사용
  const { processImageForPreview, uploadImageToServer } = useImageUpload({
    bucket: 'gallery',
    maxSizeInMB: 5
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      files: []
    }
  });

  const {
    fields: fileFields,
    append: appendFile,
    remove: removeFile,
  } = useFieldArray({
    control,
    name: 'files',
  });

  // 파일을 Base64로 변환하는 함수
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // Base64를 File로 변환하는 함수
  const base64ToFile = (base64, filename, mimeType) => {
    const arr = base64.split(',');
    const mime = mimeType || arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // 데이터 저장 함수 (파일 포함)
  const saveTempData = async (formData) => {
    try {
      const dataToSave = {
        title: formData.title || '',
        material: formData.material || '',
        count: formData.count || '',
        budget: formData.budget || '',
        due_date: formData.due_date || '',
        detail: formData.detail || '',
        status_id: formData.status_id || null
      };

      // 파일 데이터 저장
      const filesData = [];
      for (let i = 0; i < fileFields.length; i++) {
        if (localFiles[i]) {
          const base64 = await fileToBase64(localFiles[i]);
          filesData.push({
            index: i,
            name: localFiles[i].name,
            type: localFiles[i].type,
            size: localFiles[i].size,
            data: base64
          });
        }
      }

      localStorage.setItem(TEMP_FNQ_DATA_KEY, JSON.stringify(dataToSave));
      localStorage.setItem(TEMP_FNQ_FILES_KEY, JSON.stringify(filesData));
      console.log('임시 데이터 저장됨:', dataToSave);
      console.log('임시 파일 데이터 저장됨:', filesData.length, '개 파일');
    } catch (error) {
      console.error('데이터 저장 실패:', error);
    }
  };

  // 데이터 복원 함수 (파일 포함)
  const restoreTempData = async () => {
    try {
      const savedData = localStorage.getItem(TEMP_FNQ_DATA_KEY);
      const savedFiles = localStorage.getItem(TEMP_FNQ_FILES_KEY);

      let hasData = false;

      // 폼 데이터 복원
      if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
          if (data[key]) {
            setValue(key, data[key]);
          }
        });
        console.log('임시 데이터 복원됨:', data);
        hasData = true;
      }

      // 파일 데이터 복원
      if (savedFiles) {
        const filesData = JSON.parse(savedFiles);
        console.log('저장된 파일 데이터:', filesData);

        // 파일 필드 초기화
        const newFileFields = [];
        const newFilePreviews = {};
        const newLocalFiles = {};

        for (const fileData of filesData) {
          // 파일 필드 추가
          const newIndex = newFileFields.length;
          newFileFields.push({
            id: `temp-${newIndex}`,
            file_url: '',
            order_num: newIndex + 1
          });

          // Base64를 File로 변환
          const file = base64ToFile(fileData.data, fileData.name, fileData.type);
          newLocalFiles[newIndex] = file;

          // 미리보기 URL 생성
          const previewUrl = URL.createObjectURL(file);
          newFilePreviews[newIndex] = previewUrl;
        }

        // 상태 업데이트
        if (newFileFields.length > 0) {
          // 기존 파일 필드 제거
          for (let i = fileFields.length - 1; i >= 0; i--) {
            removeFile(i);
          }

          // 새 파일 필드 추가
          newFileFields.forEach(field => {
            appendFile(field);
          });

          setFilePreviews(newFilePreviews);
          setLocalFiles(newLocalFiles);
          console.log('임시 파일 데이터 복원됨:', newFileFields.length, '개 파일');
          hasData = true;
        }
      }

      return hasData;
    } catch (error) {
      console.error('데이터 복원 실패:', error);
    }
    return false;
  };

  // 임시 데이터 삭제 함수
  const clearTempData = () => {
    try {
      localStorage.removeItem(TEMP_FNQ_DATA_KEY);
      localStorage.removeItem(TEMP_FNQ_FILES_KEY);
      console.log('임시 데이터 삭제됨');
    } catch (error) {
      console.error('데이터 삭제 실패:', error);
    }
  };

  // 컴포넌트 언마운트 시 로컬 URL 정리
  useEffect(() => {
    return () => {
      Object.values(filePreviews).forEach(url => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [filePreviews]);

  // 사용자 로그인 상태 변경 시 데이터 복원
  useEffect(() => {
    const restoreData = async () => {
      if (user && !isDataRestored) {
        const hasRestoredData = await restoreTempData();
        if (hasRestoredData) {
          setIsDataRestored(true);
        }
      }
    };

    restoreData();
  }, [user, isDataRestored, setValue, removeFile, appendFile, restoreTempData]);

  // 파일 미리보기 처리
  const handleFilePreview = async (file, index) => {
    try {
      const result = await processImageForPreview(file);
      if (result.success) {
        const fileUrl = result.file.url;
        const originalFile = result.file.originalFile;

        // 로컬 파일 저장
        setLocalFiles(prev => ({
          ...prev,
          [index]: originalFile,
        }));

        // 미리보기 설정
        setFilePreviews(prev => ({
          ...prev,
          [index]: fileUrl,
        }));
      } else {
        alert('파일 처리에 실패했습니다: ' + result.error);
      }
    } catch (error) {
      console.error('파일 처리 오류:', error);
      alert('파일 처리 중 오류가 발생했습니다.');
    }
  };

  // 파일 선택 처리
  const handleFileSelect = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      // 파일 크기 체크 (5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert('파일 크기가 5MB를 초과합니다. 5MB 이상의 파일은 이메일로 전달해주세요.');
        return;
      }
      handleFilePreview(file, index);
    }
  };

  const onSubmit = async (formData) => {
    // 사용자 인증 확인
    if (!user) {
      // 로그인하지 않은 사용자의 데이터를 임시 저장
      await saveTempData(formData);
      setShowLoginRequiredPopup(true);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // 업로드된 파일들 처리
      const uploadedFiles = [];
      const filePromises = Object.values(localFiles).map(async (file) => {
        if (file) {
          const result = await uploadImageToServer(file);
          if (result.success) {
            return result.file.url;
          } else {
            throw new Error('파일 업로드 실패: ' + result.error);
          }
        }
        return null;
      });

      const fileUrls = await Promise.all(filePromises);
      uploadedFiles.push(...fileUrls.filter(url => url));

      // API에 맞는 데이터 구조로 변환
      const apiData = {
        title: formData.title,
        detail: formData.detail,
        count: formData.count ? parseInt(formData.count) : null,
        due_date: formData.due_date || null,
        budget: formData.budget || null,
        status_id: formData.status_id || null,
        img: uploadedFiles // 업로드된 모든 파일의 URL 배열
      };

      const response = await fetch('/api/fnq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키 포함
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '견적 요청 중 오류가 발생했습니다.');
      }

      const result = await response.json();
      console.log('견적 요청 성공:', result);

      // 성공 시 임시 데이터 삭제
      clearTempData();

      setIsLoading(false);
      alert('견적 요청이 성공적으로 전송되었습니다.');
      router.push('/mypage');

    } catch (error) {
      console.error('견적 요청 오류:', error);
      setError(error.message || '견적 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
      setShowErrorPopup(true);
      setIsLoading(false);
    }
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
    setError('');
  };

  const closeLoginRequiredPopup = () => {
    setShowLoginRequiredPopup(false);
  };

  const handleLoginRedirect = () => {
    setShowLoginRequiredPopup(false);
    router.push('/login');
  };

  return (
    <>
      <S.FnqWrapper>
        <S.FnqPageName>견적 요청</S.FnqPageName>

        <S.UserForm onSubmit={handleSubmit(onSubmit)}>
          <S.FormGroup>
            <S.Label><span style={{ color: 'red' }}>*</span> 프로젝트 이름</S.Label>
            <S.Input
              type="text"
              placeholder="프로젝트 이름을 입력해주세요 (예 스툴 제작)"
              {...register('title', {
                required: '프로젝트 이름을 입력해주세요',
                minLength: {
                  value: 1,
                  message: '프로젝트 이름을 1자 이상 입력해주세요'
                }
              })}
            />
            {errors.title && <S.ErrorMessage>{errors.title.message}</S.ErrorMessage>}
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>수량</S.Label>
            <S.Input
              type="number"
              placeholder="수량을 입력해주세요 (선택)"
              {...register('count', {
                min: {
                  value: 1,
                  message: '수량은 1 이상이어야 합니다'
                }
              })}
            />
            {errors.count && <S.ErrorMessage>{errors.count.message}</S.ErrorMessage>}
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>예산</S.Label>
            <S.Input
              type="text"
              placeholder="예산을 입력해주세요 (선택)"
              {...register('budget')}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>상태</S.Label>
            <S.Input
              as="select"
              {...register('status_id')}
            >
              <option value="">상태를 선택해주세요 (선택)</option>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name || status.status}
                </option>
              ))}
            </S.Input>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>납기일</S.Label>
            <S.Input
              type="date"
              {...register('due_date')}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label><span style={{ color: 'red' }}>*</span> 상세내용</S.Label>
            <S.InputInfo style={{ color: '#444' }}>제작 목적 및 동작 시나리오를 설명해주세요. <br />상세하게 작성할수록 기술자가 프로젝트를 이해하는데 도움이 됩니다</S.InputInfo>
            <S.InputTextarea
              type="textarea"
              placeholder="프로젝트에 대한 상세한 내용을 입력해주세요"
              {...register('detail', {
                required: '상세내용을 입력해주세요',
                minLength: {
                  value: 10,
                  message: '상세내용은 10자 이상 입력해주세요'
                }
              })}

            />
            {errors.detail && <S.ErrorMessage>{errors.detail.message}</S.ErrorMessage>}
          </S.FormGroup>

          {/* 파일 업로드 갤러리 */}
          <S.FormGroup>
            <S.Label>첨부파일</S.Label>
            <S.InputInfo style={{ color: '#444' }}>프로젝트를 이해하는데 도움이 되는 도면 또는 스케치를 전달해주세요</S.InputInfo>
            <S.InputInfo>
              *5MB 이상의 파일은 아래의 이메일로 &apos;프로젝트 이름&apos;과 함께 전달해주세요.<br />
              <a href="mailto:listentothecity.org@gmail.com" style={{ fontWeight: '600' }}>(listentothecity.org@gmail.com)</a>
            </S.InputInfo>

            <S.InputGalleryWrapper>
              {fileFields.map((field, index) => (
                <S.InputGalleryItem key={field.id}>
                  <S.InputGalleryItemTitle>파일 {index + 1}</S.InputGalleryItemTitle>
                  <S.InputGalleryItemButton
                    type="button"
                    onClick={() => {
                      removeFile(index);
                      // 미리보기도 함께 삭제하고 인덱스 재정렬
                      setFilePreviews(prev => {
                        const newPreviews = {};
                        Object.entries(prev).forEach(([key, value]) => {
                          const currentIndex = parseInt(key);
                          if (currentIndex < index) {
                            newPreviews[currentIndex] = value;
                          } else if (currentIndex > index) {
                            newPreviews[currentIndex - 1] = value;
                          }
                        });
                        return newPreviews;
                      });
                      // 로컬 파일도 함께 삭제하고 인덱스 재정렬
                      setLocalFiles(prev => {
                        const newLocalFiles = {};
                        Object.entries(prev).forEach(([key, value]) => {
                          const currentIndex = parseInt(key);
                          if (currentIndex < index) {
                            newLocalFiles[currentIndex] = value;
                          } else if (currentIndex > index) {
                            newLocalFiles[currentIndex - 1] = value;
                          }
                        });
                        return newLocalFiles;
                      });
                    }}
                  >
                    x
                  </S.InputGalleryItemButton>

                  <div>
                    <input
                      id={`file.${index}`}
                      type="file"
                      accept="*/*"
                      onChange={(e) => handleFileSelect(e, index)}
                      style={{ display: 'none' }}
                    />

                    {!filePreviews[index] ? (
                      <div
                        onClick={() => document.getElementById(`file.${index}`).click()}
                        style={{
                          padding: '20px',
                          border: '2px dashed #ccc',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          backgroundColor: '#f9f9f9',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f0f0f0';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#f9f9f9';
                        }}
                      >
                        <div style={{ fontSize: '24px', marginBottom: '8px' }}>+</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>파일 선택</div>
                      </div>
                    ) : (
                      <div style={{ position: 'relative' }}>
                        {filePreviews[index].startsWith('blob:') ? (
                          <Image
                            src={filePreviews[index]}
                            alt={`파일 ${index + 1}`}
                            width={150}
                            height={100}
                            style={{ objectFit: 'cover', borderRadius: '4px' }}
                          />
                        ) : (
                          <div style={{
                            padding: '20px',
                            backgroundColor: '#e8f4fd',
                            borderRadius: '4px',
                            fontSize: '12px',
                            color: '#0066cc'
                          }}>
                            파일 업로드됨
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </S.InputGalleryItem>
              ))}
            </S.InputGalleryWrapper>

            <S.InputGalleryItemAddButton
              type="button"
              onClick={() => {
                const newIndex = fileFields.length;
                appendFile({
                  file_url: '',
                  order_num: newIndex + 1,
                });
                // 새 파일 항목에 대한 로컬 파일 초기화
                setLocalFiles(prev => ({
                  ...prev,
                  [newIndex]: null,
                }));
              }}
            >
              + 파일 추가
            </S.InputGalleryItemAddButton>
          </S.FormGroup>


          <S.ButtonWrapper>
            <S.SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? '전송 중...' : '견적 요청'}
            </S.SubmitButton>
          </S.ButtonWrapper>
        </S.UserForm>

        <Popup
          isVisible={showErrorPopup}
          message={error}
          onClose={closeErrorPopup}
          type="error"
        />

        <Popup
          isVisible={showLoginRequiredPopup}
          onClose={closeLoginRequiredPopup}
          type="info"
          title="로그인이 필요합니다"
          subtitle={
            <>
              견적 요청을 하시려면 로그인 또는 회원가입이 필요합니다.<br />
              (입력하신 데이터는 잠시간 임시 저장됩니다)
            </>
          }
          buttons={[
            { text: '취소', onClick: closeLoginRequiredPopup, variant: 'info' },
            { text: '로그인하기', onClick: handleLoginRedirect, variant: 'primary' }
          ]}
        />
      </S.FnqWrapper >
    </>
  );
}

export default FnqContainer;