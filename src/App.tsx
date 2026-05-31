import { useState, useEffect } from 'react';
import type { Screening } from './types/screenings';
import './App.css';

/**
 * json取得し使えるデータとして返す関数
 */
const fetchScreenings = async (): Promise<Screening[]> => {  
  const response = await fetch('./screenings.json');
  
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
     <p>テスト</p>
      {
        
        screenings.map((screening) => (
          <div key={screening.id}>
            <p>{screening.title}</p>
            <p>{screening.date}</p>
          </div>
        ))
      }
    </>
  )
}

export default App;
