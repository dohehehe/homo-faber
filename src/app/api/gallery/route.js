import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';

// GET /api/gallery - 모든 갤러리 이미지 조회
export async function GET(request) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get('store_id');
    const type = searchParams.get('type'); // 'admin' 또는 'public'
    const page = parseInt(searchParams.get('page')) || 0;
    const limit = parseInt(searchParams.get('limit')) || 8;

    if (type === 'public') {
      // Public gallery - Storage에서 직접 이미지 목록 가져오기
      const offset = page * limit;

      const { data: files, error: listError } = await supabase.storage
        .from('gallery')
        .list('', {
          limit: limit,
          offset: offset,
        });

      if (listError) {
        console.error('Storage error:', listError);
        return NextResponse.json(
          { error: '갤러리 이미지를 불러오는 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }

      // 각 파일에 대해 public URL 생성
      const imagesWithUrls = (files || [])
        .filter(file => {
          // 이미지 파일만 필터링
          const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
          return imageExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
        })
        .map(file => {
          const { data: { publicUrl } } = supabase.storage
            .from('gallery')
            .getPublicUrl(file.name);

          return {
            id: file.id,
            name: file.name,
            publicUrl,
            created_at: file.created_at,
            updated_at: file.updated_at
          };
        });

      // 더 이상 로드할 이미지가 없는지 확인
      const hasMore = imagesWithUrls.length === limit;

      return NextResponse.json({
        data: imagesWithUrls,
        hasMore,
        page,
        limit
      });
    } else {
      // Admin gallery - 데이터베이스에서 조회
      let query = supabase
        .from('store_gallery')
        .select(`
          *,
          stores(
            id,
            name,
            person
          )
        `)
        .order('order_num', { ascending: true });

      // 특정 스토어의 갤러리만 조회하는 경우
      if (storeId) {
        query = query.eq('store_id', storeId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json(
          { error: '갤러리 이미지를 불러오는 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }

      return NextResponse.json({ data: data || [] });
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST /api/gallery - 갤러리 이미지 생성
export async function POST(request) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const body = await request.json();

    const { store_id, image_url, order_num } = body;

    // 입력 검증
    if (!store_id || !image_url) {
      return NextResponse.json(
        { error: '스토어 ID와 이미지 URL은 필수입니다.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('store_gallery')
      .insert([
        {
          store_id,
          image_url,
          order_num: order_num || 1
        }
      ])
      .select(`
        *,
        stores(
          id,
          name,
          person
        )
      `)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '갤러리 이미지 생성 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
