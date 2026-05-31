## 動作環境
| 名前      | バージョン |
|---------|--|
| Node.js | 22.17.0 |
| React | 19.2.6 |

## コマンド

### ローカル開発
```bash
npm run dev
```

### ビルド、デプロイ
```bash
npm run build
```

## 使用ライブラリ
### TypeScript
| 名前 | 説明                  |
|---|---------------------|
|[xxx]| xxxxx|

## ディレクトリ構成
```text
src/
├ components/ - 画面に出るUI
│  ├ DateTabs.tsx - 日付切り替え
│  ├ SearchMovie.tsx - 検索
│  ├ FilterMovie.tsx - 絞り込み
│  ├ Timetable.tsx - タイムテーブル
│  ├ MovieCell.tsx - セル本体
│  ├ MovieCellContent.tsx - セル内表示
│  ├ MovieDetailModal.tsx - 詳細モーダル
│  └ EmptyState.tsx - 上映なし
├ types/ - 型定義
│  └ screening.ts 
├ utils/ - Reactに依存しない普通の関数
│  ├ filterScreenings.ts - フィルタリング
│  ├ sortScreenings.ts - 検索
│  └ calculateMovieCellPosition.ts - セルの位置決め
├ App.tsx - state管理と接続
public/
└ screenings.json - ダミーJSON
```

## state
| コンポーネント | props | 説明                  |
|---|---|---------------------|
|DateTabs|selectedDate, onChangeDate, dates|日付表示・切り替え。表示とクリック通知|
|SearchMovie|searchKeyword, onChangeKeyword|検索入力。入力欄と変更通知|
|FilterMovie|selectedGenre, selectedFormat, selectedScreen, onChangeGenre, onChangeFormat, onChangeScreen|絞り込みUI。セレクトUIと変更通知|
|Timetable|screenings, onSelectMovie|渡された上映データを表示|
|MovieCell|screening, onSelectMovie|1上映セル|
|MovieCellContent|screening|セル内表示|
|MovieDetailModal|screening, onClose|詳細表示・閉じる|
|EmptyState|message|上映なし表示|


## API
mockapi.io（ https://mockapi.io ）にて作成。

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
