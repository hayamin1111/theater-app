import { useState, useEffect } from 'react';
import { fetchScreenings } from '@/api/screenings';
import { DateTabs } from '@/components/DateTabs';
import { SearchInput } from '@/components/SearchInput';
import { FilterCheckboxes } from '@/components/FilterCheckboxes';
import { Timetable } from '@/components/Timetable';
import type { Screening } from '@/types/screening';
import '@/App.css';

function App() {
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>(""); 
  const [selectedGenres, setSelectedGenres] = useState<Screening["genre"][]>([]);

  const dates = [...new Set(screenings.map(screening => screening.date))]; //重複をなくした日付
  const genres = [...new Set(screenings.map(screening => screening.genre))]; //重複をなくしたジャンル

  // フィルタリング
  const filteredScreenings = screenings
    .filter(screening => screening.date === selectedDate)// 日付
    .filter(screening => screening.title.toLowerCase().includes(searchKeyword.toLowerCase())) //文字列検索
    .filter(screening => selectedGenres.length === 0 || selectedGenres.includes(screening.genre));  // ジャンル（or検索）。選択なしで0件にしない。
  

  /**
   * 初回レンダリング
   */
  useEffect(() => {
    const init = async () => {
      // fetchScreeningsを呼んで、jsonをstateに入れる
      const data = await fetchScreenings();
      setScreenings(data);

      // 生dataから日付を取得し昇順にソート
      const days = [...new Set (
        data.map(item => item.date)
      )].sort();
      // 上映初日を取得しstateに入れる
      const firstDay = days[0];
      if (firstDay) {
        setSelectedDate(firstDay);
      }
    };
    init();
  }, [])

  return (
    <>
      <div>
        <DateTabs
          dates={dates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        <SearchInput 
          searchKeyword={searchKeyword}
          onSearchKeyword={setSearchKeyword}
        />
        <FilterCheckboxes
          genres={genres}
          selectedGenres={selectedGenres}
          onSelectedGenres={setSelectedGenres}
        />

      </div>
      <Timetable 
        screenings={filteredScreenings} 
      />
    </>
  )
}

export default App;
