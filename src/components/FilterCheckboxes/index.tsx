import styles from './index.module.css';
import type { Genre } from '@/types/screening';

type Props = {
  genres: Genre[];
  selectedGenres: Genre[];
  onSelectedGenres: (genres: Genre[]) => void;
};

export const FilterCheckboxes = ({ genres, selectedGenres, onSelectedGenres }: Props) => {
  
  /**
   * チェックボックスの値を保持する
   */
  const handleSelectedGenre = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Genre;

    // checkされたら
    if(e.target.checked) {
      if (!selectedGenres.includes(value)) {
        onSelectedGenres([...selectedGenres, value]);
      }
    } else {
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
            onChange={(e) => handleSelectedGenre(e)}
          />
            {genre}
          </label>
        ))
      }
      <p>{selectedGenres}</p>
    </>
  );
};
