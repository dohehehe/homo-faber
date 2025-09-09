import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';
import { checkAndCompressImage } from '@/utils/imageCompression';

// POST /api/upload - 이미지 업로드
export async function POST(request) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const formData = await request.formData();
    const file = formData.get('file');
    const bucket = formData.get('bucket') || 'gallery';
    const maxSizeInMB = parseInt(formData.get('maxSizeInMB')) || 1;

    if (!file) {
      return NextResponse.json(
        { error: '파일이 필요합니다.' },
        { status: 400 }
      );
    }

    // 파일 타입 검증
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: '지원하지 않는 파일 형식입니다.' },
        { status: 400 }
      );
    }

    // 파일 크기 검증 (MB 단위)
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return NextResponse.json(
        { error: `파일 크기는 ${maxSizeInMB}MB를 초과할 수 없습니다.` },
        { status: 400 }
      );
    }

    // 이미지 압축 (서버에서 처리)
    const compressedFile = await checkAndCompressImage(file, maxSizeInMB);

    // 파일명 생성
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Supabase Storage에 업로드
    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, compressedFile);

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return NextResponse.json(
        { error: '이미지 업로드 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 업로드된 이미지의 공개 URL 가져오기
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      data: {
        url: publicUrl,
        path: filePath,
        name: compressedFile.name,
        size: compressedFile.size,
        originalSize: file.size
      }
    });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
