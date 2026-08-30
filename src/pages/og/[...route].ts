import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";
import { siteConfig, findCategory } from "../../site.config";

// SNSシェア時のサムネイル(OGP画像)をビルド時に自動生成する。
// 日本語を描画するにはフォントファイルが必要なため、fonts/ に置いた
// Noto Sans JP(SIL Open Font License)を読み込んでいる。
// このフォントは画像生成にのみ使い、閲覧者には配信されない。

const articles = await getCollection("articles", ({ data }) => !data.draft);

// キーがそのまま /og/<キー>.png のパスになる
const pages: Record<string, { title: string; category?: string }> = {
  // 記事以外のページ(トップ・一覧・運営者情報など)が使う共通画像
  site: { title: siteConfig.description },
};

for (const article of articles) {
  pages[article.id] = { title: article.data.title, category: article.data.category };
}

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages,

  getImageOptions: (_path, page) => ({
    title: page.title,
    description: siteConfig.name,
    // カテゴリーがあればその系統色、無ければサイトの基調色でグラデーションを作る
    bgGradient: gradientFor(page.category),
    // カテゴリー色が変わっても共通で入るブランドのアクセント(ゴールド)
    border: { color: [212, 160, 58], width: 10, side: "block-end" },
    padding: 72,
    font: {
      title: { color: [255, 255, 255], size: 66, lineHeight: 1.4, weight: "Bold", families: ["Noto Sans JP"] },
      description: { color: [226, 234, 248], size: 30, lineHeight: 1.5, families: ["Noto Sans JP"] },
    },
    fonts: ["./fonts/NotoSansJP-VF.ttf"],
  }),
});

// カテゴリーのアクセント色に近いRGBを、暗→やや明のグラデーションとして返す。
// astro-og-canvas は oklch を解釈しないため、ここでは明示的なRGB値を持つ。
function gradientFor(categorySlug?: string): [number, number, number][] {
  const gradients: Record<string, [[number, number, number], [number, number, number]]> = {
    "how-to-choose": [[23, 43, 84], [37, 88, 176]],
    screening: [[38, 32, 84], [77, 62, 173]],
    "how-it-works": [[13, 51, 63], [24, 106, 128]],
    points: [[68, 45, 12], [163, 112, 32]],
    business: [[26, 38, 54], [58, 84, 116]],
    "everyday-payments": [[15, 53, 36], [33, 118, 79]],
    trouble: [[71, 26, 21], [173, 62, 44]],
    "card-reviews": [[54, 26, 71], [130, 60, 172]],
    "life-stage": [[70, 24, 47], [175, 58, 112]],
  };

  const fallback: [[number, number, number], [number, number, number]] = [
    [20, 34, 66],
    [37, 99, 235],
  ];

  if (!categorySlug || !findCategory(categorySlug)) return fallback;
  return gradients[categorySlug] ?? fallback;
}
