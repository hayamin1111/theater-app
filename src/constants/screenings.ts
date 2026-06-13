
export const GENRES = {
  "sf": "SF",
  "action": "アクション",
  "comedy": "コメディ",
  "drama": "ドラマ",
  "horror": "ホラー",
  "fantasy": "ファンタジー",
  "romance": "恋愛",
} as const;

export const FORMATS = {
  "subtitled": "字幕",
  "dubbed": "吹替",
  "3D": "3D",
  "imax": "IMAX",
  "4k": "4K",
} as const;

export const SALES_STATUS = {
  "available": "販売中",
  "few-left": "残りわずか",
  "sold-out": "完売",
} as const;

// 定数から型を生成
export type SalesStatus = keyof typeof SALES_STATUS;
export type Genre = keyof typeof GENRES;
export type Format = keyof typeof FORMATS;
