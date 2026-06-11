import styles from './index.module.css';

type Props = {
  searchKeyword: string;
  onSearchKeyword: (searchKeyword: string) => void;
};

export const SearchMovie = ({ searchKeyword, onSearchKeyword }: Props) => {
  return (
    <>
      <input 
        className={styles.input}
        type="text"
        onChange={(e) => onSearchKeyword(e.target.value)}
        value={searchKeyword}
      />
    </>
  );
};
