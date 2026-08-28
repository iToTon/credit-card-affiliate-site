// 構造化データ(JSON-LD)を組み立てる純粋関数群。Astroコンポーネント非依存。
import { siteConfig } from "./site.config";

function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

// サイト全体で常に出力する WebSite + Person(運営者)。
// 会社組織ではなく個人運営のため Organization は使わない。
export function websiteGraph() {
  const personId = `${siteConfig.url}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.operator.name,
        email: siteConfig.operator.contact,
        url: absoluteUrl("/about/"),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        inLanguage: siteConfig.lang,
        publisher: { "@id": personId },
      },
    ],
  };
}

interface ArticleSchemaInput {
  title: string;
  description: string;
  href: string;
  pubDate: Date;
  updatedDate?: Date;
  image?: string;
}

// 記事ページ用の Article。author/publisher は websiteGraph() の Person を
// @id 参照せず、その場でインライン展開する(別scriptタグをまたいだ @id 参照は
// 確実にマージされる保証がないため)。
export function articleSchema({ title, description, href, pubDate, updatedDate, image }: ArticleSchemaInput) {
  const person = {
    "@type": "Person",
    name: siteConfig.operator.name,
    url: absoluteUrl("/about/"),
  };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(href),
    inLanguage: siteConfig.lang,
    datePublished: pubDate.toISOString(),
    dateModified: (updatedDate ?? pubDate).toISOString(),
    image: absoluteUrl(image ?? siteConfig.defaultOgImage),
    author: person,
    publisher: person,
  };
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

// Breadcrumbs.astro と同じ items 配列をそのまま渡せる形にしてある。
export function breadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}
