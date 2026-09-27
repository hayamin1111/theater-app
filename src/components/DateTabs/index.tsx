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
		<ul className="flex min-w-0 flex-wrap items-center gap-2.5 lg:pr-[390px]">
			{dates.map((date) => (
				<li key={date} className="list-none">
					<button
						type="button"
						onClick={() => onSelectDate(date)}
						className={`min-w-22 cursor-pointer rounded-md border px-5 py-3 text-base font-semibold leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-cinema-gold) sm:min-w-28 sm:text-lg ${
							selectedDate === date
								? "border-(--color-cinema-red) bg-(--color-cinema-red) text-(--color-cinema-ivory)"
								: "border-transparent bg-(--color-cinema-card) text-(--color-cinema-muted) hover:border-(--color-cinema-gold) hover:text-(--color-cinema-ivory)"
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
