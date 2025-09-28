'use client';

import { useStores } from '@/hooks/useStores';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function Map2D({ onStoreHover, onStoreLeave }) {
  const { stores } = useStores();
  const pathname = usePathname();
  const router = useRouter();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // POI 클릭 핸들러
  const handlePOIClick = useCallback((storeId) => {
    router.push(`/store/${storeId}`);
  }, [router]);

  // 마커 추가 함수
  const addMarkers = useCallback(() => {
    if (!mapInstanceRef.current || !stores) return;

    // 기존 마커 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // 새 마커 추가
    stores.forEach(store => {
      // latitude와 longitude를 숫자로 변환
      const lat = parseFloat(store.latitude);
      const lng = parseFloat(store.longitude);

      // 디버깅을 위한 로그
      console.log(`Store: ${store.name}, Original: lat=${store.latitude}, lng=${store.longitude}, Parsed: lat=${lat}, lng=${lng}`);
      console.log(`Store images: card_img=${store.card_img}, thumbnail_img=${store.thumbnail_img}`);

      // 유효한 좌표인지 확인
      if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
        // 커스텀 마커 아이콘 생성 (가게 이미지 포함)
        const createCustomIcon = async (store) => {
          const hasImage = store.thumbnail_img;
          const imageUrl = store.thumbnail_img;

          if (hasImage) {
            try {
              // Canvas를 사용하여 이미지와 연두색 네모를 결합
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = 100;
              canvas.height = 100;

              // 배경을 투명하게 설정 (원형 배경 제거)

              // 이미지 로드 및 그리기
              const img = new Image();
              img.crossOrigin = 'anonymous'; // CORS 문제 해결

              return new Promise((resolve) => {
                img.onload = () => {
                  // 이미지 비율 계산 (가로 100px, 세로는 비율에 맞게)
                  const imageWidth = 100;
                  const imageHeight = (img.height / img.width) * imageWidth;

                  // 연두색 네모 그리기 (이미지 앞에)
                  ctx.fillStyle = 'rgba(65, 255, 138, 0.3)'; // 연두색
                  ctx.fillRect(0, 0, imageWidth, imageHeight);

                  // 검정색 stroke 추가
                  ctx.strokeStyle = '#000000';
                  ctx.lineWidth = 0.5;
                  ctx.strokeRect(0, 0, imageWidth, imageHeight);

                  // blending mode를 lighten으로 설정
                  ctx.globalCompositeOperation = 'lighten';

                  // 이미지 그리기 (contain 방식 - 비율 유지)
                  ctx.drawImage(img, 0, 0, imageWidth, imageHeight);

                  // blending mode를 원래대로 복원
                  ctx.globalCompositeOperation = 'source-over';

                  resolve({
                    url: canvas.toDataURL(),
                    scaledSize: new google.maps.Size(imageWidth, imageHeight),
                    anchor: new google.maps.Point(imageWidth / 2, imageHeight)
                  });
                };

                img.onerror = () => {
                  console.warn(`Failed to load image for store: ${store.name}`);
                  // 이미지 로드 실패 시 기본 마커 사용
                  resolve(createDefaultIcon(store));
                };

                img.src = imageUrl;
              });
            } catch (error) {
              console.warn(`Error creating custom icon for store: ${store.name}`, error);
              return createDefaultIcon(store);
            }
          } else {
            return createDefaultIcon(store);
          }
        };

        // 호버 아이콘 생성 함수 (1.4배 확대, 연두색 배경 없음)
        const createHoverIcon = async (store) => {
          if (!store.thumbnail_img) {
            return createDefaultIcon(store);
          }

          try {
            const img = new Image();
            img.crossOrigin = 'anonymous';

            return new Promise((resolve) => {
              img.onload = () => {
                // 원본 이미지 비율 계산
                const originalWidth = 100;
                const originalHeight = (img.height / img.width) * originalWidth;

                // 1.4배 확대된 크기 계산
                const scale = 1.4;
                let finalWidth = originalWidth * scale;
                let finalHeight = originalHeight * scale;

                // 최대 높이 140px를 넘지 않도록 비율 계산
                const maxHeight = 140;
                if (finalHeight > maxHeight) {
                  const ratio = maxHeight / finalHeight;
                  finalWidth = finalWidth * ratio;
                  finalHeight = maxHeight;
                }

                // Canvas 생성 및 크기 설정
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = finalWidth;
                canvas.height = finalHeight;

                // 이미지 그리기 (contain 방식 - 비율 유지)
                ctx.drawImage(img, 0, 0, finalWidth, finalHeight);

                // 검정색 stroke 추가
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(0, 0, finalWidth, finalHeight);

                resolve({
                  url: canvas.toDataURL(),
                  scaledSize: new google.maps.Size(finalWidth, finalHeight),
                  anchor: new google.maps.Point(finalWidth / 2, finalHeight)
                });
              };

              img.onerror = () => {
                console.warn(`Failed to load hover image for store: ${store.name}`);
                resolve(createDefaultIcon(store));
              };

              img.src = store.thumbnail_img;
            });
          } catch (error) {
            console.warn(`Error creating hover icon for store: ${store.name}`, error);
            return createDefaultIcon(store);
          }
        };

        // 기본 마커 생성 함수
        const createDefaultIcon = (store) => {
          return {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
               <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <!-- 기본 마커 -->
                 <circle cx="20" cy="20" r="18" fill="#41FF8A" stroke="#000000" stroke-width="0.5"/>
                 <circle cx="20" cy="20" r="6" fill="white" stroke="#000000" stroke-width="0.5"/>
               </svg>
             `),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 40)
          };
        };

        // 비동기로 아이콘 생성
        createCustomIcon(store).then(iconConfig => {
          const marker = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: mapInstanceRef.current,
            title: store.name,
            icon: iconConfig
          });

          // 마커 클릭 이벤트
          marker.addListener('click', () => {
            handlePOIClick(store.id);
          });

          // 마커 호버 이벤트 - 이미지 확대 및 연두색 배경 제거
          marker.addListener('mouseover', () => {
            marker.setZIndex(1000);

            // 상위 컴포넌트에 호버된 store 정보 전달
            if (onStoreHover) {
              onStoreHover(store);
            }

            // 호버 시 아이콘 생성 (1.4배 확대, 연두색 배경 없음)
            if (store.thumbnail_img) {
              createHoverIcon(store).then(hoverIconConfig => {
                marker.setIcon(hoverIconConfig);
              });
            }
          });

          marker.addListener('mouseout', () => {
            marker.setZIndex(1);

            // 상위 컴포넌트에 호버 해제 정보 전달
            if (onStoreLeave) {
              onStoreLeave();
            }

            // 원래 아이콘으로 복원
            createCustomIcon(store).then(originalIconConfig => {
              marker.setIcon(originalIconConfig);
            });
          });

          markersRef.current.push(marker);
        }).catch(error => {
          console.warn(`Failed to create icon for store: ${store.name}`, error);
          // 기본 아이콘으로 폴백
          const defaultIcon = createDefaultIcon(store);
          const marker = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: mapInstanceRef.current,
            title: store.name,
            icon: defaultIcon
          });

          marker.addListener('click', () => {
            handlePOIClick(store.id);
          });

          markersRef.current.push(marker);
        });
      }
    });
  }, [stores, handlePOIClick]);

  // Google Maps 초기화
  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      try {
        // 환경변수에서 API 키 가져오기
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
          throw new Error('Google Maps API key not found in environment variables');
        }

        // @googlemaps/js-api-loader 사용
        const loader = new Loader({
          apiKey: apiKey,
          version: "weekly",
          libraries: ["places"]
        });

        const { Map } = await loader.importLibrary("maps");

        // DOM 요소가 존재하는지 확인
        if (!mapRef.current) {
          console.warn('Map container not found');
          return;
        }

        // 모바일 감지
        const isMobile = window.innerWidth <= 768;

        // 모바일/데스크톱에 따른 초기 설정
        const initialCenter = isMobile
          ? { lat: 37.567750, lng: 126.996055 } // 모바일 좌표
          : { lat: 37.567836, lng: 126.997402 }; // 데스크톱 좌표

        const initialZoom = isMobile ? 18.3 : 18.8; // 모바일: 17, 데스크톱: 18.5

        // 지도 초기화
        mapInstanceRef.current = new Map(mapRef.current, {
          center: initialCenter,
          zoom: initialZoom,
          mapTypeId: 'roadmap',
          disableDefaultUI: true, // 기본 UI 컨트롤 숨기기 (map/satellite 메뉴바, 줌 컨트롤 등)
          styles: [
            {
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#0057ff"
                }
              ]
            },
            {
              "featureType": "all",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "all",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#f2f2f2"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#d9d9d9"
                }
              ]
            },
            {
              "featureType": "landscape",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "lightness": "75"
                },
                {
                  "hue": "#00ff61"
                }
              ]
            },
            {
              "featureType": "landscape",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "landscape",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#42ff89"
                },
                {
                  "weight": "7.32"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#73fca7"
                },
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "simplified"
                },
                {
                  "hue": "#ffe600"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "weight": "0.83"
                },
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "on"
                },
                {
                  "weight": "5.46"
                },
                {
                  "hue": "#ffde00"
                },
                {
                  "lightness": "-34"
                }
              ]
            },
            {
              "featureType": "transit.station.bus",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]
        });

        // POI 마커 추가
        addMarkers();
      } catch (error) {
        console.error('Google Maps 로딩 실패:', error);
        // 폴백: 정적 이미지 표시
        if (mapRef.current) {
          mapRef.current.style.backgroundImage = 'url(/2Dmap.png)';
          mapRef.current.style.backgroundSize = 'cover';
          mapRef.current.style.backgroundPosition = 'center';
        }
      }
    };

    // DOM이 완전히 마운트된 후 실행
    const timer = setTimeout(() => {
      initMap();
    }, 100);

    return () => clearTimeout(timer);
  }, [addMarkers]);

  // stores가 변경될 때마다 마커 업데이트
  useEffect(() => {
    if (mapInstanceRef.current) {
      addMarkers();
    }
  }, [stores, addMarkers]);

  // 지도 크기 조정
  useEffect(() => {
    if (mapInstanceRef.current) {
      google.maps.event.trigger(mapInstanceRef.current, 'resize');
    }
  }, []);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      try {
        // 마커 정리
        if (markersRef.current) {
          markersRef.current.forEach(marker => {
            if (marker && marker.setMap) {
              marker.setMap(null);
            }
          });
          markersRef.current = [];
        }

        // 지도 인스턴스 정리
        if (mapInstanceRef.current) {
          mapInstanceRef.current = null;
        }

        // 전역 함수 정리
        if (window.initMap) {
          delete window.initMap;
        }
      } catch (error) {
        console.warn('Error during component cleanup:', error);
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
      }}
    />
  );
};