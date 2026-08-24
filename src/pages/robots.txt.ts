import type { APIRoute } from "astro";
import { siteConfig } from "../site.config";

export const GET: APIRoute = () => {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${siteConfig.url}/sitemap-index.xml\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
};
