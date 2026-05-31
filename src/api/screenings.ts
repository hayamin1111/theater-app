import type { Screening } from '@/types/screenings';

/**
 * json取得し使えるデータとして返す関数
 */
export const fetchScreenings = async (): Promise<Screening[]> => {  
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
