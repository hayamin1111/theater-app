import { FORMATS, GENRES, SALES_STATUS } from "@/constants/screenings";
import type { Screening } from "@/types/screening";

type Props = {
  screenings: Screening[];
  onSelectedScreening: (screening: Screening) => void;
};

const SLOT_MINUTES = 30; //1セルの単位（分）
const START_HOUR = 10; //開店時刻
const END_HOUR = 21; //閉店時刻

// ステータス用クラス
const salesStatusClassName: Record<Screening["salesStatus"], string> = {
  available: "border-transparent bg-transparent text-(--color-cinema-muted)",
  "few-left":
    "border-(--color-cinema-gold) bg-(--color-cinema-gold) text-(--color-cinema-bg)",
  "sold-out":
    "border-(--color-cinema-red) bg-(--color-cinema-red) text-(--color-cinema-ivory)",
};

/**
 * HH:MM形式の時刻文字列を受け取り、時間をグリッド上の行番号に変換
 */
const timeToRow = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const totalMinutes = hour * 60 + minute;
  const startMinutes = START_HOUR * 60;

  return Math.floor((totalMinutes - startMinutes) / SLOT_MINUTES);
};

/**
 * HH:MM形式の開始時刻と終了時刻から、上映時間を分単位でだす
 */
const getDurationMinutes = (startTime: string, endTime: string) => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  return endHour * 60 + endMinute - (startHour * 60 + startMinute);
};

/**
 * タイムテーブルのスクリーン番号行を生成するコンポーネント
 */
const ScreenHeader = () => {
  const screenNums = Array.from({ length: 8 }, (_, index) => index + 1); //連番の入った配列生成

  return (
    <>
      <div
        style={{ gridColumn: 1, gridRow: 1 }}
        className="sticky left-0 z-20 border-b border-(--color-cinema-border) bg-(--color-cinema-card)"
      />
      {screenNums.map((screen) => (
        <div
          key={screen}
          style={{
            gridColumn: screen + 1,
            gridRow: 1,
          }}
          className="flex items-center justify-center border-r border-b border-(--color-cinema-border) bg-(--color-cinema-card) px-3 text-sm font-semibold tracking-wider text-(--color-cinema-gold)"
        >
          <span>スクリーン{screen}</span>
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
  const length = Math.floor((end - start) / SLOT_MINUTES) + 1; // +1： 終了時間の要素分1つ多くする

  return Array.from({ length }, (_, index) => {
    const totalMinutes = start + index * SLOT_MINUTES;
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
          className="sticky left-0 z-20 flex items-start justify-end bg-(--color-cinema-bg) pr-3 pt-1 text-xs font-normal tabular-nums text-(--color-cinema-muted)"
        >
          {
            // 1時間ごとに時間軸を表示させる（2=60/30）
            index % 2 === 0 ? time : ""
          }
        </div>
      ))}
    </>
  );
};

export const Timetable = ({ screenings, onSelectedScreening }: Props) => {
  return (
    <div className="isolate overflow-x-auto bg-(--color-cinema-bg) pb-4">
      <div className="grid min-w-[1916px] grid-cols-[50px_repeat(8,minmax(180px,1fr))] grid-rows-[42px] auto-rows-[80px] bg-(--color-cinema-bg) bg-[linear-gradient(to_bottom,var(--color-cinema-grid)_1px,transparent_1px),linear-gradient(to_right,var(--color-cinema-grid)_1px,transparent_1px)] bg-size-[100%_80px,calc((100%-50px)/8)_100%] bg-position-[50px_42px]">
        <ScreenHeader />
        <TimeAxis />

        {screenings.map((screening) => {
          const rowStart = timeToRow(screening.startTime) + 2; //3行目が開始時間のため+2とする
          const rowEnd = timeToRow(screening.endTime) + 2; // 同上
          const column = screening.screen + 1; //1列目は上映時間が入るため+1とする

          return (
            <button
              key={screening.id}
              type="button"
              className="relative flex h-[calc(100%-2px)] w-[calc(100%-12px)] cursor-pointer flex-col justify-between gap-3 justify-self-center overflow-hidden rounded border border-t-[3px] border-(--color-cinema-border) border-t-(--color-cinema-card-edge) bg-(--color-cinema-card) px-3 py-2 text-left transition-colors hover:z-10 hover:border-(--color-cinema-gold) hover:bg-(--color-cinema-hover) focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-cinema-gold)"
              style={{
                gridColumn: column,
                gridRow: `${rowStart} / ${rowEnd}`,
              }}
              onClick={() => onSelectedScreening(screening)}
            >
              <div className="space-y-1.5">
                <h3 className="wrap-break-word text-base font-semibold leading-6 text-(--color-cinema-ivory)">
                  {screening.title}
                </h3>
                <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                  <span className="text-xs font-normal text-(--color-cinema-muted)">
                    {GENRES[screening.genre]}
                  </span>
                  <span
                    className={`shrink-0 rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold leading-none ${salesStatusClassName[screening.salesStatus]}`}
                  >
                    {SALES_STATUS[screening.salesStatus]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {screening.formats.map((format) => (
                    <span
                      key={format}
                      className="inline-flex items-center rounded-sm border border-(--color-cinema-border) bg-transparent px-1.5 py-0.5 text-[10px] font-medium leading-none text-(--color-cinema-muted)"
                    >
                      {FORMATS[format]}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-end gap-x-1.5 gap-y-1 text-xs font-normal tabular-nums text-(--color-cinema-muted)">
                <span>
                  {screening.startTime} - {screening.endTime}
                </span>
                <span>
                  {getDurationMinutes(screening.startTime, screening.endTime)}分
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
