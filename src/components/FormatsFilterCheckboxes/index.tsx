import type { ChangeEvent } from "react";
import { FORMATS } from "@/constants/screenings";
import type { Format } from "@/types/screening";

type Props = {
	formats: Format[];
	selectedFormats: Format[];
	onSelectedFormats: (formats: Format[]) => void;
};

export const FormatsFilterCheckboxes = ({
	formats,
	selectedFormats,
	onSelectedFormats,
}: Props) => {
	const handleSelectedFormat = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value as Format;

		if (event.target.checked) {
			if (!selectedFormats.includes(value)) {
				onSelectedFormats([...selectedFormats, value]);
			}
		} else {
			onSelectedFormats(selectedFormats.filter((format) => format !== value));
		}
	};

	return (
		<div className="relative flex w-full flex-wrap items-center gap-2 pt-7 sm:pl-25 sm:pt-0">
			<h2 className="absolute top-0 left-0 text-xs font-normal tracking-[0.16em] text-(--color-cinema-muted) sm:top-2.5">上映形式</h2>
			{formats.map((format) => (
				<label key={format} className="inline-flex cursor-pointer">
					<input
						className="peer sr-only"
						type="checkbox"
						name="format"
						value={format}
						checked={selectedFormats.includes(format)}
						onChange={handleSelectedFormat}
					/>
					<span className="inline-flex items-center rounded border border-(--color-cinema-border) bg-(--color-cinema-panel) px-4 py-2 text-sm leading-none text-(--color-cinema-muted) transition-colors hover:border-(--color-cinema-gold) hover:text-(--color-cinema-ivory) peer-checked:border-(--color-cinema-red) peer-checked:bg-(--color-cinema-red) peer-checked:text-(--color-cinema-ivory) peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-(--color-cinema-gold)">
						{FORMATS[format]}
					</span>
				</label>
			))}
		</div>
	);
};
