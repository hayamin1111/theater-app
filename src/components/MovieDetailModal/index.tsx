import { FORMATS, GENRES, SALES_STATUS } from "@/constants/screenings";
import type { Screening } from "@/types/screening";

type Props = {
	screening: Screening;
	onClose: () => void;
};

export const MovieDetailModal = ({ screening, onClose }: Props) => {
	return (
		<dialog
			open
			onClick={(event) => {
				if (event.target === event.currentTarget) {
					onClose();
				}
			}}
			onKeyDown={(event) => {
				if (event.key === "Escape") {
					onClose();
				}
			}}
			className="fixed inset-0 z-50 m-0 grid h-screen w-screen max-w-none place-items-center bg-transparent p-4"
		>
			<div
				className="absolute inset-0 bg-neutral-950/45 backdrop-blur-[2px]"
				aria-hidden="true"
			/>
			<div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-neutral-200 bg-white">
				<div className="flex items-start justify-between gap-4 border-b border-neutral-100 px-6 py-5">
					<div className="space-y-2">
						<p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">
							movie detail
						</p>
						<h3 className="text-2xl font-black tracking-tight text-neutral-950">
							{screening.title}
						</h3>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-[#5f9f97] hover:text-[#5f9f97]"
					>
						とじる
					</button>
				</div>
				<div className="grid gap-6 px-6 py-6 md:grid-cols-[1fr_240px]">
					<div className="space-y-4">
						<p className="text-sm font-medium text-neutral-600">
							<time dateTime={screening.startTime}>{screening.startTime}</time>{" "}
							- <time dateTime={screening.endTime}>{screening.endTime}</time> /{" "}
							{screening.screen}会場
						</p>
						<p className="leading-7 text-neutral-700">
							{screening.description}
						</p>
					</div>
					<div className="space-y-3">
						<div className="rounded-2xl bg-neutral-50 p-4">
							<p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
								status
							</p>
							<p className="mt-2 text-sm font-semibold text-neutral-900">
								{SALES_STATUS[screening.salesStatus]}
							</p>
						</div>
						<div className="rounded-2xl bg-neutral-50 p-4">
							<p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
								genre
							</p>
							<p className="mt-2 text-sm font-semibold text-neutral-900">
								{GENRES[screening.genre]}
							</p>
						</div>
						<div className="rounded-2xl bg-neutral-50 p-4">
							<p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
								formats
							</p>
							<div className="mt-3 flex flex-wrap gap-2">
								{screening.formats.map((format) => (
									<span
										key={format}
										className="inline-flex items-center rounded-full border border-neutral-300 bg-[#f3f7f5] px-2.5 py-1 text-xs font-semibold text-neutral-700"
									>
										{FORMATS[format]}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</dialog>
	);
};
