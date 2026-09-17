import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadEnvConfig } from '@next/env';
import type { NextConfig } from 'next';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.join(currentDir, '..', '..');

/**
 * Next only reads `.env*` files from the app directory, but this repo keeps
 * them at the monorepo root (one `.env.local` for every workspace, and the
 * same `.env` docker-compose reads). Next has already run its own env load
 * by the time this file is evaluated and `@next/env` caches that result, so
 * the reload must be forced to pick up the root files. Keep env files at the
 * root only: this replaces whatever the app-directory pass found.
 */
loadEnvConfig(monorepoRoot, process.env.NODE_ENV !== 'production', console, true);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /**
   * Workspace packages ship TypeScript source rather than compiled output —
   * there is no per-package build step — so Next has to compile them itself.
   */
  transpilePackages: [
    '@company/ui',
    '@company/domain',
    '@company/contracts',
    '@company/application',
    '@company/infrastructure',
  ],

  /**
   * Self-contained server bundle for the Docker image. Without
   * `outputFileTracingRoot`, tracing stops at apps/web and the workspace
   * packages are omitted from the standalone output.
   */
  output: 'standalone',
  outputFileTracingRoot: monorepoRoot,

  // Fail the production build on type or lint errors rather than shipping them.
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
