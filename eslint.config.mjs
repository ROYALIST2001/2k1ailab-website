import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

/**
 * Layer boundary enforcement.
 *
 * The dependency rule is: nothing inner may import something outer.
 *
 *   domain  ←  contracts  ←  application  ←  infrastructure  ←  web
 *                                                    ui  ←  web
 *
 * npm workspaces hoist dependencies to the root, which means a package can
 * physically resolve anything installed anywhere in the repo — the
 * `dependencies` field alone will not stop a bad import. These rules are what
 * actually hold the architecture, so treat a violation here as a design error,
 * not a lint nit.
 */
function layer(name, forbidden, message) {
  return {
    files: [`packages/${name}/src/**/*.{ts,tsx}`],
    rules: {
      'no-restricted-imports': ['error', { patterns: [{ group: forbidden, message }] }],
    },
  };
}

const eslintConfig = [
  {
    ignores: [
      '**/.next/**',
      '**/node_modules/**',
      '**/out/**',
      '**/next-env.d.ts',
      'design/**',
      'apps/api/**',
      'db/**',
    ],
  },

  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    // Without this the Next plugin looks for a pages/ dir at the repo root and
    // warns on every run, because in a monorepo the app is not at the root.
    settings: { next: { rootDir: 'apps/web' } },
  },

  {
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
    },
  },

  // Layer 1 — pure. No framework, no other layer, not even validation.
  layer(
    'domain',
    ['@company/*', 'react', 'react-dom', 'next', 'next/*', 'zod', 'server-only'],
    'domain is the innermost layer: it must not import any other layer or framework.',
  ),

  // Layer 1b — schemas over the domain. Zod is allowed; frameworks are not.
  layer(
    'contracts',
    ['@company/application', '@company/infrastructure', '@company/ui', 'react', 'next', 'next/*'],
    'contracts may depend on domain only.',
  ),

  // Layer 2 — use cases and ports. Must not know any concrete adapter.
  layer(
    'application',
    ['@company/infrastructure', '@company/ui', 'react', 'react-dom', 'next', 'next/*'],
    'application defines ports; it must not import infrastructure or any framework.',
  ),

  // Layer 3 — adapters. Framework-free so a plain Node service can reuse them.
  layer(
    'infrastructure',
    ['@company/ui', 'react', 'react-dom', 'next', 'next/*'],
    'infrastructure must stay framework-agnostic so apps/api can reuse it.',
  ),

  // Design system — presentational only. Must not reach into business layers.
  layer(
    'ui',
    ['@company/domain', '@company/contracts', '@company/application', '@company/infrastructure'],
    'ui is presentational: pass data in as props rather than importing a layer.',
  ),

  // Infrastructure may only be constructed in the composition root.
  {
    files: ['apps/web/src/**/*.{ts,tsx}'],
    ignores: ['apps/web/src/server/container.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@company/infrastructure'],
              message:
                'Import infrastructure only in src/server/container.ts (the composition root). ' +
                'Elsewhere, depend on the ports in @company/application.',
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
