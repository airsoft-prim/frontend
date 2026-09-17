/**
 * Палитры Mantine, собранные из базовых значений docs/DESIGN.md.
 *
 * Правило построения: базовый цвет из DESIGN.md стоит ровно в слоте 6 —
 * это primary shade для кнопок и бейджей в обеих схемах, поэтому «Field Olive»
 * остаётся главным действием и в Dark Field, и в Sand Field.
 * Светлый конец шкалы (0–5) уходит в тёплые подложки, тёмный (7–9) —
 * в насыщенный текст и состояния.
 *
 * Палитры `dark` и `gray` — это не «просто серые»: Mantine использует их
 * как нейтральную основу темы (поверхности, границы, подписи), поэтому они
 * переопределены поверхностями и типографикой соответствующей схемы.
 */

export type MantinePalette = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

/** #6B7D3A — основной бренд: действия, активная навигация, выделение */
export const field: MantinePalette = [
  '#F6F7F2',
  '#EBEEE2',
  '#D9E0C7',
  '#C6D2A8',
  '#B4C487',
  '#96AF52',
  '#6B7D3A',
  '#576630',
  '#444F26',
  '#2F371A',
];

/** #B89B62 — команды, категории, вторичные акценты */
export const sand: MantinePalette = [
  '#F7F6F2',
  '#EEEAE2',
  '#E0D8C7',
  '#D2C4A7',
  '#C5B086',
  '#BFA673',
  '#B89B62',
  '#AB8C4E',
  '#937944',
  /* Слот 9 — текст на тонированной подложке; у песочного цвета он
   * углублён сильнее остальных, иначе светлый бейдж не набирает 4.5:1 */
  '#6B5730',
];

/** #C96A3D — события, CQB, редкие важные призывы к действию */
export const rust: MantinePalette = [
  '#F8F4F1',
  '#F1E5DF',
  '#E7CDC1',
  '#DDB19D',
  '#D59576',
  '#D17F58',
  '#C96A3D',
  '#B25C32',
  '#974F2C',
  '#7B4125',
];

/** #4F7C91 — информация, локации, нейтральные пояснения */
export const steel: MantinePalette = [
  '#F3F5F7',
  '#E3EAED',
  '#CAD7DE',
  '#ACC3CD',
  '#8DAFBE',
  '#6997AD',
  '#4F7C91',
  '#446A7B',
  '#385765',
  '#2C434E',
];

/** #4E8B57 — открытые наборы, активные игры, успешные операции */
export const success: MantinePalette = [
  '#F3F7F4',
  '#E4EDE5',
  '#CADDCD',
  '#ADCDB1',
  '#8EBD95',
  '#68AA72',
  '#4E8B57',
  '#42764A',
  '#37603D',
  '#2A492F',
];

/** #C99832 — предупреждения, ограниченная доступность */
export const warning: MantinePalette = [
  '#F9F6F1',
  '#F2EBDE',
  '#E8DBBF',
  '#DFC99A',
  '#D8B773',
  '#D3A950',
  '#C99832',
  '#AE842C',
  '#926F26',
  '#755920',
];

/** #B85450 — ошибки и отмены. Не используется как декор */
export const danger: MantinePalette = [
  '#F7F2F2',
  '#EFE2E1',
  '#E2C6C5',
  '#D5A6A5',
  '#C98582',
  '#C26B68',
  '#B85450',
  '#A44743',
  '#8B3D3A',
  '#723330',
];

/**
 * Dark Field: нейтральная шкала Mantine переставлена на поверхности и текст
 * тёмной схемы — так компоненты Mantine получают нужные токены без хаков.
 * 0–3 — текст, 4 — границы, 5–6 — поверхности, 7 — фон приложения.
 */
export const darkField: MantinePalette = [
  '#E8E6DF',
  '#C4C8BD',
  '#A8ADA2',
  '#737A70',
  '#3A4136',
  '#30362D',
  '#20241F',
  '#171A17',
  '#141714',
  '#101210',
];

/**
 * Sand Field: та же роль для светлой схемы.
 * 0 — поверхность, 1 — ховер, 3–4 — границы, 5–6 — служебный текст, 8 — основной текст.
 */
export const sandField: MantinePalette = [
  '#F5F3EB',
  '#ECEADF',
  '#E9E7DE',
  '#D9D6C9',
  '#D4D1C5',
  '#85887F',
  '#5E6259',
  '#3C4038',
  '#252820',
  '#1A1D16',
];

export const colors = {
  field,
  sand,
  rust,
  steel,
  success,
  warning,
  danger,
  dark: darkField,
  gray: sandField,
};

/** Цвета, для которых в тёмной схеме нужен собственный вариант «light» */
export const BRAND_COLOR_NAMES = [
  'field',
  'sand',
  'rust',
  'steel',
  'success',
  'warning',
  'danger',
] as const;
