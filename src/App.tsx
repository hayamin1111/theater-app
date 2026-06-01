import { useState, useEffect } from 'react';
import { fetchScreenings } from '@/api/screenings';
import { DateTabs } from '@/components/DateTabs';
import { Timetable } from '@/components/Timetable';
import type { Screening } from '@/types/screening';
import '@/App.css';

function App() {
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const dates = [...new Set(screenings.map(screening => screening.date))]; //重複をなくした日付
  const [selectedDate, setSelectedDate] = useState<string>("");// 生dataから初日の日付を取得し、stateの初期値に入れる。
  const selectedScreenings = screenings.filter(screening => screening.date === selectedDate);// 選択された日付にフィルタリング

  /**
   * 初回レンダリング
   */
  useEffect(() => {
    const init = async () => {
      // fetchScreeningsを呼んで、stateに入れる
      const data = await fetchScreenings();
      setScreenings(data);

      // 生dataから日付を取得し昇順にソート&初日を取得後stateに入れる
      const days = [...new Set (
        data.map(item => item.date)
      )].sort();
      const firstDay = days[0];
      if (firstDay) {
        setSelectedDate(firstDay);
      }
    };
    init();
  }, [])

  return (
    <>
      <DateTabs
        dates={dates}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <Timetable screenings={selectedScreenings} />;
    </>
  )
}

export default App;
