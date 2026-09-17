import type { MetadataRoute } from 'next';

import { env } from '@/config/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${env.NEXT_PUBLIC_SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${env.NEXT_PUBLIC_SITE_URL}/contact`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${env.NEXT_PUBLIC_SITE_URL}/careers`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];
}
