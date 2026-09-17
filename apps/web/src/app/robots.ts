import type { MetadataRoute } from 'next';

import { env } from '@/config/env';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // No crawlable content, and every route has side effects.
      disallow: '/api/',
    },
    sitemap: `${env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
