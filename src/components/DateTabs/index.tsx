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
		<ul className="flex flex-nowrap items-center gap-3 overflow-x-auto pb-1">
			{dates.map((date) => (
				<li key={date} className="list-none">
					<button
						type="button"
						onClick={() => onSelectDate(date)}
						className={`min-w-[128px] rounded-xl border px-5 py-3 text-lg font-black tracking-tight transition ${
							selectedDate === date
								? "border-[#5f9f97] bg-[#5f9f97] text-white"
								: "border-transparent bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
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
