import { useState, useEffect } from 'react';
import { fetchScreenings } from '@/api/screenings';
import { DateTabs } from '@/components/DateTabs';
import { Timetable } from '@/components/Timetable';
import type { Screening } from '@/types/screening';
import '@/App.css';

function App() {
  const [screenings, setScreenings] = useState<Screening[]>([]);
  // const [selectedDate, setSelectedDate] = useState<string>('2026-06-01');
  const set = new Set(screenings.map(screening => screening.date));
  const dates = [...set]; //重複をなくした日付
  console.log(dates)

  /**
   * 初回表示時にfetchScreeningsを呼んで、stateに入れる
   */
  useEffect(() => {
    const init = async () => {
      const data = await fetchScreenings();
      setScreenings(data);
    };
    init();
  }, [])

  return (
    <>
      <DateTabs
        dates={dates}
        // selectedDate={selectedDate}
        // onSelectDate={setSelectedDate}
      />
      <Timetable screenings={screenings} />;
    </>
  )
}

export default App;
