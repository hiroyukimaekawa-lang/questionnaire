# StorePad風アンケートアプリ

## ローカル環境での起動方法

### 1. 前提環境
- Node.js 20 以上
- npm
- Expo Go アプリ（スマホ実機確認する場合）
- iOS シミュレータ（Xcode）または Android エミュレータ（Android Studio）

### 2. 依存パッケージのインストール
```bash
npm install
```

### 3. 開発サーバー起動
```bash
npm run start
```

起動後、Expo DevTools から以下を選べます。
- `i`: iOS シミュレータ起動
- `a`: Android エミュレータ起動
- `w`: Web 起動
- `q`: 終了

### 4. 各プラットフォームを直接起動する場合
```bash
npm run ios
npm run android
npm run web
```

### 5. 型チェック
```bash
npm run typecheck
```

## Vercel へのデプロイ

### 方法1: Vercel CLI でデプロイ
```bash
npm install -g vercel@latest
vercel
```
初回はログインやプロジェクト設定の質問に答えます。

### 方法2: GitHub 連携（推奨）
1. [Vercel](https://vercel.com) にログイン
2. 「Add New」→「Project」を選択
3. GitHub リポジトリをインポート
4. ビルド設定は `vercel.json` により自動検出されます
5. 「Deploy」をクリック

`main` ブランチにプッシュするたびに自動デプロイされます。

### Web 版について
- Web では `@react-native-firebase` が使えないため、`hooks/useSurveyForm.web.ts` で Firestore には保存せずフォーム動作のみ行っています。Web で永続化したい場合は Firebase JS SDK の導入を検討してください。

## Firebase 接続の注意
このプロジェクトは `@react-native-firebase/app` / `firestore` を使います。
実機・シミュレータで Firestore 保存を有効にするには、各OSの Firebase 設定ファイル追加が必要です。

- iOS: `GoogleService-Info.plist`
- Android: `google-services.json`

未設定の場合、送信時に Firestore 書き込みが失敗することがあります。

## URLの差し替え
`constants/config.ts` の以下を実運用値に変更してください。
- `googleReviewUrl`
- `tabelogUrl`
