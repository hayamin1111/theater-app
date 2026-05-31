import styles from './index.module.css';

type Props = {
  dates: string[];
};

export const DateTabs = ({ dates }: Props) => {
  return (
    <>
      <ul className={styles.list}>
        {
          dates.map((date, index) => (
            <li key={`${date}-${index}`} className={styles.item}>
              <button className={styles.button}><span>{date}</span></button>
            </li>
          ))
        }
      </ul>
    </>
   
  );
};
