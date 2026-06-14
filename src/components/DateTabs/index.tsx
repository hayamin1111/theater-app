type Props = {
	dates: string[];
	selectedDate: string;
	onSelectDate: (date: string) => void;
};

const formatDateLabel = (date: string) => {
	const [, month, day] = date.split("-");
	return `${Number(month)} / ${Number(day)}`;
};

export const DateTabs = ({ dates, selectedDate, onSelectDate }: Props) => {
	return (
		<ul className="flex flex-nowrap flex-1 items-center gap-3">
			{dates.map((date) => (
				<li key={date} className="flex-1 list-none max-w-50">
					<button
						type="button"
						onClick={() => onSelectDate(date)}
						className={`w-full rounded-md border px-2 py-2 leading-none text-lg font-semibold tracking-tight transition hover:cursor-pointer ${
							selectedDate === date
								? "border-[#ea6a2a] bg-[#ea6a2a] text-white"
								: "border-transparent bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
						}`}
						aria-pressed={selectedDate === date}
					>
						{formatDateLabel(date)}
					</button>
				</li>
			))}
		</ul>
	);
};
