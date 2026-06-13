import type { Screening } from '@/types/screening';

type Props = {
  screening: Screening;
  onClose: () => void;
};

export const MovieDetailModal = ({ screening, onClose }: Props) => {
  return (
    <>
      <dialog open>
        <h3>{screening.title}</h3>
        <p><time dateTime={screening.startTime}>{screening.startTime}</time> - <time dateTime={screening.endTime}>{screening.endTime}</time></p>
        <p>{screening.description}</p>
        <button type="button" onClick={onClose}>とじる</button>
      </dialog>
    </>
  );
};
