import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['Google-Extended', 'GPTBot', 'PerplexityBot', 'ClaudeBot', 'Bingbot', 'CCBot'],
        allow: '/',
      },
    ],
    sitemap: 'https://luchao-app.vercel.app/sitemap.xml',
    host: 'https://luchao-app.vercel.app',
  };
}
