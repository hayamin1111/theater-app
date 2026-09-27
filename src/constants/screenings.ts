import type { Screening } from "@/types/screening";

export const GENRES = {
	sf: "SF",
	action: "アクション",
	comedy: "コメディ",
	drama: "ドラマ",
	horror: "ホラー",
	fantasy: "ファンタジー",
	romance: "恋愛",
} as const;

export const FORMATS = {
	subtitled: "字幕",
	dubbed: "吹替",
	"3D": "3D",
	imax: "IMAX",
	"4k": "4K",
} as const;

export const SALES_STATUS = {
	available: "販売中",
	"few-left": "残りわずか",
	"sold-out": "完売",
} as const;

// 定数から型を生成
export type SalesStatus = keyof typeof SALES_STATUS;
export type Genre = keyof typeof GENRES;
export type Format = keyof typeof FORMATS;

// ステータス用クラス
export const SALES_STATUS_CLASS_NAME: Record<Screening["salesStatus"], string> =
	{
		available:
			"bg-(--color-cinema-panel) text-(--color-cinema-muted) border-(--color-cinema-border)",
		"few-left":
			"bg-(--color-cinema-gold) text-(--color-cinema-bg) border-(--color-cinema-gold)",
		"sold-out":
			"bg-(--color-cinema-red) text-(--color-cinema-ivory) border-(--color-cinema-red)",
	};
