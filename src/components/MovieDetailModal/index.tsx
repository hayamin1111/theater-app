import type { Screening } from '@/types/screening';
import styles from './index.module.css';

type Props = {
  screening: Screening;
  onClose: () => void;
};

export const MovieDetailModal = ({ screening, onClose }: Props) => {
  return (
    <>
      <dialog open>
        <p>{screening.title}</p>
        <button type="button" onClick={onClose}>とじる</button>
      </dialog>
    </>
  );
};
