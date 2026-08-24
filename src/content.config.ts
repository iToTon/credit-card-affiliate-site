import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // src/site.config.ts の categories.slug と対応させる
    category: z.string(),
    // 公開日 / 更新日(YYYY-MM-DD)
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // 下書きはtrueにするとビルド時に一覧・サイトマップから除外される
    draft: z.boolean().default(false),
    // OGP画像(public/配下のパス)。未指定ならデフォルト画像を使用
    ogImage: z.string().optional(),
  }),
});

export const collections = { articles };
