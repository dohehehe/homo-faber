import { useState, useEffect } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

export default function AddressSearch({ register, setValue, setAddress, fieldPrefix = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [kakaoLoaded, setKakaoLoaded] = useState(false);

  // Kakao Maps SDK 로딩과 초기화를 별도의 useEffect에서 처리
  useEffect(() => {
    const loadKakaoMaps = () => {
      // Kakao API 키가 없으면 로드하지 않음
      if (!process.env.NEXT_PUBLIC_KAKAO_JS_KEY) {
        console.warn('Kakao API 키가 설정되지 않았습니다. NEXT_PUBLIC_KAKAO_JS_KEY 환경변수를 확인해주세요.');
        return;
      }

      // 이미 스크립트가 로드 중인지 확인
      const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
      if (existingScript) {
        // 이미 로드된 스크립트가 있다면 초기화만 확인
        if (window.kakao?.maps?.load) {
          window.kakao.maps.load(() => {
            setKakaoLoaded(!!window.kakao.maps.services);
          });
        } else {
          const checkLoaded = () => {
            if (window.kakao?.maps?.load) {
              window.kakao.maps.load(() => {
                setKakaoLoaded(!!window.kakao.maps.services);
              });
            } else {
              setTimeout(checkLoaded, 100);
            }
          };
          checkLoaded();
        }
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services&autoload=false`;

      script.onload = () => {
        if (window.kakao?.maps?.load) {
          window.kakao.maps.load(() => {
            setKakaoLoaded(!!window.kakao.maps.services);
          });
        } else {
          console.error('Kakao Maps API가 제대로 로드되지 않았습니다.');
        }
      };

      script.onerror = () => {
        console.error('Kakao 스크립트 로드 실패');
      };

      document.head.appendChild(script);
    };

    loadKakaoMaps();
  }, []);

  const convertAddressToCoords = (address) => {
    return new Promise((resolve) => {
      // SDK가 완전히 로드되고 초기화된 후에만 지오코딩 기능 사용
      if (!kakaoLoaded || !window.kakao?.maps?.services?.Geocoder) {
        console.warn('Kakao Maps SDK가 아직 로드되지 않았습니다.');
        resolve({ latitude: null, longitude: null });
        return;
      }

      try {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
          if (
            status === window.kakao.maps.services.Status.OK &&
            result.length > 0
          ) {
            const coords = {
              latitude: parseFloat(result[0].y),
              longitude: parseFloat(result[0].x),
            };
            resolve(coords);
          } else {
            console.warn('주소 검색 실패:', status);
            resolve({ latitude: null, longitude: null });
          }
        });
      } catch (error) {
        console.error('지오코딩 오류:', error);
        resolve({ latitude: null, longitude: null });
      }
    });
  };

  const handleComplete = async (data) => {
    // SDK가 로드되지 않았다면 주소만 설정하고 좌표는 null로 설정
    if (!kakaoLoaded) {
      console.warn('Kakao Maps SDK가 로드되지 않아 좌표를 가져올 수 없습니다.');

      const fieldNames = {
        address: fieldPrefix ? `${fieldPrefix}address` : 'address',
        latitude: fieldPrefix ? `${fieldPrefix}latitude` : 'latitude',
        longitude: fieldPrefix ? `${fieldPrefix}longitude` : 'longitude'
      };

      let fullAddress = data.address;
      let extraAddress = '';

      if (data.addressType === 'R') {
        if (data.bname) extraAddress += data.bname;
        if (data.buildingName) {
          extraAddress += extraAddress
            ? `, ${data.buildingName}`
            : data.buildingName;
        }
        if (extraAddress) fullAddress += ` (${extraAddress})`;
      }

      setValue(fieldNames.address, fullAddress);
      setValue(fieldNames.latitude, null);
      setValue(fieldNames.longitude, null);

      if (!fieldPrefix) {
        setAddress(fullAddress);
      }

      setIsOpen(false);
      return;
    }

    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname) extraAddress += data.bname;
      if (data.buildingName) {
        extraAddress += extraAddress
          ? `, ${data.buildingName}`
          : data.buildingName;
      }
      if (extraAddress) fullAddress += ` (${extraAddress})`;
    }

    const coords = await convertAddressToCoords(fullAddress);

    const fieldNames = {
      address: fieldPrefix ? `${fieldPrefix}address` : 'address',
      latitude: fieldPrefix ? `${fieldPrefix}latitude` : 'latitude',
      longitude: fieldPrefix ? `${fieldPrefix}longitude` : 'longitude'
    };
    console.log(coords);
    setValue(fieldNames.address, fullAddress);
    setValue(fieldNames.latitude, coords.latitude);
    setValue(fieldNames.longitude, coords.longitude);

    if (!fieldPrefix) {
      setAddress(fullAddress);
    }

    setIsOpen(false);
  };

  return (
    <>
      <input
        placeholder="주소를 검색해주세요."
        {...register(fieldPrefix ? `${fieldPrefix}address` : 'address', { required: '주소는 필수 입력 항목입니다.' })}
        onClick={() => setIsOpen(!isOpen)}
        readOnly
      />
      {isOpen && <DaumPostcodeEmbed onComplete={handleComplete} />}
    </>
  );
}