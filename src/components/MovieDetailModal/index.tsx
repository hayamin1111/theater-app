import { useEffect, useRef } from "react";
import {
	FORMATS,
	GENRES,
	SALES_STATUS,
	SALES_STATUS_CLASS_NAME,
} from "@/constants/screenings";
import type { Screening } from "@/types/screening";

type Props = {
	screening: Screening;
	onClose: () => void;
	formatDate: (date: string) => string;
};

export const MovieDetailModal = ({ screening, onClose, formatDate }: Props) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		dialog.showModal();
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	return (
		<dialog
			ref={dialogRef}
			onClose={onClose}
			onClick={(event) => {
				if (event.target === event.currentTarget) {
					dialogRef.current?.close();
				}
			}}
			onKeyDown={(event) => {
				if (event.key === "Escape") {
					dialogRef.current?.close();
				}
			}}
			className="fixed inset-0 z-50 m-0 grid h-screen w-screen max-w-none place-items-center bg-transparent p-4 backdrop:bg-(--color-cinema-backdrop) backdrop:backdrop-blur-[2px]"
		>
			<div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-(--color-cinema-border) bg-(--color-cinema-card)">
				<div className="flex items-center justify-between gap-4 border-b border-(--color-cinema-border) px-6 py-5">
					<div className="flex gap-3 items-center">
						<span
							className={`shrink-0 rounded-full border px-3 py-2 text-[16px] font-semibold leading-none ${SALES_STATUS_CLASS_NAME[screening.salesStatus]}`}
						>
							{SALES_STATUS[screening.salesStatus]}
						</span>
						<h3 className="text-2xl font-black text-(--color-cinema-ivory)">
							{screening.title}
						</h3>
					</div>
					<button
						type="button"
						onClick={() => dialogRef.current?.close()}
						className="w-10 h-10 rounded-full border border-(--color-cinema-border) bg-(--color-cinema-panel) leading-none text-sm text-(--color-cinema-muted) transition hover:border-(--color-cinema-gold) hover:text-(--color-cinema-gold) hover:cursor-pointer"
					>
						×
					</button>
				</div>
				<div className="px-6 py-6">
					<div className="space-y-4">
						<p className="text-sm font-medium text-(--color-cinema-muted)">
							{formatDate(screening.date)}&nbsp;/&nbsp;
							<time dateTime={screening.startTime}>{screening.startTime}</time>
							&nbsp;-&nbsp;
							<time dateTime={screening.endTime}>{screening.endTime}</time>
							&nbsp;/&nbsp;スクリーン{screening.screen}
						</p>
						<p className="leading-7 text-(--color-cinema-ivory)">
							{screening.description}
						</p>
					</div>
					<div className="space-y-3">
						<div className="rounded-2xl pt-4 flex gap-4 items-center">
							<p className="text-sm font-semibold text-(--color-cinema-ivory)">
								{GENRES[screening.genre]}
							</p>
							<div className="flex flex-wrap gap-2">
								{screening.formats.map((format) => (
									<span
										key={format}
										className="inline-flex items-center rounded-full border border-(--color-cinema-border) bg-(--color-cinema-panel) px-2.5 py-1 text-xs font-semibold text-(--color-cinema-muted)"
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
