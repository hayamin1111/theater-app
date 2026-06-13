type Props = {
	searchKeyword: string;
	onSearchKeyword: (searchKeyword: string) => void;
};

export const SearchInput = ({ searchKeyword, onSearchKeyword }: Props) => {
	return (
		<label className="min-w-[220px] flex-1 md:max-w-[320px]">
			<span className="sr-only">検索</span>
			<input
				className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#5f9f97] focus:ring-2 focus:ring-[#5f9f97]/20"
				type="search"
				onChange={(event) => onSearchKeyword(event.target.value)}
				value={searchKeyword}
				placeholder="検索"
			/>
		</label>
	);
};
