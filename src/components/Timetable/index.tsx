import type { Screening } from '@/types/screening';
import { GENRES, SALES_STATUS, FORMATS } from '@/constants/screenings';
import styles from './index.module.css';

type Props = {
  screenings: Screening[];
  onSelectedScreening: (screening: Screening) => void;
};

const SLOT_MINUTES = 30; //1セルの単位（分）
const START_HOUR = 10; //開店時刻
const END_HOUR = 23; //閉店時刻

/**
 * 時間から行番号を算出する関数
 * ex.10:30の場合：
 *  totalMinutes = 630
 *  startMinutes = 600
 *  (630 - 600)/30+1 → 2行目
 */
const timeToRow = (time: string) => {
  const [hour, minute] = time.split(':').map(Number); //開始時間を時間と分に分割代入（ex.10:30 → hour=10、 minute=30）
  const totalMinutes = hour * 60 + minute; 
  const startMinutes = START_HOUR * 60;

  return Math.floor((totalMinutes - startMinutes) / SLOT_MINUTES);
};

/**
 * タイムテーブルのスクリーン番号行を生成するコンポーネント
 */
const ScreenHeader = () => {
  const screenNums =  Array.from({ length: 10 }, (_, i) => i + 1); //連番の入った配列生成
  return (
    <>
      {screenNums.map((screen) => (
        <div
          key={screen}
          style={{
            gridColumn: screen + 1,
            gridRow: 1, //1行目固定
          }}
        >
          <span>screen {screen}</span>
        </div>
      ))}
    </>
  );
};


/**
 * タイムテーブルの時刻算出
 * @param startTime 開店時刻
 * @param endTime 閉店時刻
 * @param slot 間隔
 * @returns 間隔ごとの時刻の入った配列 [ "10:00", "10:30", "11:00", ...]
 */
const createTimeSlots = () => {
  const start = START_HOUR * 60;
  const end = END_HOUR * 60;
  const length = Math.floor((end - start) / SLOT_MINUTES) + 1;  // +1： 終了時間の要素分1つ多くする

  return Array.from({ length }, (_, i) => {
    const totalMinutes = start + i * SLOT_MINUTES;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${String(minutes).padStart(2, "0")}`;
  });
};
const timeSlots = createTimeSlots();

/**
 * タイムテーブルの時刻列を生成するコンポーネント
 */
const TimeAxis = () => {
  return (
    <>
      {timeSlots.map((time, index) => (
        <div
          key={time}
          style={{
            gridColumn: 1, //1列目固定
            gridRow: timeToRow(time) + 2,
          }}
        >
          {
            // 1時間ごとに時間軸は表示させる（2=60/30）
            index % 2 === 0 ? time : ""
          } 
        </div>
      ))}
    </>
  );
};

export const Timetable = ({ screenings, onSelectedScreening }: Props) => {
  return (
    <>
      <div className={styles.timetable}>
        <ScreenHeader />
        <TimeAxis />
        
        {screenings.map((screening) => {
          const rowStart = timeToRow(screening.startTime) + 2;//1行目はスクリーンNoが入るため+1とする
          const rowEnd = timeToRow(screening.endTime) + 2; //同上
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
    </>
  );
};
