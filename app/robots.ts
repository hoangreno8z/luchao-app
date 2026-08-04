import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://luchao-app.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        // Danh sách toàn bộ Bot AI lớn nhất hiện nay (Search, Crawl, Index & Training)
        userAgent: [
          'GPTBot',           // OpenAI ChatGPT Data Crawler
          'ChatGPT-User',     // OpenAI ChatGPT Live Web Browsing
          'Google-Extended',  // Google Gemini / Bard AI Indexer
          'GoogleOther',      // Google AI Supplemental Indexer
          'PerplexityBot',    // Perplexity AI Search Engine
          'ClaudeBot',        // Anthropic Claude AI Indexer
          'Claude-Web',       // Anthropic Claude Live Web Access
          'anthropic-ai',     // Anthropic AI General Crawler
          'Bytespider',       // ByteDance / TikTok / Doubao AI Crawler
          'CCBot',            // Common Crawl (Dùng cho LLaMA, DeepSeek, Mistral)
          'Diffbot',          // Diffbot AI Knowledge Graph Extractor
          'FacebookBot',      // Meta AI Indexer
          'Omgili',           // Webhose / Omgili AI Collector
          'Omgilibot',        // Webhose AI Collector
          'Applebot-Extended',// Apple Intelligence AI Crawler
          'YouBot',           // You.com AI Search Engine
          'Cohere-ai',        // Cohere AI Model Crawler
        ],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
