type Props = {
	searchKeyword: string;
	onSearchKeyword: (searchKeyword: string) => void;
};

export const SearchInput = ({ searchKeyword, onSearchKeyword }: Props) => {
	return (
		<div className="flex items-center flex-wrap gap-2">
			<h2 className="text-sm font-bold">タイトル検索</h2>
			<label className="w-50 flex-1">
				<span className="sr-only">検索</span>
				<input
					className="w-full rounded-sm border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#ea6a2a] focus:ring-2 focus:ring-[#ea6a2a]/20"
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
