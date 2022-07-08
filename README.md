# Boilerplate_Next

## 概要

Next.js のテンプレート

## 開発環境構築方法

#### 1. 開発サーバー立ち上げ

```fish
npm install or yarn install
npm run dev or yarn dev
```

`http://localhost:3000/`にて開発サーバー起動。

### 本番ビルド、サーバーの立ち上げ

以下コマンドで静的アセットを出力。また、本番モードでアプリケーション起動。

```fish
npm run build
or
yarn build

npm run start
or
yarn start
```

### テンプレートの src ディレクトリ構成

```fish
src/
  ├ components/
  │  ├ parts/
  │  └ templates/
  ├ lib/
  │  ├ constants/ (定数ファイルなど)
  │  │  ├ env/ (環境変数)
  │  │  └ url/ (アプリケーションのURLを指定)
  │  ├ selectMockServer/ (モックサーバーを起動させる関数を記述)
  │  └ seo/ (meta系)
  ├ mocks/
  │  ├ db/
  │  ├ graphql/ (未実装なので使えない)
  │  └ rest/
  ├ pages/
  │  ├ _document.tsx
  │  ├ _app.tsx
  │  └ index.tsx
  ├ services/（データフェッチ関連の関数）
  │  └ items/
  ├ theme/ (Chakra UIのカスタムテーマ)
  ├ types/
  │  ├ api.d.ts
  │  └ global.d.ts
  :
```

### カスタムテーマについて

Chakra UI のカスタムテーマ機能を使用し、独自の設定を行なっています。

対象のソースコードは`/src/theme`を参照ください。

#### provider

カスタムテーマを設定するための provider コンポーネントを提供しています。

テーマオプションをラップしているのでコンポーネントをそのまま記述することでテーマを設定できます。

#### options

Chakra UI の theme 関数の引数に渡すオプションを提供します。

### colorModeScript

colorModeScript をラップしたプロバイダーを提供します。

colorMode の設定ファイルは`theme/options/mode`を参照してください。

### モックサーバーについて

モックサーバーに MSW を採用している。

`yarn dev`で開発サーバー起動時にモックも同時に起動するよう記述してある。該当の記述は`src/pages/_app.tsx`の`selectMockServer()`関数の部分。

`src/lib/selectMockServer`の記述で node 環境は`setUpServer()`、ブラウザ環境は`setUpWorker()`という感じで分岐するようにしている（Next.js の場合は必ず環境によって分岐させる必要があるので記述内容を変えないこと）

### npm scripts

1. `dev`
   開発サーバー起動

https://nextjs.org/docs/api-reference/cli#development

2. `build`
   production 用のファイルを出力。

https://nextjs.org/docs/api-reference/cli#build

3. `start`
   本番モードでアプリケーションを起動する

https://nextjs.org/docs/api-reference/cli#production

4. `lint`
   ESLint チェックを行う

https://nextjs.org/docs/api-reference/cli#lint

5. `prettier`
   Prettier でコード整形する

https://prettier.io/docs/en/cli.html

6. `prettier:check`
   Prettier で整形されているかコードをチェックする

https://prettier.io/docs/en/cli.html#--check
