import { FORMATS, GENRES, SALES_STATUS } from "@/constants/screenings";
import type { Screening } from "@/types/screening";

type Props = {
	screenings: Screening[];
	onSelectedScreening: (screening: Screening) => void;
};

const SLOT_MINUTES = 30;
const START_HOUR = 10;
const END_HOUR = 23;

const salesStatusClassName: Record<Screening["salesStatus"], string> = {
	available: "bg-neutral-100 text-neutral-700 border-neutral-200",
	"few-left": "bg-[#5f9f97]/10 text-[#5f9f97] border-[#5f9f97]/20",
	"sold-out": "bg-neutral-900 text-white border-neutral-900",
};

const timeToRow = (time: string) => {
	const [hour, minute] = time.split(":").map(Number);
	const totalMinutes = hour * 60 + minute;
	const startMinutes = START_HOUR * 60;

	return Math.floor((totalMinutes - startMinutes) / SLOT_MINUTES);
};

const getDurationMinutes = (startTime: string, endTime: string) => {
	const [startHour, startMinute] = startTime.split(":").map(Number);
	const [endHour, endMinute] = endTime.split(":").map(Number);

	return endHour * 60 + endMinute - (startHour * 60 + startMinute);
};

const ScreenHeader = () => {
	const screenNums = Array.from({ length: 10 }, (_, index) => index + 1);

	return (
		<>
			<div style={{ gridColumn: 1, gridRow: 1 }} className="bg-neutral-100" />
			{screenNums.map((screen) => (
				<div
					key={screen}
					style={{
						gridColumn: screen + 1,
						gridRow: 1,
					}}
					className="flex items-center justify-center bg-neutral-100 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600"
				>
					<span>第{screen}会場</span>
				</div>
			))}
		</>
	);
};

const createTimeSlots = () => {
	const start = START_HOUR * 60;
	const end = END_HOUR * 60;
	const length = Math.floor((end - start) / SLOT_MINUTES) + 1;

	return Array.from({ length }, (_, index) => {
		const totalMinutes = start + index * SLOT_MINUTES;
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hours}:${String(minutes).padStart(2, "0")}`;
	});
};

const timeSlots = createTimeSlots();

const TimeAxis = () => {
	return (
		<>
			{timeSlots.map((time, index) => (
				<div
					key={time}
					style={{
						gridColumn: 1,
						gridRow: timeToRow(time) + 2,
					}}
					className="flex items-start justify-end bg-white px-2 pt-2 text-[11px] font-medium tabular-nums text-neutral-500"
				>
					{index % 2 === 0 ? time : ""}
				</div>
			))}
		</>
	);
};

export const Timetable = ({ screenings, onSelectedScreening }: Props) => {
	return (
		<div className="min-w-[1280px] overflow-visible bg-neutral-200">
			<div className="grid grid-cols-[80px_repeat(10,minmax(200px,1fr))] auto-rows-[50px] gap-px bg-neutral-200">
				<ScreenHeader />
				<TimeAxis />

				{screenings.map((screening) => {
					const rowStart = timeToRow(screening.startTime) + 2;
					const rowEnd = timeToRow(screening.endTime) + 2;
					const column = screening.screen + 1;

					return (
						<button
							key={screening.id}
							type="button"
							className="flex h-full w-full flex-col justify-between gap-2 overflow-hidden bg-white p-3 text-left transition hover:text-[#5f9f97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5f9f97]"
							style={{
								gridColumn: column,
								gridRow: `${rowStart} / ${rowEnd}`,
							}}
							onClick={() => onSelectedScreening(screening)}
						>
							<div className="space-y-2">
								<div className="flex flex-wrap items-start justify-between gap-2">
									<h3 className="break-words text-[13px] font-semibold leading-5 text-neutral-950">
										{screening.title}
									</h3>
									<span
										className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold leading-none ${salesStatusClassName[screening.salesStatus]}`}
									>
										{SALES_STATUS[screening.salesStatus]}
									</span>
								</div>
								<p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
									{GENRES[screening.genre]}
								</p>
								<div className="flex flex-wrap gap-1.5">
									{screening.formats.map((format) => (
										<span
											key={format}
											className="inline-flex items-center rounded-full border border-neutral-300 bg-[#f3f7f5] px-2 py-0.5 text-[10px] font-semibold text-neutral-700"
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
