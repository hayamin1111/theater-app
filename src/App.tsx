import { useEffect, useState } from "react";
import { fetchScreenings } from "@/api/screenings";
import { DateTabs } from "@/components/DateTabs";
import { FormatsFilterCheckboxes } from "@/components/FormatsFilterCheckboxes";
import { GenresFilterCheckboxes } from "@/components/GenresFilterCheckboxes";
import { MovieDetailModal } from "@/components/MovieDetailModal";
import { SearchInput } from "@/components/SearchInput";
import { Timetable } from "@/components/Timetable";
import type { Format, Genre, Screening } from "@/types/screening";

const formatHeadingDate = (date: string) => {
	const [, month, day] = date.split("-");
	return `${Number(month)}月${Number(day)}日`;
};

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [screenings, setScreenings] = useState<Screening[]>([]);
	const [selectedScreening, setSelectedScreening] = useState<Screening | null>(
		null,
	);
	const [selectedDate, setSelectedDate] = useState<string>("");
	const [searchKeyword, setSearchKeyword] = useState<string>("");
	const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
	const [selectedFormats, setSelectedFormats] = useState<Format[]>([]);

	const dates = [...new Set(screenings.map((screening) => screening.date))]; //重複をなくした日付
	const genres = [...new Set(screenings.map((screening) => screening.genre))]; //重複をなくしたジャンル
	const formats = [
		...new Set(screenings.flatMap((screening) => screening.formats)),
	]; //重複をなくした上映形式

	// フィルタリング
	const filteredScreenings = screenings
		.filter((screening) => screening.date === selectedDate) // 日付
		.filter((screening) =>
			screening.title.toLowerCase().includes(searchKeyword.toLowerCase()),
		) //文字列検索
		.filter(
			(screening) =>
				selectedGenres.length === 0 || selectedGenres.includes(screening.genre),
		) // ジャンル（or検索）。選択なしで全件表示。
		.filter(
			(screening) =>
				selectedFormats.length === 0 ||
				selectedFormats.some((format) => screening.formats.includes(format)),
		); // 上映形式（or検索）。複数選択可。選択なしで全件表示。

	/**
	 * 初回レンダリング
	 */
	useEffect(() => {
		const init = async () => {
			try {
				// fetchScreeningsでjsonをstateに入れる
				const data = await fetchScreenings();
				setScreenings(data);

				// 生dataから日付を取得し昇順にソート
				const days = [...new Set(data.map((item) => item.date))].sort();
				const firstDay = days[0];

				// 上映初日を取得しstateに入れる
				if (firstDay) {
					setSelectedDate(firstDay);
				}
			} catch {
				setError("上映スケジュールの取得に失敗しました");
			} finally {
				//ローディング用
				setIsLoading(false);
			}
		};

		init();
	}, []);

	//エラー
	if (error) {
		return (
			<main className="min-h-screen">
				<p className="m-6">{error}</p>
			</main>
		);
	}

	//データ取得中は本体を描画しない
	if (isLoading) {
		return (
			<main className="min-h-screen">
				<p className="m-6">上映スケジュールを読み込んでいます</p>
			</main>
		);
	}

	return (
		<div className="mx-auto flex min-h-screen max-w-[1800px] flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-12 text-neutral-950">
			<header className="space-y-8 xl:space-y-10">
				<h1 className="flex flex-row-reverse justify-end items-center gap-1 text-2xl font-black sm:text-3xl lg:text-4xl">
					上映スケジュール <img src="/images/icon.svg" className="w-9 sm:w-10 lg:w-12" alt="" />
				</h1>

				<div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
					<DateTabs
						dates={dates}
						selectedDate={selectedDate}
						onSelectDate={setSelectedDate}
					/>
					<div className="flex flex-1 flex-wrap justify-start items-center gap-5 xl:justify-end">
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

				<div className="flex flex-col gap-2 border-l-4 border-[#ea6a2a] pl-2">
					<h2 className="text-2xl font-bold sm:text-3xl">
						{selectedDate ? formatHeadingDate(selectedDate) : ""}
					</h2>
				</div>
			</header>

			<main className="mt-6 xl:mt-8 flex-1">
				<p aria-live="polite">
					<span className="font-bold">{filteredScreenings.length}</span>件の上映
				</p>
				{filteredScreenings.length === 0 ? (
					<p>該当する上映作品はありません。検索条件を変更してください</p>
				) : (
					<div className="overflow-hidden rounded-xl border border-neutral-200 bg-white mt-2">
						<Timetable
							screenings={filteredScreenings}
							onSelectedScreening={setSelectedScreening}
						/>
					</div>
				)}
			</main>

			{selectedScreening && (
				<MovieDetailModal
					screening={selectedScreening}
					onClose={() => setSelectedScreening(null)}
					formatDate={formatHeadingDate}
				/>
			)}
		</div>
	);
}

export default App;
