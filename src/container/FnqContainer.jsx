'use client';
import { useAuth } from '@/contexts/AuthContext';
import * as S from '@/styles/fnq/fnqContainer.style';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';
import Editor from '@/components/interview/Editor';
import Popup from '@/components/common/Popup';

function FnqContainer() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showLoginRequiredPopup, setShowLoginRequiredPopup] = useState(false);
  const [isDataRestored, setIsDataRestored] = useState(false);
  const router = useRouter();

  // localStorage 키
  const TEMP_FNQ_DATA_KEY = 'temp_fnq_data';
  const TEMP_FNQ_FILES_KEY = 'temp_fnq_files';

  // 파일 업로드 관련 상태
  const [filePreviews, setFilePreviews] = useState({});
  const [localFiles, setLocalFiles] = useState({});

  // 에디터 관련 상태
  const editorRef = useRef(null);
  const [editorData, setEditorData] = useState({ blocks: [] });

  // 예산 포맷팅 함수
  const formatNumber = (value) => {
    if (!value) return '';
    // 숫자가 아닌 문자 제거
    const numericValue = value.replace(/[^0-9]/g, '');
    // 천 단위 구분자 추가
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // 예산 입력 핸들러
  const handleBudgetChange = (e) => {
    const formattedValue = formatNumber(e.target.value);
    setValue('budget', formattedValue);
  };

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
        status_id: formData.status_id || null,
        editorData: editorData.blocks || editorData
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
          if (data[key] && key !== 'editorData') {
            // 예산 필드는 포맷팅 적용
            if (key === 'budget' && typeof data[key] === 'number') {
              setValue(key, formatNumber(data[key].toString()));
            } else {
              setValue(key, data[key]);
            }
          }
        });

        // 에디터 데이터 복원
        if (data.editorData) {
          // blocks 배열이면 그대로 사용, 전체 객체면 blocks 추출
          const editorBlocks = Array.isArray(data.editorData)
            ? data.editorData
            : data.editorData.blocks || [];
          setEditorData({ blocks: editorBlocks });
        }

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

  // 컴포넌트 언마운트 시 로컬 URL 정리 (이제 blob URL을 사용하지 않으므로 불필요)
  useEffect(() => {
    return () => {
      // 파일 미리보기가 객체 형태로 변경되어 blob URL 정리가 불필요
      // 필요시 다른 정리 작업 수행
    };
  }, []);

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

  // 파일 미리보기 처리 (파일명과 확장자만 저장)
  const handleFilePreview = async (file, index) => {
    try {
      // 파일명과 확장자 추출
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop()?.toUpperCase() || 'FILE';

      // 로컬 파일 저장
      setLocalFiles(prev => ({
        ...prev,
        [index]: file,
      }));

      // 파일명과 확장자만 저장 (이미지 미리보기 대신)
      setFilePreviews(prev => ({
        ...prev,
        [index]: {
          name: fileName,
          extension: fileExtension,
          size: file.size
        },
      }));
    } catch (error) {
      console.error('파일 처리 중 오류:', error);
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
      // 에디터 데이터 가져오기
      let outputData = editorData;
      if (editorRef.current?.isReady()) {
        const editorSaveData = await editorRef.current.save();
        // blocks 배열만 추출
        outputData = editorSaveData.blocks || [];
      }

      // 업로드된 파일들 처리 (URL과 파일명을 함께 저장)
      const uploadedFiles = [];
      const filePromises = Object.entries(localFiles).map(async ([index, file]) => {
        if (file) {
          const result = await uploadImageToServer(file);
          if (result.success) {
            return {
              url: result.file.url,
              name: file.name,
              extension: file.name.split('.').pop()?.toUpperCase() || 'FILE',
              size: file.size
            };
          } else {
            throw new Error('파일 업로드 실패: ' + result.error);
          }
        }
        return null;
      });

      const fileData = await Promise.all(filePromises);
      uploadedFiles.push(...fileData.filter(file => file));

      // API에 맞는 데이터 구조로 변환
      const apiData = {
        title: formData.title,
        detail: outputData, // 에디터 데이터로 변경
        count: formData.count ? parseInt(formData.count) : null,
        due_date: formData.due_date || null,
        budget: formData.budget ? parseInt(formData.budget.replace(/,/g, '')) : null, // 쉼표 제거 후 숫자로 변환
        status_id: '8d1235ef-80c3-4a9f-981c-d8ddcbab6f5d', // 기본값: 확인중 상태
        img: uploadedFiles // 업로드된 파일 정보 배열 (url, name, extension, size 포함)
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
              onChange={handleBudgetChange}
            />
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
            <Editor ref={editorRef} data={editorData} />
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
                  <input
                    id={`file.${index}`}
                    type="file"
                    accept="*/*"
                    onChange={(e) => handleFileSelect(e, index)}
                    style={{ display: 'none' }}
                  />
                  {!filePreviews[index] ? (
                    <></>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <S.InputGalleryItemTitle>
                        📄 {filePreviews[index].name}
                      </S.InputGalleryItemTitle>
                      <S.InputGalleryItemButton
                        type="button"
                        onClick={() => {
                          // 파일 제거
                          setFilePreviews(prev => {
                            const newPreviews = { ...prev };
                            delete newPreviews[index];
                            return newPreviews;
                          });
                          setLocalFiles(prev => {
                            const newFiles = { ...prev };
                            delete newFiles[index];
                            return newFiles;
                          });
                          // 파일 필드에서도 제거
                          removeFile(index);
                        }}
                      >
                        ×
                      </S.InputGalleryItemButton>
                    </div>
                  )}
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

                // 파일 선택 다이얼로그 바로 열기
                setTimeout(() => {
                  const fileInput = document.getElementById(`file.${newIndex}`);
                  if (fileInput) {
                    fileInput.click();
                  }
                }, 100);
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