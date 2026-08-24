// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

import { siteConfig } from './src/site.config.ts';

// https://astro.build/config
export default defineConfig({
  // TODO: ドメイン取得後、src/site.config.ts の url を更新すればここも連動します
  site: siteConfig.url,
  integrations: [sitemap(), mdx()],

  vite: {
    plugins: [tailwindcss()]
  }
});