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
		<div className="flex flex-wrap gap-2">
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
					<span className="inline-flex items-center rounded-sm border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-700 transition peer-checked:border-[#5f9f97] peer-checked:bg-[#5f9f97] peer-checked:text-white">
						{FORMATS[format]}
					</span>
				</label>
			))}
		</div>
	);
};
