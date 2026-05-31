import { useState, useEffect } from 'react';
import type { Screening } from './types/screenings';
import './App.css';

/**
 * json取得し使えるデータとして返す関数
 */
const fetchScreenings = async (): Promise<Screening[]> => {  
  const response = await fetch('https://6a1bba358858a003817b32b2.mockapi.io/screenings');
  
  if (!response.ok) {
    throw new Error("データ取得に失敗しました");
  }

  const json = await response.json();
  
  if (json.length === 0) {
    throw new Error('データがありません');
  }
  
  return json;
}

function App() {
  const [screenings, setScreenings] = useState<Screening[]>([]);

  /**
   * 初回表示時にfetchScreeningsを呼んで、stateに入れる関数
   */
  useEffect(() => {
    const init = async () => {
      try {
        const data = await fetchScreenings();
        setScreenings(data);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, [])

  return (
    <>
      {
        screenings.map((screening) => (
          <article key={screening.id}>
            <p>{screening.date}</p>
            <p>
              {screening.startTime} - {screening.endTime}
            </p>
            <h2>{screening.title}</h2>
            <p>{screening.genre}</p>
            <p>{screening.rating}</p>
            <p>Screen {screening.screen}</p>

            <ul>
              {screening.format.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p>{screening.description}</p>
            <p>{screening.salesStatus}</p>
          </article>
        ))
      }
    </>
  )
}

export default App;
