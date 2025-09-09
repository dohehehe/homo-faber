import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';

// GET /api/stores/[id] - 특정 스토어 조회
export async function GET(request, { params }) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: '스토어 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('stores')
      .select(`
        *,
        store_contacts(
          phone,
          telephone,
          fax,
          email,
          website
        ),
        store_capacity(
          capacity_types(id, name)
        ),
        store_industry(
          industry_types(id, name)
        ),
        store_material(
          material_types(id, name)
        ),
        store_gallery(
          image_url,
          order_num
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: '스토어를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: '스토어 정보를 불러오는 중 오류가 발생했습니다.' },
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

// PUT /api/stores/[id] - 스토어 업데이트
export async function PUT(request, { params }) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: '스토어 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const {
      name,
      person,
      description,
      address,
      latitude,
      longitude,
      close,
      move,
      move_address,
      move_latitude,
      move_longitude,
      keyword,
      card_img,
      thumbnail_img,
      contacts,
      capacities,
      industries,
      materials,
      gallery
    } = body;

    // 1. 스토어 기본 정보 업데이트
    const { data: store, error: storeError } = await supabase
      .from('stores')
      .update({
        name,
        person,
        description,
        address,
        latitude,
        longitude,
        close,
        move,
        move_address,
        move_latitude,
        move_longitude,
        keyword: keyword || null,
        card_img: card_img || null,
        thumbnail_img: thumbnail_img || null,
      })
      .eq('id', id)
      .select()
      .single();

    if (storeError) {
      console.error('Store update error:', storeError);
      return NextResponse.json(
        { error: '스토어 정보 업데이트 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 2. 연락처 정보 업데이트
    if (contacts) {
      // 기존 연락처 삭제
      await supabase
        .from('store_contacts')
        .delete()
        .eq('store_id', id);

      // 새 연락처 삽입
      const { error: contactsError } = await supabase
        .from('store_contacts')
        .insert({
          store_id: id,
          phone: contacts.phone,
          telephone: contacts.telephone,
          fax: contacts.fax,
          email: contacts.email,
          website: contacts.website,
        });

      if (contactsError) {
        console.error('Contacts update error:', contactsError);
        return NextResponse.json(
          { error: '연락처 정보 업데이트 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }
    }

    // 3. 용량 타입 정보 업데이트
    if (capacities) {
      // 기존 용량 타입 삭제
      await supabase
        .from('store_capacity')
        .delete()
        .eq('store_id', id);

      // 새 용량 타입 삽입
      if (capacities.length > 0) {
        const capacityInserts = capacities.map((capacityId) => ({
          store_id: id,
          capacity_type_id: capacityId,
        }));

        const { error: capacityError } = await supabase
          .from('store_capacity')
          .insert(capacityInserts);

        if (capacityError) {
          console.error('Capacity update error:', capacityError);
          return NextResponse.json(
            { error: '용량 타입 정보 업데이트 중 오류가 발생했습니다.' },
            { status: 500 }
          );
        }
      }
    }

    // 4. 업종 타입 정보 업데이트
    if (industries) {
      // 기존 업종 타입 삭제
      await supabase
        .from('store_industry')
        .delete()
        .eq('store_id', id);

      // 새 업종 타입 삽입
      if (industries.length > 0) {
        const industryInserts = industries.map((industryId) => ({
          store_id: id,
          industry_type_id: industryId,
        }));

        const { error: industryError } = await supabase
          .from('store_industry')
          .insert(industryInserts);

        if (industryError) {
          console.error('Industry update error:', industryError);
          return NextResponse.json(
            { error: '업종 타입 정보 업데이트 중 오류가 발생했습니다.' },
            { status: 500 }
          );
        }
      }
    }

    // 5. 재료 타입 정보 업데이트
    if (materials) {
      // 기존 재료 타입 삭제
      await supabase
        .from('store_material')
        .delete()
        .eq('store_id', id);

      // 새 재료 타입 삽입
      if (materials.length > 0) {
        const materialInserts = materials.map((materialId) => ({
          store_id: id,
          material_type_id: materialId,
        }));

        const { error: materialError } = await supabase
          .from('store_material')
          .insert(materialInserts);

        if (materialError) {
          console.error('Material update error:', materialError);
          return NextResponse.json(
            { error: '재료 타입 정보 업데이트 중 오류가 발생했습니다.' },
            { status: 500 }
          );
        }
      }
    }

    // 6. 갤러리 정보 업데이트
    if (gallery) {
      // 기존 갤러리 삭제
      await supabase
        .from('store_gallery')
        .delete()
        .eq('store_id', id);

      // 새 갤러리 삽입
      if (gallery.length > 0) {
        const galleryInserts = gallery.map((image, index) => ({
          store_id: id,
          image_url: image.image_url,
          order_num: image.order_num || index + 1,
        }));

        const { error: galleryError } = await supabase
          .from('store_gallery')
          .insert(galleryInserts);

        if (galleryError) {
          console.error('Gallery update error:', galleryError);
          return NextResponse.json(
            { error: '갤러리 정보 업데이트 중 오류가 발생했습니다.' },
            { status: 500 }
          );
        }
      }
    }

    return NextResponse.json({ data: store });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE /api/stores/[id] - 스토어 삭제
export async function DELETE(request, { params }) {
  try {
    const supabase = createServerSupabaseClientSimple();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: '스토어 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 관련 데이터 삭제 (외래키 제약조건 때문에 순서 중요)
    // 1. store_gallery 삭제
    const { error: galleryError } = await supabase
      .from('store_gallery')
      .delete()
      .eq('store_id', id);

    if (galleryError) {
      console.error('Gallery deletion error:', galleryError);
      return NextResponse.json(
        { error: '갤러리 정보 삭제 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 2. store_capacity 삭제
    const { error: capacityError } = await supabase
      .from('store_capacity')
      .delete()
      .eq('store_id', id);

    if (capacityError) {
      console.error('Capacity deletion error:', capacityError);
      return NextResponse.json(
        { error: '용량 타입 정보 삭제 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 3. store_industry 삭제
    const { error: industryError } = await supabase
      .from('store_industry')
      .delete()
      .eq('store_id', id);

    if (industryError) {
      console.error('Industry deletion error:', industryError);
      return NextResponse.json(
        { error: '업종 타입 정보 삭제 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 4. store_material 삭제
    const { error: materialError } = await supabase
      .from('store_material')
      .delete()
      .eq('store_id', id);

    if (materialError) {
      console.error('Material deletion error:', materialError);
      return NextResponse.json(
        { error: '재료 타입 정보 삭제 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 5. store_contacts 삭제
    const { error: contactsError } = await supabase
      .from('store_contacts')
      .delete()
      .eq('store_id', id);

    if (contactsError) {
      console.error('Contacts deletion error:', contactsError);
      return NextResponse.json(
        { error: '연락처 정보 삭제 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 6. stores 테이블에서 삭제
    const { error: storeError } = await supabase
      .from('stores')
      .delete()
      .eq('id', id);

    if (storeError) {
      console.error('Store deletion error:', storeError);
      return NextResponse.json(
        { error: '스토어 삭제 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
