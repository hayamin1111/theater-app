import styles from './index.module.css';
import type { Format } from '@/types/screening';
import { FORMATS } from '@/constants/screenings';

type Props = {
  formats: Format[];
  selectedFormats: Format[];
  onSelectedFormats: (formats: Format[]) => void;
};

export const FormatsFilterCheckboxes = ({ formats, selectedFormats, onSelectedFormats }: Props) => {
  
  /**
   * チェックボックスの値を保持する
   */
  const handleSelectedFormat = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Format;

    if(e.target.checked) {
      // checkされたら、check済みの中にvalueがなければ配列に追加
      if (!selectedFormats.includes(value)) {
        onSelectedFormats([...selectedFormats, value]);
      }
    } else {
      // checkが外れたら、配列からvalueは削除
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
            onChange={handleSelectedFormat}
          />
            {FORMATS[format]}
          </label>
        ))
      }
    </>
  );
};
