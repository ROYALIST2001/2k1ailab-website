import { ServiceCard } from '@/components/sections/service-card';
import { SectionHeading } from '@company/ui';
import { services } from '@/content/services';

export function Services() {
  return (
    <section id="services" className="theme-light bg-canvas text-ink">
      <div className="mx-auto max-w-[1320px] px-6 pt-24 pb-[110px] md:px-12">
        <SectionHeading number="01" label="What we do" className="mb-14" />

        <div className="grid gap-5 sm:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
          {services.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
