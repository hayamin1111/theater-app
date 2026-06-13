// 定数から生成した型をimport
import type {
  SalesStatus,
  Genre,
  Formats,
} from '@/constants/screenings';

export type { SalesStatus, Genre, Formats };

// レーティングの型定義
type Rating =
  | "G"
  | "PG12"
  | "R15+"
  | "R18+";

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
  formats: Formats[];
  description: string;
  salesStatus: SalesStatus;
  thumbnail: string;
};
