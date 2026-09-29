export const KEYWORD_KINDS = {
  material: {
    table: 'material_types',
    junction: 'store_material',
    foreignKey: 'material_type_id',
  },
  category: {
    table: 'category_types',
    junction: 'store_category',
    foreignKey: 'category_type_id',
  },
};

export function getKeywordKind(kind) {
  return KEYWORD_KINDS[kind] || null;
}
