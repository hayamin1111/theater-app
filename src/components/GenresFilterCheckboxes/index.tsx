import type { ChangeEvent } from "react";
import { GENRES } from "@/constants/screenings";
import type { Genre } from "@/types/screening";

type Props = {
	genres: Genre[];
	selectedGenres: Genre[];
	onSelectedGenres: (genres: Genre[]) => void;
};

export const GenresFilterCheckboxes = ({
	genres,
	selectedGenres,
	onSelectedGenres,
}: Props) => {
	const handleSelectedGenre = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value as Genre;

		if (event.target.checked) {
			if (!selectedGenres.includes(value)) {
				onSelectedGenres([...selectedGenres, value]);
			}
		} else {
			onSelectedGenres(selectedGenres.filter((genre) => genre !== value));
		}
	};

	return (
		<div className="relative flex w-full flex-wrap items-center gap-2 pt-7 sm:pl-25 sm:pt-0">
			<h2 className="absolute top-0 left-0 text-xs font-normal tracking-[0.16em] text-(--color-cinema-muted) sm:top-2.5">ジャンル</h2>
			{genres.map((genre) => (
				<label key={genre} className="inline-flex cursor-pointer">
					<input
						className="peer sr-only"
						type="checkbox"
						name="genre"
						value={genre}
						checked={selectedGenres.includes(genre)}
						onChange={handleSelectedGenre}
					/>
					<span className="inline-flex items-center rounded border border-(--color-cinema-border) bg-(--color-cinema-panel) px-4 py-2 text-sm leading-none text-(--color-cinema-muted) transition-colors hover:border-(--color-cinema-gold) hover:text-(--color-cinema-ivory) peer-checked:border-(--color-cinema-red) peer-checked:bg-(--color-cinema-red) peer-checked:text-(--color-cinema-ivory) peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-(--color-cinema-gold)">
						{GENRES[genre]}
					</span>
				</label>
			))}
		</div>
	);
};
