import { useEffect, useState } from "react";
import { fetchScreenings } from "@/api/screenings";
import { DateTabs } from "@/components/DateTabs";
import { FormatsFilterCheckboxes } from "@/components/FormatsFilterCheckboxes";
import { GenresFilterCheckboxes } from "@/components/GenresFilterCheckboxes";
import { MovieDetailModal } from "@/components/MovieDetailModal";
import { SearchInput } from "@/components/SearchInput";
import { Timetable } from "@/components/Timetable";
import { FORMATS, GENRES } from "@/constants/screenings";
import type { Format, Genre, Screening } from "@/types/screening";

const formatHeadingDate = (date: string) => {
	const [, month, day] = date.split("-");
	return `${Number(month)}月${Number(day)}日`;
};

function App() {
	const [screenings, setScreenings] = useState<Screening[]>([]);
	const [selectedScreening, setSelectedScreening] = useState<Screening | null>(
		null,
	);
	const [selectedDate, setSelectedDate] = useState<string>("");
	const [searchKeyword, setSearchKeyword] = useState<string>("");
	const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
	const [selectedFormats, setSelectedFormats] = useState<Format[]>([]);

	const dates = [
		...new Set(screenings.map((screening) => screening.date)),
	].sort();
	const genres = [
		...new Set(screenings.map((screening) => screening.genre)),
	].sort((left, right) => GENRES[left].localeCompare(GENRES[right], "ja"));
	const formats = [
		...new Set(screenings.flatMap((screening) => screening.formats)),
	].sort((left, right) => FORMATS[left].localeCompare(FORMATS[right], "ja"));

	const filteredScreenings = screenings
		.filter((screening) => screening.date === selectedDate)
		.filter((screening) =>
			screening.title.toLowerCase().includes(searchKeyword.toLowerCase()),
		)
		.filter(
			(screening) =>
				selectedGenres.length === 0 || selectedGenres.includes(screening.genre),
		)
		.filter(
			(screening) =>
				selectedFormats.length === 0 ||
				selectedFormats.some((format) => screening.formats.includes(format)),
		);

	const timetableScreenings = [...filteredScreenings].sort((left, right) => {
		const startCompare = left.startTime.localeCompare(right.startTime);
		if (startCompare !== 0) return startCompare;

		const screenCompare = left.screen - right.screen;
		if (screenCompare !== 0) return screenCompare;

		return left.title.localeCompare(right.title, "ja");
	});

	useEffect(() => {
		const init = async () => {
			const data = await fetchScreenings();
			setScreenings(data);

			const days = [...new Set(data.map((item) => item.date))].sort();
			const firstDay = days[0];
			if (firstDay) {
				setSelectedDate(firstDay);
			}
		};

		init();
	}, []);

	return (
		<div className="min-h-screen bg-[linear-gradient(180deg,#f6f7f5_0%,#eef2ef_48%,#e7ece9_100%)] text-neutral-950">
			<div className="mx-auto flex min-h-screen max-w-[1800px] flex-col px-4 py-6 sm:px-6 lg:px-8">
				<header className="space-y-8">
					<div className="flex items-start justify-between gap-6">
						<div className="space-y-3">
							<h1 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
								上映スケジュール
							</h1>
						</div>
					</div>

					<div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
						<DateTabs
							dates={dates}
							selectedDate={selectedDate}
							onSelectDate={setSelectedDate}
						/>
						<div className="flex flex-1 flex-wrap justify-start gap-3 xl:justify-end">
							<SearchInput
								searchKeyword={searchKeyword}
								onSearchKeyword={setSearchKeyword}
							/>
							<GenresFilterCheckboxes
								genres={genres}
								selectedGenres={selectedGenres}
								onSelectedGenres={setSelectedGenres}
							/>
							<FormatsFilterCheckboxes
								formats={formats}
								selectedFormats={selectedFormats}
								onSelectedFormats={setSelectedFormats}
							/>
						</div>
					</div>

					<div className="flex flex-col gap-2 border-l-4 border-[#5f9f97] pl-4">
						<h2 className="text-2xl font-black tracking-tight sm:text-3xl">
							{selectedDate ? formatHeadingDate(selectedDate) : ""}
						</h2>
					</div>
				</header>

				<main className="mt-8 flex-1">
					<section className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
						<Timetable
							screenings={timetableScreenings}
							onSelectedScreening={setSelectedScreening}
						/>
					</section>
				</main>

				{selectedScreening && (
					<MovieDetailModal
						screening={selectedScreening}
						onClose={() => setSelectedScreening(null)}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
