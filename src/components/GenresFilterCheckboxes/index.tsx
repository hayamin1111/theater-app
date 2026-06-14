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
		<div className="flex items-center flex-wrap gap-2">
      <h2 className="text-sm font-bold">ジャンル</h2>
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
					<span className="inline-flex items-center rounded-sm border border-neutral-300 bg-white px-3 py-2 leading-none text-sm text-neutral-700 transition peer-checked:border-[#ea6a2a] peer-checked:bg-[#ea6a2a] peer-checked:text-white">
						{GENRES[genre]}
					</span>
				</label>
			))}
		</div>
	);
};
