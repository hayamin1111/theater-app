import { useState, useEffect } from 'react';
import { fetchScreenings } from '@/api/screenings';
import { DateTabs } from '@/components/DateTabs';
import { SearchInput } from '@/components/SearchInput';
import { GenresFilterCheckboxes } from '@/components/GenresFilterCheckboxes';
import { FormatsFilterCheckboxes } from '@/components/FormatsFilterCheckboxes';
import { Timetable } from '@/components/Timetable';
import { MovieDetailModal } from '@/components/MovieDetailModal';
import type { Screening, Genre, Format } from '@/types/screening';
import '@/App.css';

function App() {
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>(""); 
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<Format[]>([]);

  const dates = [...new Set(screenings.map(screening => screening.date))]; //重複をなくした日付
  const genres = [...new Set(screenings.map(screening => screening.genre))]; //重複をなくしたジャンル
  const formats = [...new Set(screenings.flatMap(screening => screening.formats))]; //重複をなくした上映形式

  // フィルタリング
  const filteredScreenings = screenings
    .filter(screening => screening.date === selectedDate)// 日付
    .filter(screening => screening.title.toLowerCase().includes(searchKeyword.toLowerCase())) //文字列検索
    .filter(screening => selectedGenres.length === 0 || selectedGenres.includes(screening.genre))  // ジャンル（or検索）。選択なしで全件表示。
    .filter(screening => selectedFormats.length === 0 || selectedFormats.some(format => screening.formats.includes(format))); // 上映形式（or検索）。複数選択可。選択なしで全件表示。

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
        <GenresFilterCheckboxes
          genres={genres}
          selectedGenres={selectedGenres}
          onSelectedGenres={setSelectedGenres}
        />
        <FormatsFilterCheckboxes
          formats={formats}
          selectedFormats={selectedFormats}
          onSelectedFormats={setSelectedFormats}
        />
      </div>
      <Timetable 
        screenings={filteredScreenings} 
        onSelectedScreening={setSelectedScreening} //クリックしたセルの上映情報がstateに入る
      />
      {selectedScreening && (
        <MovieDetailModal
          screening={selectedScreening} //Timetableでクリックした上映情報を渡す
          onClose={() => setSelectedScreening(null)}
        />
      )}
    </>
  )
}

export default App;
