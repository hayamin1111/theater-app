import type { Screening } from '@/types/screening';
import { GENRES, SALES_STATUS, FORMATS } from '@/constants/screenings';
import styles from './index.module.css';

type Props = {
  screenings: Screening[];
  onSelectedScreening: (screening: Screening) => void;
};

const SLOT_MINUTES = 30; //1セルの単位（分）
const START_HOUR = 10; //営業開始時間

/**
 * 開始時刻が何行目かを計算する関数
 * ex.10:30の場合：
 *  totalMinutes = 630
 *  startMinutes = 600
 *  (630 - 600)/30+1 → 2行目
 */
const timeToRow = (time: string) => {
  const [hour, minute] = time.split(':').map(Number); //開始時間を時間と分に分割代入（ex.10:30 → hour=10、 minute=30）
  const totalMinutes = hour * 60 + minute; 
  const startMinutes = START_HOUR * 60;

  return Math.floor((totalMinutes - startMinutes) / SLOT_MINUTES) + 1; // CSSGridでスタイリングするため+1とする
};

export const Timetable = ({ screenings, onSelectedScreening }: Props) => {
  return (
    <div className={styles.timetable}>
      {screenings.map((screening) => {
        const rowStart = timeToRow(screening.startTime);
        const rowEnd = timeToRow(screening.endTime);
        const column = screening.screen + 1; //1列目は上映時間が入るため+1とする

        return (
          <button
            key={screening.id}
            type="button"
            className="screeningCell"
            style={{
              gridColumn: column,
              gridRow: `${rowStart} / ${rowEnd}`,
            }}
            onClick={() => onSelectedScreening(screening)}
          >
            <p>{screening.startTime} - {screening.endTime}</p>
            <h3>{screening.title}</h3>
            <p>{SALES_STATUS[screening.salesStatus]}</p>
            <p>{GENRES[screening.genre]}</p>
            <p>
              {screening.formats
                .map(format => FORMATS[format])
                .join(" / ")
              }
            </p>
          </button>
        );
      })}
    </div>
  );
};
