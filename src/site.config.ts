// サイト全体の設定を一箇所にまとめたファイル。
// TODO: 実際のドメイン取得後・サイト名/運営者情報が決まり次第、ここを更新してください。

export const siteConfig = {
  // サイト名(仮)
  name: "クレジットカード辞典",
  // サイトの説明(SEOのdescriptionにも使用)
  description: "クレジットカードの比較・選び方を分かりやすく紹介するメディアです。",
  // 本番公開後のURL(末尾スラッシュなし)。astro.config.mjs の `site` とも合わせること。
  url: "https://example.com",
  // デフォルトのOGP画像パス(public/配下に配置)
  defaultOgImage: "/og-default.png",
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

// 記事カテゴリ(サブジャンル)。最初は「クレジットカード比較」のみ。後で追加可能。
export const categories = [
  {
    slug: "credit-card",
    name: "クレジットカード比較",
    description: "年会費・還元率・特典で選ぶクレジットカードの比較記事。",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
