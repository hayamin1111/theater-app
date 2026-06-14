import { FORMATS, GENRES, SALES_STATUS } from "@/constants/screenings";
import type { Screening } from "@/types/screening";

type Props = {
	screenings: Screening[];
	onSelectedScreening: (screening: Screening) => void;
};

const SLOT_MINUTES = 30; //1セルの単位（分）
const START_HOUR = 10; //開店時刻
const END_HOUR = 23; //閉店時刻

// ステータス用クラス
const salesStatusClassName: Record<Screening["salesStatus"], string> = {
	available: "bg-neutral-100 text-neutral-700 border-neutral-200",
	"few-left": "bg-[#ea6a2a] text-white",
	"sold-out": "bg-neutral-950 text-white border-neutral-950",
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
	const screenNums = Array.from({ length: 10 }, (_, index) => index + 1); //連番の入った配列生成

	return (
		<>
			<div style={{ gridColumn: 1, gridRow: 1 }} className="bg-neutral-200" />
			{screenNums.map((screen) => (
				<div
					key={screen}
					style={{
						gridColumn: screen + 1,
						gridRow: 1,
					}}
					className="flex items-center justify-center bg-neutral-200 px-2 text-[11px] font-semibold text-neutral-600"
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
					className="flex items-start justify-end bg-white px-2 pt-2 text-[11px] font-medium tabular-nums text-neutral-500 sticky left-0 z-20"
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
		<div className="overflow-scroll bg-neutral-100">
			<div className="min-w-7xl grid grid-cols-[50px_repeat(10,minmax(200px,1fr))] grid-rows-[40px] auto-rows-[70px] gap-px bg-neutral-100">
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
							className="flex h-full w-full flex-col justify-between gap-2 overflow-hidden bg-white p-3 text-left transition focus-visible:outline-none focus:border-[#ea6a2a] focus:ring-2 focus:ring-[#ea6a2a]/20 hover:cursor-pointer hover:border-[#ea6a2a] hover:ring-2 hover:ring-[#ea6a2a]/20 hover:z-10"
							style={{
								gridColumn: column,
								gridRow: `${rowStart} / ${rowEnd}`,
							}}
							onClick={() => onSelectedScreening(screening)}
						>
							<div className="space-y-2">
								<h3 className="wrap-break-word text-[13px] font-semibold leading-5 text-neutral-950">
									{screening.title}
								</h3>
								<div className="flex flex-wrap items-center justify-between gap-3">
									<span className="text-[11px] font-semibold uppercasetext-neutral-500">
										{GENRES[screening.genre]}
									</span>
									<span
										className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold leading-none ${salesStatusClassName[screening.salesStatus]}`}
									>
										{SALES_STATUS[screening.salesStatus]}
									</span>
								</div>
								<div className="flex flex-wrap gap-1">
									{screening.formats.map((format) => (
										<span
											key={format}
											className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-2 py-0.5 text-[10px] font-semibold text-neutral-700"
										>
											{FORMATS[format]}
										</span>
									))}
								</div>
							</div>
							<div className="flex items-end justify-between gap-2 text-[11px] font-medium text-neutral-500">
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
