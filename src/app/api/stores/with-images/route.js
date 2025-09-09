import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';
import { checkAndCompressImage } from '@/utils/imageCompression';

// POST /api/stores/with-images - 이미지와 함께 스토어 생성
export async function POST(request) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const formData = await request.formData();

    // 스토어 데이터 파싱
    const storeDataJson = formData.get('storeData');
    if (!storeDataJson) {
      return NextResponse.json(
        { error: '스토어 데이터가 필요합니다.' },
        { status: 400 }
      );
    }

    const storeData = JSON.parse(storeDataJson);
    const cardImageFile = formData.get('cardImage');
    const thumbnailImageFile = formData.get('thumbnailImage');
    const galleryFiles = formData.getAll('galleryImages');

    // 이미지 업로드 함수
    const uploadImage = async (file, bucket = 'gallery') => {
      if (!file || file.size === 0) return null;

      // 이미지 압축
      const compressedFile = await checkAndCompressImage(file, 1); // 1MB 제한

      // 파일명 생성
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Supabase Storage에 업로드
      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, compressedFile);

      if (uploadError) {
        throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
      }

      // 공개 URL 가져오기
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return {
        url: publicUrl,
        path: filePath,
        name: compressedFile.name,
        size: compressedFile.size
      };
    };

    // 이미지들 업로드
    const [cardImageResult, thumbnailImageResult, galleryResults] = await Promise.all([
      cardImageFile ? uploadImage(cardImageFile) : null,
      thumbnailImageFile ? uploadImage(thumbnailImageFile) : null,
      galleryFiles.length > 0 ? Promise.all(galleryFiles.map(file => uploadImage(file))) : []
    ]);

    // 스토어 데이터에 이미지 URL 추가
    const finalStoreData = {
      ...storeData,
      card_img: cardImageResult?.url || null,
      thumbnail_img: thumbnailImageResult?.url || null,
      gallery: galleryResults
        .filter(result => result !== null)
        .map((result, index) => ({
          image_url: result.url,
          order_num: index + 1
        }))
    };

    // 1. 스토어 기본 정보 생성
    const { data: store, error: storeError } = await supabase
      .from('stores')
      .insert({
        name: finalStoreData.name,
        person: finalStoreData.person,
        description: finalStoreData.description,
        address: finalStoreData.address,
        latitude: finalStoreData.latitude,
        longitude: finalStoreData.longitude,
        close: finalStoreData.close,
        move: finalStoreData.move,
        move_address: finalStoreData.move_address,
        move_latitude: finalStoreData.move_latitude,
        move_longitude: finalStoreData.move_longitude,
        keyword: finalStoreData.keyword || null,
        card_img: finalStoreData.card_img,
        thumbnail_img: finalStoreData.thumbnail_img,
      })
      .select()
      .single();

    if (storeError) {
      console.error('Store creation error:', storeError);
      return NextResponse.json(
        { error: '스토어 생성 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    const storeId = store.id;

    // 2. 연락처 정보 생성
    if (finalStoreData.contacts) {
      const { error: contactsError } = await supabase
        .from('store_contacts')
        .insert({
          store_id: storeId,
          phone: finalStoreData.contacts.phone,
          telephone: finalStoreData.contacts.telephone,
          fax: finalStoreData.contacts.fax,
          email: finalStoreData.contacts.email,
          website: finalStoreData.contacts.website,
        });

      if (contactsError) {
        console.error('Contacts creation error:', contactsError);
        return NextResponse.json(
          { error: '연락처 정보 생성 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }
    }

    // 3. 용량 타입 정보 생성
    if (finalStoreData.capacities && finalStoreData.capacities.length > 0) {
      const capacityInserts = finalStoreData.capacities.map((capacityId) => ({
        store_id: storeId,
        capacity_type_id: capacityId,
      }));

      const { error: capacityError } = await supabase
        .from('store_capacity')
        .insert(capacityInserts);

      if (capacityError) {
        console.error('Capacity creation error:', capacityError);
        return NextResponse.json(
          { error: '용량 타입 정보 생성 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }
    }

    // 4. 업종 타입 정보 생성
    if (finalStoreData.industries && finalStoreData.industries.length > 0) {
      const industryInserts = finalStoreData.industries.map((industryId) => ({
        store_id: storeId,
        industry_type_id: industryId,
      }));

      const { error: industryError } = await supabase
        .from('store_industry')
        .insert(industryInserts);

      if (industryError) {
        console.error('Industry creation error:', industryError);
        return NextResponse.json(
          { error: '업종 타입 정보 생성 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }
    }

    // 5. 재료 타입 정보 생성
    if (finalStoreData.materials && finalStoreData.materials.length > 0) {
      const materialInserts = finalStoreData.materials.map((materialId) => ({
        store_id: storeId,
        material_type_id: materialId,
      }));

      const { error: materialError } = await supabase
        .from('store_material')
        .insert(materialInserts);

      if (materialError) {
        console.error('Material creation error:', materialError);
        return NextResponse.json(
          { error: '재료 타입 정보 생성 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }
    }

    // 6. 갤러리 정보 생성
    if (finalStoreData.gallery && finalStoreData.gallery.length > 0) {
      const galleryInserts = finalStoreData.gallery.map((image, index) => ({
        store_id: storeId,
        image_url: image.image_url,
        order_num: image.order_num || index + 1,
      }));

      const { error: galleryError } = await supabase
        .from('store_gallery')
        .insert(galleryInserts);

      if (galleryError) {
        console.error('Gallery creation error:', galleryError);
        return NextResponse.json(
          { error: '갤러리 정보 생성 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: store,
      images: {
        card: cardImageResult,
        thumbnail: thumbnailImageResult,
        gallery: galleryResults
      }
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
