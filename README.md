# アフィリエイトサイト(クレジットカード比較)

Astro + Tailwind CSS で構築した静的サイトです。Cloudflare Pages / Vercel 等に無料でホスティングできます。

## プロジェクト構成

```text
/
├── public/                          静的アセット(favicon, robots.txt はコード生成)
├── src/
│   ├── site.config.ts               サイト名・運営者情報・カテゴリー一覧(最初に編集する)
│   ├── content.config.ts            記事のフロントマター定義(zodスキーマ)
│   ├── content/articles/*.mdx       記事本体(Markdown + コンポーネント)
│   ├── components/
│   │   ├── AffiliateLink.astro      アフィリエイトリンク用([PR]表記・nofollow付き)
│   │   └── AdDisclosure.astro       記事冒頭の広告表記バナー
│   ├── layouts/
│   │   ├── BaseLayout.astro         全ページ共通(SEOメタタグ・OGP)
│   │   └── ArticleLayout.astro      記事ページ用レイアウト
│   └── pages/
│       ├── index.astro              トップページ
│       ├── articles/                記事一覧・記事詳細([...slug])
│       ├── category/[slug].astro    カテゴリー別一覧
│       ├── about.astro              運営者情報
│       ├── privacy-policy.astro     プライバシーポリシー
│       └── robots.txt.ts            robots.txt(site.config.tsのURLと連動)
└── package.json
```

## 🧞 コマンド

| コマンド | 内容 |
| :--- | :--- |
| `npm install` | 依存関係のインストール |
| `astro dev --background` | 開発サーバーをバックグラウンドで起動(推奨) |
| `astro dev stop` / `status` / `logs` | 開発サーバーの停止・状態確認・ログ確認 |
| `npm run build` | 本番用ビルド(`./dist/`に出力) |
| `npm run preview` | ビルド後のプレビュー |

## 記事の書き方

1. `src/content/articles/` に `.mdx` ファイルを追加
2. フロントマターに `title` / `description` / `category` / `pubDate` / `draft` を記入
3. `draft: true` の間は一覧・サイトマップに出ません。公開する際は `draft: false` に変更
4. 本文中でアフィリエイトリンクを貼る際は、生の `<a>` タグではなく `<AffiliateLink href="...">` を使う(nofollow・[PR]表記が自動で付く)
5. サンプル記事: [how-to-choose-credit-card.mdx](src/content/articles/how-to-choose-credit-card.mdx)(そのままでは非公開の雛形です)

## 公開までにご自身で行っていただく作業(TODO)

以下はアカウント登録・支払い・本人確認を伴うため、AIエージェントでは代行できません。

1. **サイト名・運営者情報の確定**: [src/site.config.ts](src/site.config.ts) の `TODO` 箇所を埋める
2. **ドメイン取得**: お名前.com、Cloudflare Registrar など
3. **ASP(アフィリエイトサービスプロバイダー)への登録**
   - A8.net、もしもアフィリエイト、バリューコマース など
   - クレジットカード案件は審査があり、**サイトに一定量の記事と運営者情報・プライバシーポリシーが揃っていること**を求められるのが一般的です。まず記事を数本公開してから申請するのがおすすめです
4. **Cloudflare Pages へのデプロイ**
   - 詳しい手順は [DEPLOY.md](DEPLOY.md) を参照してください
   - ビルドコマンド: `npm run build` / 出力ディレクトリ: `dist`
5. **`src/site.config.ts` の `url` とドメインの紐付け後、`astro.config.mjs` の `site` にも自動反映されます(同じ値を参照しているため再ビルドのみでOK)**

## 法令・ASP規約まわりの注意点(必ず確認してください)

- 2023年10月施行のステルスマーケティング規制により、アフィリエイト記事には広告であることの明示が必要です。本サイトは `AdDisclosure` コンポーネントと `[PR]` 表記で対応済みですが、内容は各自の状況に応じて見直してください
- クレジットカード・ローン等の金融商材は、誇大表現(「絶対」「必ず得する」等)や、還元率・年会費の誤った記載が景品表示法違反になり得ます。数値は必ず公式サイトの最新情報を確認し、更新があれば記事も更新してください
- ASPごとに広告掲載の規約(表現ガイドライン、リンクの貼り方など)が異なるため、提携後は必ず規約を確認してください
