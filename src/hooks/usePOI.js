import { useEffect, useRef } from 'react';

export function usePOI(stores, onPOIClick) {
  const initializedRef = useRef(false);
  const onPOIClickRef = useRef(onPOIClick);
  onPOIClickRef.current = onPOIClick;

  useEffect(() => {
    let currentLayer = null;
    let detachClickHandler = null;

    // 기존 레이어가 있는지 확인하고 제거
    const cleanupExistingLayer = () => {
      try {
        // 레이어 리스트에서 모든 레이어를 확인
        const layerList = Module.getObjectLayerList();
        if (layerList && layerList.getLayerCount) {
          const layerCount = layerList.getLayerCount();
          for (let i = 0; i < layerCount; i++) {
            const layer = layerList.getLayer(i);
            if (layer && layer.getName && layer.getName() === 'STORE_POI_LAYER') {
              layerList.removeLayer(layer);
              console.log('기존 POI 레이어 제거됨');
              break;
            }
          }
        }
      } catch (error) {
        console.warn('기존 레이어 제거 실패:', error);
      }
    };

    // Module이 준비될 때까지 기다리는 함수
    const waitForModule = () => {
      if (typeof Module === 'undefined' || !Module.JSLayerList) {
        setTimeout(waitForModule, 100);
        return;
      }

      // StrictMode 등으로 이펙트가 두 번 호출되는 상황 방지
      if (initializedRef.current) {
        return;
      }
      initializedRef.current = true;

      cleanupExistingLayer();
      createPOIs();
    };

    const createPOIs = () => {
      if (!stores || !Array.isArray(stores) || stores.length === 0) {
        return;
      }

      try {
        // POI 레이어 생성
        const layerList = new Module.JSLayerList(true);
        const layer = layerList.createLayer(
          'STORE_POI_LAYER',
          Module.ELT_3DPOINT,
        );
        currentLayer = layer;

        const SIZE_OPTIONS = [120, 150, 180, 200];
        const LINE_HEIGHT_OPTIONS = [10, 20, 30, 40];
        const LINE_COLOR = new Module.JSColor(255, 255, 255);

        // 그림자 설정
        const SHADOW_COLOR = 'rgba(182, 182, 182, 0.54)';
        const SHADOW_BLUR = 10;
        const SHADOW_OFFSET_X = 1;
        const SHADOW_OFFSET_Y = 2;
        const PADDING =
          SHADOW_BLUR + Math.max(SHADOW_OFFSET_X, SHADOW_OFFSET_Y);

        console.log(`POI 생성 시작: ${stores.length}개`);

        // stores 처리
        stores.forEach((store, index) => {
          if (!store.latitude || !store.longitude) return;

          const poi = Module.createPoint(`store_${store.id || index}`);
          poi.setPosition(
            new Module.JSVector3D(
              Number(store.longitude),
              Number(store.latitude),
              20,
            ),
          );

          const randomMaxSize =
            SIZE_OPTIONS[Math.floor(Math.random() * SIZE_OPTIONS.length)];
          const randomLineHeight =
            LINE_HEIGHT_OPTIONS[
            Math.floor(Math.random() * LINE_HEIGHT_OPTIONS.length)
            ];

          // 캔버스 텍스트 렌더링에 사용할 폰트 준비
          const ensureFontsReady = () => (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
          const getCanvasFont = (sizePx = 13, weight = 400) => {
            const bodyStyle = getComputedStyle(document.body);
            const rootStyle = getComputedStyle(document.documentElement);
            let family = (bodyStyle.getPropertyValue('--font-gothic') || '').trim();
            if (!family) {
              family = (rootStyle.getPropertyValue('--font-gothic') || '').trim();
            }
            // If variable is still empty, fall back to body's font-family stack
            if (!family) {
              family = bodyStyle.fontFamily || 'system-ui,-apple-system,sans-serif';
            }
            // Ensure names with spaces are quoted if not already
            const needsQuoting = family && !family.includes('"') && /[A-Za-z]\s+[A-Za-z]/.test(family.split(',')[0]);
            const normalizedFamily = needsQuoting ? `"${family}"` : family;
            return `${weight} ${sizePx}px ${normalizedFamily}`;
          };

          if (store.thumbnail_img) {
            const img = new Image();
            img.crossOrigin = 'anonymous';

            img.onload = function () {
              (async () => {
                try {
                  await ensureFontsReady();

                  const originalWidth = this.width;
                  const originalHeight = this.height;

                  const ratio = Math.min(
                    randomMaxSize / originalWidth,
                    randomMaxSize / originalHeight,
                  );

                  const newWidth = Math.round(originalWidth * ratio);
                  const newHeight = Math.round(originalHeight * ratio);

                  const fontSpec = getCanvasFont(13, 400);

                  // 먼저 텍스트 치수를 계산
                  const measureCanvas = document.createElement('canvas');
                  const measureCtx = measureCanvas.getContext('2d');
                  measureCtx.font = fontSpec;
                  const label = store.name || '';
                  const metrics = measureCtx.measureText(label);
                  const textWidth = Math.ceil(metrics.width);
                  const textHeight = Math.ceil(
                    (metrics.actualBoundingBoxAscent || 12) + (metrics.actualBoundingBoxDescent || 4),
                  );
                  const TEXT_GAP = 8;

                  // 캔버스 크기 계산 (이미지+텍스트)
                  const contentWidth = Math.max(newWidth, textWidth);
                  const contentHeight = newHeight + TEXT_GAP + textHeight;

                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');
                  canvas.width = contentWidth + PADDING * 2;
                  canvas.height = contentHeight + PADDING * 2;

                  // 이미지 그림자
                  ctx.shadowColor = SHADOW_COLOR;
                  ctx.shadowBlur = SHADOW_BLUR;
                  ctx.shadowOffsetX = SHADOW_OFFSET_X;
                  ctx.shadowOffsetY = SHADOW_OFFSET_Y;

                  // 이미지 그리기 (가로 중앙 정렬)
                  const imgX = PADDING + Math.round((contentWidth - newWidth) / 2);
                  const imgY = PADDING;
                  ctx.drawImage(img, imgX, imgY, newWidth, newHeight);

                  // 텍스트는 그림자 없이 선명하게
                  ctx.shadowColor = 'transparent';
                  ctx.shadowBlur = 0;
                  ctx.shadowOffsetX = 0;
                  ctx.shadowOffsetY = 0;

                  ctx.font = fontSpec;
                  ctx.fillStyle = 'white';
                  ctx.textBaseline = 'top';

                  const textX = PADDING + Math.round((contentWidth - textWidth) / 2);
                  const textY = PADDING + newHeight + TEXT_GAP;
                  ctx.fillText(label, textX, textY);

                  poi.setImage(
                    ctx.getImageData(0, 0, canvas.width, canvas.height).data,
                    canvas.width,
                    canvas.height,
                  );
                  poi.setPositionLine(randomLineHeight, LINE_COLOR);
                  layer.addObject(poi, 0);
                } catch (error) {
                  console.warn(`이미지 POI 실패: ${store.name}`, error);
                }
              })();
            };

            img.onerror = function () {
              // 이미지 실패 시 텍스트만
              (async () => {
                try {
                  await ensureFontsReady();
                  const label = store.name || '';
                  const fontSpec = getCanvasFont(12, 600);

                  const measureCanvas = document.createElement('canvas');
                  const measureCtx = measureCanvas.getContext('2d');
                  measureCtx.font = fontSpec;
                  const metrics = measureCtx.measureText(label);
                  const textWidth = Math.ceil(metrics.width);
                  const textHeight = Math.ceil(
                    (metrics.actualBoundingBoxAscent || 12) + (metrics.actualBoundingBoxDescent || 4),
                  );

                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');
                  canvas.width = textWidth + PADDING * 2;
                  canvas.height = textHeight + PADDING * 2;

                  ctx.font = fontSpec;
                  ctx.fillStyle = 'white';
                  ctx.textBaseline = 'top';
                  ctx.fillText(label, PADDING, PADDING);

                  poi.setImage(
                    ctx.getImageData(0, 0, canvas.width, canvas.height).data,
                    canvas.width,
                    canvas.height,
                  );
                  poi.setPositionLine(randomLineHeight, LINE_COLOR);
                  layer.addObject(poi, 0);
                } catch (error) {
                  console.warn(`텍스트 POI 실패: ${store.name}`, error);
                }
              })();
            };

            img.src = store.thumbnail_img;
          } else {
            // 텍스트만
            (async () => {
              try {
                await ensureFontsReady();
                const label = store.name || '';
                const fontSpec = getCanvasFont(16, 600);

                const measureCanvas = document.createElement('canvas');
                const measureCtx = measureCanvas.getContext('2d');
                measureCtx.font = fontSpec;
                const metrics = measureCtx.measureText(label);
                const textWidth = Math.ceil(metrics.width);
                const textHeight = Math.ceil(
                  (metrics.actualBoundingBoxAscent || 12) + (metrics.actualBoundingBoxDescent || 4),
                );

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = textWidth + PADDING * 2;
                canvas.height = textHeight + PADDING * 2;

                ctx.font = fontSpec;
                ctx.fillStyle = '#111';
                ctx.textBaseline = 'top';
                ctx.fillText(label, PADDING, PADDING);

                poi.setImage(
                  ctx.getImageData(0, 0, canvas.width, canvas.height).data,
                  canvas.width,
                  canvas.height,
                );
                poi.setPositionLine(randomLineHeight, LINE_COLOR);
                layer.addObject(poi, 0);
              } catch (error) {
                console.warn(`텍스트 POI 실패: ${store.name}`, error);
              }
            })();
          }
        });

        console.log('POI 생성 완료');

        // POI 클릭 이벤트 설정
        setupPOIClickHandler(layer);
      } catch (error) {
        console.error('POI 생성 실패:', error);
      }
    };

    const setupPOIClickHandler = (layer) => {
      if (!layer || !onPOIClickRef.current) return;

      const mapElement = document.getElementById('map3D');
      if (!mapElement) return;

      const handler = (e) => {
        const rect = mapElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // POI 픽킹
        const pick = layer.pick(x, y);

        if (pick && pick.objectKey) {
          const object = layer.keyAtObject(pick.objectKey);
          if (object && object.getId) {
            const poiId = object.getId();
            // store_<id> 형태에서 id 추출
            const storeId = poiId.replace('store_', '');

            // 클릭 이벤트 전파 중지 (맵 클릭 핸들러 방지)
            e.stopPropagation();

            // POI 클릭 콜백 호출
            onPOIClickRef.current && onPOIClickRef.current(storeId);
          }
        }
      };

      mapElement.addEventListener('click', handler);
      detachClickHandler = () => {
        try {
          mapElement.removeEventListener('click', handler);
        } catch (_) { }
      };
    };

    // stores가 있으면 Module 기다리기 시작
    if (stores && stores.length > 0) {
      waitForModule();
    }

    // cleanup 함수 반환
    return () => {
      try {
        if (detachClickHandler) {
          detachClickHandler();
        }
        if (currentLayer) {
          const layerList = Module.getObjectLayerList();
          if (layerList && layerList.removeLayer) {
            layerList.removeLayer(currentLayer);
            console.log('POI 레이어 정리됨');
          }
        }
      } catch (error) {
        console.warn('POI 레이어 정리 실패:', error);
      }
      initializedRef.current = false;
    };
  }, [stores]);
}