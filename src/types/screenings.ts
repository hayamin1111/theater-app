// 上映映画1つの型定義
export type Screening = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  genre: Genre;
  rating: Rating;
  screen: number;
  format: Format[];
  description: string;
  salesStatus: SalesStatus;
  thumbnail: string;
};


// ジャンル、レーティング、フォーマット、販売状況の型定義
type Genre = 
  | "sf"
  | "mystery"
  | "animation"
  | "drama"
  | "documentary";

type Rating =
  | "G"
  | "PG12"
  | "R15+"
  | "R18+";

type Format =
  | "subtitled"
  | "dubbed"
  | "4k"
  | "talk-event";

type SalesStatus =
  | "on-sale"
  | "sold-out"
  | "coming-soon";
