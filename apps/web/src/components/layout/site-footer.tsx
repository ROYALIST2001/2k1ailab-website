import Image from 'next/image';

import { siteConfig } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="text-ink-faint flex flex-wrap items-center justify-between gap-6 px-6 py-10 font-mono text-[13px] md:px-12">
      <span className="text-ink flex items-center gap-2 font-sans text-base font-semibold tracking-[0.14em]">
        <Image src={siteConfig.logo} alt="" width={24} height={24} className="rounded-md" />
        {siteConfig.name}
      </span>
      <span>
        © {new Date().getFullYear()} {siteConfig.name}. {siteConfig.tagline}
      </span>
    </footer>
  );
}
