// サイト全体の設定を一箇所にまとめたファイル。

export const siteConfig = {
  // サイト名
  name: "クレジットカード辞典",
  // サイトの説明(SEOのdescriptionにも使用)
  description: "クレジットカードの比較・選び方を分かりやすく紹介するメディアです。",
  // 本番公開後のURL(末尾スラッシュなし)。astro.config.mjs の `site` とも合わせること。
  url: "https://cc-jiten.com",
  // デフォルトのOGP画像パス。src/pages/og/[...route].ts がビルド時に生成する。
  defaultOgImage: "/og/site.png",
  // サイトの言語
  lang: "ja",
  // 運営者情報(プライバシーポリシー・サイトについてページ用)
  operator: {
    name: "いととん",
    contact: "itotonn.info@gmail.com",
    // 特定商取引法に基づく表記は「直接商品・サービスを販売する場合」に必要です。
    // 純粋なアフィリエイト紹介(他社サイトへの送客のみ)の場合は必須ではありませんが、
    // 運営者情報の明示はASP審査・読者の信頼性の観点から強く推奨されます。
  },
} as const;

// 利用中のASP(アフィリエイトサービスプロバイダー)。
// プライバシーポリシーの「広告配信について」に自動反映されます。
// 新しいASPと提携したら、この配列に追加するだけでOKです。
export const asps = ["A8.net", "AccessTrade"] as const;

// アクセス解析(GA4)・Search Console連携用。値が空文字の間は何も出力されない。
// 導入時はidやcontentの値を埋めるだけでOK(BaseLayout.astro側で条件分岐済み)。
export const analyticsConfig = {
  // GA4測定ID。例: "G-XXXXXXXXXX"
  gaMeasurementId: "G-29SDF2TSCL",
  // Search Console のHTMLタグ確認用content値
  googleSiteVerification: "yNABztlPdOkk5k21Gsr9JN53KGwdal31lcIFxyqzFVM",
} as const;

// 記事カテゴリ(サブジャンル)。
// accent / tint はアイコンやアイキャッチの配色に使う(Tailwindのクラス名ではなく
// 実際の色値を持たせているのは、動的なクラス名生成をTailwindがビルドできないため)。
export const categories = [
  {
    slug: "how-to-choose",
    name: "選び方・比較",
    description: "年会費・還元率・特典など、クレジットカードの選び方や比較のポイントを解説する記事。",
    accent: "oklch(52% 0.17 253)",
    tint: "oklch(95% 0.032 253)",
  },
  {
    slug: "screening",
    name: "審査・発行",
    description: "審査の仕組みや申し込みから発行までの流れ、限度額など、審査まわりを解説する記事。",
    accent: "oklch(52% 0.16 288)",
    tint: "oklch(95% 0.032 288)",
  },
  {
    slug: "how-it-works",
    name: "使い方の基礎知識",
    description: "リボ払い・締め日・タッチ決済など、クレジットカードの基本的な仕組みを解説する記事。",
    accent: "oklch(52% 0.11 205)",
    tint: "oklch(95% 0.032 205)",
  },
  {
    slug: "points",
    name: "ポイント・特典活用",
    description: "ポイントやマイルを賢く貯める・使うためのコツを紹介する記事。",
    accent: "oklch(58% 0.13 75)",
    tint: "oklch(95% 0.04 75)",
  },
  {
    slug: "business",
    name: "法人・個人事業主向け",
    description: "法人カード・ビジネスカードの選び方や、個人事業主の経費管理に関する記事。",
    accent: "oklch(46% 0.07 245)",
    tint: "oklch(94% 0.018 245)",
  },
  {
    slug: "everyday-payments",
    name: "支払い活用術",
    description: "税金・家賃・サブスクなど、日常の支払いをクレジットカードにまとめる方法を紹介する記事。",
    accent: "oklch(52% 0.13 155)",
    tint: "oklch(95% 0.038 155)",
  },
  {
    slug: "trouble",
    name: "トラブル対応・セキュリティ",
    description: "紛失・不正利用・海外での利用トラブルなど、困ったときの対処法を解説する記事。",
    accent: "oklch(55% 0.17 28)",
    tint: "oklch(95% 0.032 28)",
  },
  {
    slug: "card-reviews",
    name: "個別カードレビュー",
    description: "エポスカード・楽天カードなど、個別のクレジットカードの特徴を紹介する記事。",
    accent: "oklch(52% 0.17 312)",
    tint: "oklch(95% 0.036 312)",
  },
  {
    slug: "life-stage",
    name: "属性別ガイド",
    description: "学生・新社会人・シニア・主婦(主夫)など、属性別のクレジットカード選びガイド。",
    accent: "oklch(56% 0.14 348)",
    tint: "oklch(95% 0.034 348)",
  },
] as const;

export type Category = (typeof categories)[number];

export const findCategory = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);

export type CategorySlug = (typeof categories)[number]["slug"];
