import styles from './index.module.css';

type Props = {
  dates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

export const DateTabs = ({ dates, selectedDate, onSelectDate }: Props) => {
  return (
    <>
      <ul className={styles.list}>
        {
          dates.map((date) => (
            <li key={`${date}`} className={styles.item}>
              <button onClick={() => onSelectDate(date)} className={styles.button}><span>{date}</span></button>
            </li>
          ))
        }
      </ul>
    </>
  );
};
