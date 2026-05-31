import { useState, useEffect } from 'react';
import { fetchScreenings } from '@/api/screenings';
import { Timetable } from '@/components/Timetable';
import type { Screening } from '@/types/screenings';
import '@/App.css';

function App() {
  const [screenings, setScreenings] = useState<Screening[]>([]);

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
      {/* propsはJSONが渡る */}
      <Timetable screenings={screenings} />;
    </>
  )
}

export default App;
