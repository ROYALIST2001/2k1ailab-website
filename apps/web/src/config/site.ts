/**
 * Single source of truth for company identity and navigation.
 */
export const siteConfig = {
  /** Company name. Rendered in the header, footer and page titles. */
  name: '2K1 AI LAB',

  /**
   * Logo mark, served from apps/web/public. Rendered beside the name in the
   * header and footer via next/image, and referenced by the Organization
   * JSON-LD. The favicon is a separate copy at apps/web/src/app/icon.png.
   */
  logo: '/images/2K1-logo-256.png',

  /** Short tagline. Used in the footer and as a metadata fallback. */
  tagline: 'Technology solutions for business.',

  description:
    '2K1 AI LAB designs, builds and supports technology for businesses: websites and apps, business systems, AI and automation, connected devices and cloud.',

  /** Primary inbox. Every mailto: on the site points here. */
  email: 'hello@2k1ailab.com',

  /**
   * Canonical origin, no trailing slash. Reference only — nothing reads this.
   * Metadata, sitemap.xml and robots.txt all build their URLs from
   * NEXT_PUBLIC_SITE_URL, which is inlined at build time. Changing this field
   * will not change them.
   */
  url: 'https://2k1ailab.com',

  /** Disciplines shown in the hero eyebrow and the marquee. */
  disciplines: ['Software', 'Design', 'AI', 'Automation', 'IoT', 'Support'],

  /**
   * Toggles the "Taking on new projects this quarter" badge in the contact
   * section. Mirrors the `showAvailability` prop from the design.
   */
  showAvailability: true,

  nav: [
    { label: 'Home', href: '/#top' },
    { label: 'Services', href: '/#services' },
    { label: 'Process', href: '/#process' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Careers', href: '/careers' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
