# Theater Schedule App

映画館の上映スケジュールを想定した、React製のタイムテーブルです。

上映データをAPIから取得し、日付の切り替え、作品名検索、ジャンル・上映形式による複数条件の絞り込みができます。

上映セルを選択すると、作品の詳細をモーダルで表示します。

## デモ

* 公開URL：デプロイ後に追記
* [リポジトリ](https://github.com/hayamin1111/theater-app)

## スクリーンショット
<img width="3160" height="2464" alt="Image" src="https://github.com/user-attachments/assets/2cbae332-495a-4d3a-be80-7e56c60005b5" />

<img width="3160" height="2464" alt="Image" src="https://github.com/user-attachments/assets/dd169ee9-85e5-4cf7-ba38-5e6a64b186c3" />

## 主な機能

* 日付別の上映スケジュール表示
* 作品名による部分一致検索
* ジャンルの複数選択によるOR絞り込み
* 上映形式の複数選択によるOR絞り込み
* 開始・終了時刻に応じたタイムテーブル配置
* 上映作品の詳細モーダル
* 検索結果件数の表示
* 検索結果が0件の場合の案内表示
* データ取得中のローディング表示
* データ取得失敗時のエラー表示

## 実装上のポイント

### データはmockAPIで生成
[mockAPI](https://mockapi.io)で作成したダミーAPIから上映データを取得しています。

アプリの初回表示時に `fetch()` でJSON全体を取得し、取得後の検索・絞り込み処理はクライアント側で行っています。

データ量が少ない学習用アプリのため、検索条件が変わるたびに通信する構成にはしていません。

### CSS Gridによるタイムテーブル配置

営業時間を30分単位の行、スクリーン番号を列として扱い、上映開始時刻・終了時刻・スクリーン番号から各上映セルの配置位置を算出しています。

### 複数条件による絞り込み

日付、作品名、ジャンル、上映形式の条件を順番に適用しています。

ジャンルと上映形式は配列で選択状態を管理し、複数選択時はOR条件で絞り込んでいます。何も選択されていない場合は、条件を適用せず全件を表示します。

### 上映形式データの生成

上映作品ごとの上映形式は配列で保持しています。選択肢の一覧を生成する際は `flatMap()` で平坦化し、`Set` で重複を除去しています。

### モーダル制御

選択中の上映作品を `Screening | null` のstateで管理しています。

詳細表示にはHTMLの `dialog` 要素を使用し、`useRef` から `showModal()` と `close()` を実行しています。モーダル表示中は背景スクロールを無効化しています。

### レイアウトシフト対策

初回データ取得中にローディング画面を表示し、取得前後の大きなレイアウト変化を抑えています。

本番ビルドでのLighthouse Performanceは99点でした。

## 使用技術

| 名前          |           バージョン |
| ------------ | ------------------: |
| Node.js      |             22.17.0 |
| React        |              19.2.6 |
| Vite         |              8.0.12 |
| TypeScript   |               6.0.2 |
| Tailwind CSS |               4.3.1 |
| Biome        |               2.5.0 |


## セットアップ

```bash
npm install
```

## コマンド

### ローカル開発

```bash
npm run dev
```

### 本番ビルド

```bash
npm run build
```

### ビルド結果のプレビュー

```bash
npm run preview
```

### リント

```bash
npm run lint
```

### フォーマット

```bash
npm run format
```

## ディレクトリ構成

```text
public/
└── screenings.json

src/
├── api/
│   └── screenings.ts
├── components/
│   ├── DateTabs/
│   │   └── index.tsx
│   ├── FormatsFilterCheckboxes/
│   │   └── index.tsx
│   ├── GenresFilterCheckboxes/
│   │   └── index.tsx
│   ├── MovieDetailModal/
│   │   └── index.tsx
│   ├── SearchInput/
│   │   └── index.tsx
│   └── Timetable/
│       └── index.tsx
├── constants/
│   └── screenings.ts
├── types/
│   └── screening.ts
├── App.tsx
├── index.css
└── main.tsx
```

## 主なstate

| state               | 型                   | 用途            |
| ------------------- | ------------------- | ------------- |
| `screenings`        | `Screening[]`       | 取得した上映データ     |
| `selectedDate`      | `string`            | 選択中の日付        |
| `searchKeyword`     | `string`            | 作品名の検索文字列     |
| `selectedGenres`    | `Genre[]`           | 選択中のジャンル      |
| `selectedFormats`   | `Format[]`          | 選択中の上映形式      |
| `selectedScreening` | `Screening \| null` | モーダルに表示する上映作品 |
| `isLoading`         | `boolean`           | データ取得中かどうか    |
| `error`             | `string \| null`    | データ取得エラー      |

## 品質確認

```bash
npm run lint
npm run build
```

* Biomeによるリントエラーなし
* TypeScript・Viteの本番ビルド成功
* Lighthouse Performance：99

## 今後の改善候補

* スマートフォン向けタイムテーブルUIの調整
* 絞り込み条件の一括解除
* ~~APIまたはCMSへのデータ移行~~ &rarr; 完了
* コンポーネントテストの追加
