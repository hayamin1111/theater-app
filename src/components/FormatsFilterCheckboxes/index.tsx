import styles from './index.module.css';
import type { Formats } from '@/types/screening';

type Props = {
  formats: Formats[];
  selectedFormats: Formats[];
  onSelectedFormats: (formats: Formats[]) => void;
};

export const FormatsFilterCheckboxes = ({ formats, selectedFormats, onSelectedFormats }: Props) => {
  
  /**
   * チェックボックスの値を保持する
   */
  const handleSelectedGenre = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Formats;

    // checkされたら
    if(e.target.checked) {
      if (!selectedFormats.includes(value)) {
        onSelectedFormats([...selectedFormats, value]);
      }
    } else {
      onSelectedFormats(selectedFormats.filter(format => format !== value));
    }
  }

  return (
    <>
      {formats.map((format) => (
        <label key={format}>
          <input 
            className={styles.checkbox}
            type="checkbox"
            name="format"
            value={format}
            checked={selectedFormats.includes(format)}
            onChange={(e) => handleSelectedGenre(e)}
          />
            {format}
          </label>
        ))
      }
      <p>{selectedFormats}</p>
    </>
  );
};
