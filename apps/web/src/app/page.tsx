import { CareersTeaser } from '@/components/sections/careers-teaser';
import { ContactCta } from '@/components/sections/contact-cta';
import { Faq } from '@/components/sections/faq';
import { Hero } from '@/components/sections/hero';
import { Marquee } from '@/components/sections/marquee';
import { Process } from '@/components/sections/process';
import { Services } from '@/components/sections/services';
import { siteConfig } from '@/config/site';
import { faqItems } from '@/content/faq';
import { env } from '@/config/env';

/**
 * Structured data.
 *
 * The FAQ entries are generated from the same content module the page renders,
 * so the two can't drift — a mismatch between visible text and FAQPage markup
 * is a Google policy violation, not just untidy.
 */
function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${env.NEXT_PUBLIC_SITE_URL}/#organization`,
        name: siteConfig.name,
        url: env.NEXT_PUBLIC_SITE_URL,
        description: siteConfig.description,
        email: siteConfig.email,
        // Largest export: Google wants >=112px square for the brand logo.
        logo: `${env.NEXT_PUBLIC_SITE_URL}/images/2K1-logo-512.png`,
      },
      {
        '@type': 'WebSite',
        '@id': `${env.NEXT_PUBLIC_SITE_URL}/#website`,
        url: env.NEXT_PUBLIC_SITE_URL,
        name: siteConfig.name,
        publisher: { '@id': `${env.NEXT_PUBLIC_SITE_URL}/#organization` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Content is authored by us, not user input, so there is nothing to escape.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <Faq />
      <CareersTeaser />
      <ContactCta />
    </>
  );
}
