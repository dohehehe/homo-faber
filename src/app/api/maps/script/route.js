import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Google Maps JavaScript API 스크립트 URL 생성
    const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;

    return NextResponse.json({
      scriptUrl,
      apiKey: apiKey.substring(0, 10) + '...' // 부분적으로만 노출
    });
  } catch (error) {
    console.error('Error generating Maps API URL:', error);
    return NextResponse.json({ error: 'Failed to generate API URL' }, { status: 500 });
  }
}
