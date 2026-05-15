'use client';

import { useAllStores } from '@/hooks/useStores';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

function getInitialView() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  return isMobile
    ? { center: [37.56775, 126.996055], zoom: 18.3 }
    : { center: [37.567836, 126.997402], zoom: 18.8 };
}

function createMarkerIcon(fillColor) {
  return L.divIcon({
    className: 'hf-map-marker',
    html: `
      <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="5" r="5" fill="${fillColor}" stroke="#ffffff" stroke-width="1"/>
      </svg>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

const defaultMarkerIcon = createMarkerIcon('#322F18');
const hoverMarkerIcon = createMarkerIcon('#42ff89');

function buildTooltipHtml(store) {
  const hasImage = store.thumbnail_img;

  if (hasImage) {
    return `
      <div style="
        padding: 10px 8px 5px 8px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        color: #333;
        flex-direction: column;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        max-width: 300px;
        position: relative;
        margin-bottom: 15px;
      ">
        <img
          src="${store.thumbnail_img}"
          alt="${store.name}"
          style="
            width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 4px;
            border: 1px solid #eee;
          "
          onerror="this.style.display='none'"
        />
        <div>
          <div style="font-weight: 600; margin-bottom: 4px; font-size: 1rem; text-align: center;">${store.name}</div>
          ${
            store.keyword && Array.isArray(store.keyword) && store.keyword.length > 0
              ? `<div>
                  ${store.keyword
                    .map(
                      (keyword) =>
                        `<span style="font-size: 0.9rem; color: #555; word-break: keep-all;">${keyword}</span>`,
                    )
                    .join(', ')}
                </div>`
              : ''
          }
        </div>
      </div>
    `;
  }

  return `
    <div style="
      padding: 8px 12px 5px 12px;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 600;
      color: #333;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 15px;
      max-width: 300px;
    ">
      <div style="font-weight: 600; margin-bottom: 4px; text-align: center;">${store.name}</div>
      ${
        store.keyword && Array.isArray(store.keyword) && store.keyword.length > 0
          ? `<div style="width: 90%; margin: 0 auto; word-break: keep-all;">
              ${store.keyword
                .map(
                  (keyword) =>
                    `<span style="font-size: 0.9rem; color: #555;">${keyword}</span>`,
                )
                .join(', ')}
            </div>`
          : ''
      }
    </div>
  `;
}

function showStaticMapFallback(container) {
  if (!container) return;
  container.style.backgroundImage = 'url(/2Dmap.png)';
  container.style.backgroundSize = 'cover';
  container.style.backgroundPosition = 'center';
}

export default function Map2D({ onStoreHover, onStoreLeave }) {
  const { stores } = useAllStores();
  const router = useRouter();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const tileLayerRef = useRef(null);

  const handlePOIClick = useCallback(
    (storeId) => {
      router.push(`/store/${storeId}`);
    },
    [router],
  );

  const addMarkers = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map || !stores) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    stores.forEach((store) => {
      const lat = parseFloat(store.latitude);
      const lng = parseFloat(store.longitude);

      if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) return;

      const marker = L.marker([lat, lng], {
        icon: defaultMarkerIcon,
        title: store.name,
      });

      marker.on('click', () => {
        handlePOIClick(store.id);
      });

      marker.on('mouseover', () => {
        marker.setIcon(hoverMarkerIcon);
        marker.setZIndexOffset(1000);
        onStoreHover?.(store);

        marker
          .bindTooltip(buildTooltipHtml(store), {
            permanent: true,
            direction: 'top',
            offset: [0, -15],
            className: 'leaflet-store-tooltip',
            interactive: false,
          })
          .openTooltip();
      });

      marker.on('mouseout', () => {
        marker.setIcon(defaultMarkerIcon);
        marker.setZIndexOffset(0);
        onStoreLeave?.();
        marker.unbindTooltip();
      });

      marker.addTo(map);
      markersRef.current.push(marker);
    });
  }, [stores, handlePOIClick, onStoreHover, onStoreLeave]);

  useEffect(() => {
    let isMounted = true;
    let initTimer = null;

    const initMap = () => {
      if (!mapRef.current || !isMounted || mapInstanceRef.current) return;

      try {
        const { center, zoom } = getInitialView();

        const map = L.map(mapRef.current, {
          center,
          zoom,
          zoomControl: false,
          attributionControl: true,
        });

        tileLayerRef.current = L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 19,
            attribution: OSM_ATTRIBUTION,
          },
        ).addTo(map);

        mapInstanceRef.current = map;

        requestAnimationFrame(() => {
          if (isMounted && mapInstanceRef.current) {
            addMarkers();
            map.invalidateSize();
          }
        });
      } catch (error) {
        console.error('Leaflet 지도 로딩 실패:', error);
        if (mapRef.current && isMounted) {
          showStaticMapFallback(mapRef.current);
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isMounted) {
            initTimer = setTimeout(() => {
              if (isMounted) initMap();
            }, 100);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' },
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    } else {
      initTimer = setTimeout(() => {
        if (mapRef.current && isMounted) {
          observer.observe(mapRef.current);
        }
      }, 100);
    }

    return () => {
      isMounted = false;
      if (initTimer) clearTimeout(initTimer);
      observer.disconnect();
    };
  }, [addMarkers]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      addMarkers();
    }
  }, [stores, addMarkers]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    requestAnimationFrame(() => {
      mapInstanceRef.current?.invalidateSize();
    });
  }, []);

  useEffect(() => {
    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      if (tileLayerRef.current) {
        tileLayerRef.current.remove();
        tileLayerRef.current = null;
      }

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
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
        position: 'relative',
      }}
    />
  );
}
