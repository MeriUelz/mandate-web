import { publicProcedure } from "../main";
import { db } from "~/server/db";

export const getSitemap = publicProcedure.query(async () => {
  // Fetch all published articles
  const articles = await db.article.findMany({
    where: {
      published: true,
    },
    select: {
      slug: true,
      publishedAt: true,
      createdAt: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
  });

  // Generate sitemap XML
  const staticUrls = [
    {
      loc: 'https://mandate.app/',
      changefreq: 'weekly',
      priority: '1.0',
    },
    {
      loc: 'https://mandate.app/how-it-works-ecosystem',
      changefreq: 'monthly',
      priority: '0.9',
    },
    {
      loc: 'https://mandate.app/use-cases',
      changefreq: 'weekly',
      priority: '0.9',
    },
    {
      loc: 'https://mandate.app/use-cases/ai-usage-based-billing',
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      loc: 'https://mandate.app/developers',
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      loc: 'https://mandate.app/blog',
      changefreq: 'daily',
      priority: '0.8',
    },
  ];

  const articleUrls = articles.map((article) => ({
    loc: `https://mandate.app/blog/${article.slug}`,
    lastmod: (article.publishedAt || article.createdAt).toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.7',
  }));

  const allUrls = [...staticUrls, ...articleUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
});
