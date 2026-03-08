# StorePad風アンケートアプリ（Vercel公開版）

## ローカル起動

```bash
cd /Users/maekawahiroyuki/questionnaire
npm install
npm run start
```

- `i`: iOS
- `a`: Android
- `w`: Web

## Vercelへ公開（無料）

### 初回のみ
```bash
npm install -g vercel@latest
vercel login
```

### デプロイ
```bash
cd /Users/maekawahiroyuki/questionnaire
npm run deploy:vercel
```

これで `https://xxxxx.vercel.app` が発行されます。

## 更新デプロイ
コード変更後に再度以下を実行するだけです。

```bash
npm run deploy:vercel
```

## 補足
- Web環境では `hooks/useSurveyForm.web.ts` が使われます。
- `@react-native-firebase/firestore` は Web では使わず、フォーム動作のみ有効です。
- Webでも保存したい場合は Firebase JS SDK への置き換えが必要です。
