type Props = {
	searchKeyword: string;
	onSearchKeyword: (searchKeyword: string) => void;
};

export const SearchInput = ({ searchKeyword, onSearchKeyword }: Props) => {
	return (
		<div className="flex w-full min-w-0 flex-wrap items-center gap-3 lg:absolute lg:top-6 lg:right-10 lg:w-auto">
			<h2 className="shrink-0 text-sm font-normal text-(--color-cinema-muted)">
				タイトル検索
			</h2>
			<label className="relative min-w-0 flex-1 before:pointer-events-none before:absolute before:top-3 before:right-4 before:h-3 before:w-3 before:rounded-full before:border before:border-(--color-cinema-muted) before:content-[''] after:pointer-events-none after:absolute after:top-6 after:right-3 after:h-px after:w-1.5 after:rotate-45 after:bg-(--color-cinema-muted) after:content-[''] lg:w-64 lg:flex-none">
				<span className="sr-only">検索</span>
				<input
					className="w-full rounded border border-(--color-cinema-border) bg-(--color-cinema-card) py-2.5 pr-10 pl-3.5 text-sm text-(--color-cinema-ivory) transition-colors placeholder:text-(--color-cinema-muted) focus:border-(--color-cinema-gold) focus:outline-2 focus:outline-offset-2 focus:outline-(--color-cinema-gold)"
					type="search"
					name="search"
					onChange={(event) => onSearchKeyword(event.target.value)}
					value={searchKeyword}
					placeholder="検索"
				/>
			</label>
		</div>
	);
};
