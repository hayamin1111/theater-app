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
				<p className="m-6 rounded border border-(--color-cinema-red) bg-(--color-cinema-panel) p-5 text-(--color-cinema-ivory)">
					{error}
				</p>
			</main>
		);
	}

	//データ取得中は本体を描画しない
	if (isLoading) {
		return (
			<main className="min-h-screen">
				<p className="min-h-screen flex flex-row gap-3 items-center justify-center text-(--color-cinema-muted)">
					<img src="/images/loading.svg" className="w-6" alt="" />
					上映スケジュール読込中
				</p>
			</main>
		);
	}

	return (
		<div className="flex min-h-screen min-w-0 flex-col bg-(--color-cinema-bg) pb-10 text-(--color-cinema-ivory)">
			<header className="min-w-0">
				<h1 className="flex items-center gap-3 mx-4 my-6 text-2xl font-bold leading-tight tracking-wide sm:mx-6 sm:text-3xl lg:mx-10 lg:mt-10 lg:text-[40px]">
					<img
						src="/images/icon.svg"
						className="w-8 shrink-0"
						alt=""
						aria-hidden
					/>
					上映スケジュール
				</h1>

				<div className="relative flex min-w-0 flex-col gap-5 border-y border-(--color-cinema-grid) bg-(--color-cinema-panel) px-4 py-6 sm:px-6 lg:px-10">
					<DateTabs
						dates={dates}
						selectedDate={selectedDate}
						onSelectDate={setSelectedDate}
					/>
					<div className="flex min-w-0 flex-col items-start gap-4">
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

				<div className="mx-4 mt-8 flex flex-col border-l-[3px] border-(--color-cinema-gold) pl-4 sm:mx-6 lg:mx-10">
					<h2 className="text-xl font-bold leading-tight sm:text-2xl lg:text-[28px]">
						{selectedDate ? formatHeadingDate(selectedDate) : ""}
					</h2>
				</div>
			</header>

			<main className="mt-2 min-w-0 flex-1 px-4 sm:px-6 lg:px-10">
				<p
					aria-live="polite"
					className="pl-5 text-sm text-(--color-cinema-muted)"
				>
					<span className="font-normal tabular-nums">
						{filteredScreenings.length}
					</span>
					件の上映
				</p>
				{filteredScreenings.length === 0 ? (
					<p className="mt-8 rounded border border-(--color-cinema-border) bg-(--color-cinema-panel) px-5 py-8 text-sm leading-7 text-(--color-cinema-muted)">
						該当する上映作品はありません。検索条件を変更してください
					</p>
				) : (
					<div className="mt-8 min-w-0 bg-(--color-cinema-bg) sm:mt-12 lg:mt-16">
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
