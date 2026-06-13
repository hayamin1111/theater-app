import styles from './index.module.css';
import type { Genre } from '@/types/screening';
import { GENRES } from '@/constants/screenings';

type Props = {
  genres: Genre[];
  selectedGenres: Genre[];
  onSelectedGenres: (genres: Genre[]) => void;
};

export const GenresFilterCheckboxes = ({ genres, selectedGenres, onSelectedGenres }: Props) => {
  
  /**
   * チェックボックスの値を保持する
   */
  const handleSelectedGenre = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Genre;

    if(e.target.checked) {
      // checkされたら、check済みの中にvalueがなければ配列に追加
      if (!selectedGenres.includes(value)) {
        onSelectedGenres([...selectedGenres, value]);
      }
    } else {
      // checkが外れたら、配列からvalueは削除
      onSelectedGenres(selectedGenres.filter(genre => genre !== value));
    }
  }

  return (
    <>
      {genres.map((genre) => (
        <label key={genre}>
          <input 
            className={styles.checkbox}
            type="checkbox"
            name="genre"
            value={genre}
            checked={selectedGenres.includes(genre)}
            onChange={handleSelectedGenre}
          />
            {GENRES[genre]}
          </label>
        ))
      }
    </>
  );
};
