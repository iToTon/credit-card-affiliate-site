## このサイトについて

「クレジットカード辞典」(https://cc-jiten.com)— 個人運営のクレジットカード情報アフィリエイトサイト。

**作業を始める前に [SITE-SPEC.md](SITE-SPEC.md) を読むこと。** サイトの目的・編集方針・技術仕様・
運用ルールをまとめてある。とくに以下は仕様書を読まずに判断しない:

- 新しい記事のテーマを決めるとき(書くべきでない領域が定義されている)
- カテゴリーを追加・変更するとき
- 法令・ASP規約に関わる表記を変えるとき

### 最低限の禁則

- **`wrangler.jsonc` を削除しない** — 消すとデプロイが失敗する(理由は仕様書 5.3)
- **`fonts/NotoSansJP-VF.ttf` を削除しない** — OGP画像の日本語描画に必要
- 記事本文で生の `<a>` タグを使わない — 内部リンクはMarkdown記法、アフィリエイトリンクは
  `AffiliateLink` コンポーネント
- 広告表記・数値の正確性に関わる記述を、確認なしに緩めたり削除したりしない

### 記事を追加したら

`npm run build` が成功することを確認してからコミットする。カテゴリーのタイプミスは
ビルド失敗として検出される(意図した設計)。OGP画像の生成を含むため20〜30秒程度かかる。

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
