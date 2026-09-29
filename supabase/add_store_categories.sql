-- 제품개발/부품제조 (category_types) + 공정 (material_types)
-- Supabase Dashboard → SQL Editor 에 붙여넣고 Run

create table if not exists public.category_types (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

create table if not exists public.store_category (
  store_id uuid not null references public.stores(id) on delete cascade,
  category_type_id uuid not null references public.category_types(id) on delete cascade,
  primary key (store_id, category_type_id)
);

create index if not exists store_category_store_id_idx
  on public.store_category (store_id);

-- 기존 카테고리명을 새 이름으로 매핑
update public.category_types set name = '원스톱 실험기구' where name = '실험기구';
update public.category_types set name = '의료기구' where name in ('의료기기');
update public.category_types set name = '인테리어/가구' where name in ('인테리어 및 가구');
update public.category_types set name = '예술작품/무대' where name in ('예술작품');
update public.category_types set name = '소량 부품' where name in ('소량부품');
update public.category_types set name = '학생 작품' where name in ('학생작품');

insert into public.category_types (name)
values
  ('원스톱 실험기구'),
  ('의료기구'),
  ('인테리어/가구'),
  ('예술작품/무대'),
  ('조명, 카메라'),
  ('뱃지'),
  ('소량 부품'),
  ('학생 작품'),
  ('각종 수리')
on conflict (name) do nothing;

delete from public.category_types
where name not in (
  '원스톱 실험기구',
  '의료기구',
  '인테리어/가구',
  '예술작품/무대',
  '조명, 카메라',
  '뱃지',
  '소량 부품',
  '학생 작품',
  '각종 수리'
);

insert into public.material_types (name)
select v.name
from (
  values
    ('절단/절곡'),
    ('밀링/선반'),
    ('CNC'),
    ('금형'),
    ('후렉숀'),
    ('파워프레스'),
    ('시보리'),
    ('목형'),
    ('주물'),
    ('용접'),
    ('빠우'),
    ('분채'),
    ('조각')
) as v(name)
where not exists (
  select 1 from public.material_types m where m.name = v.name
);
