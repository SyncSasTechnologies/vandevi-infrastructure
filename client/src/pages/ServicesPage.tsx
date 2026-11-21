import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from '../shared/components/SEO';
import { PageHero } from '../shared/components/PageHero';
import { Eyebrow } from '../shared/components/Eyebrow';
import { ContactCTA } from '../shared/components/ContactCTA';
import {
  SERVICES_DATA,
  ServiceDetailPanel,
  SERVICES_PAGE_HERO_DATA,
  SERVICES_PAGE_CATALOG_HEADER_DATA,
  SERVICES_PAGE_CONTACT_CTA_DATA
} from '../features/services-catalog';
import { MotionReveal } from '../shared/components/MotionReveal';

export const ServicesPage: React.FC = () => {
  const { hash } = useLocation();

  // Handle smooth deep-link scrolling to service anchors (e.g. #residential)
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <div className="flex flex-col">
      <SEO
        title="Interior & Architectural Services"
        description="Explore Vandevi Infrastructure's comprehensive services: luxury residential interiors, modern commercial workplaces, bespoke furniture curation, and turnkey renovation."
        canonicalPath="/services"
        keywords="residential interior services, commercial office design, bespoke furniture sourcing, turnkey renovation contractors"
      />
      {/* SECTION 1: HERO */}
      <PageHero
        backgroundImage={SERVICES_PAGE_HERO_DATA.backgroundImage}
        eyebrow={SERVICES_PAGE_HERO_DATA.eyebrow}
        title={SERVICES_PAGE_HERO_DATA.title}
        description={SERVICES_PAGE_HERO_DATA.description}
      />

      {/* SECTION 2: OUR SERVICES CATALOG */}
      <section className="py-20 md:py-28 bg-warm-white border-t border-stone-taupe/20 w-full">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 w-full">
          {/* Section Overview Header */}
          <MotionReveal delay={0.1} direction="up">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <Eyebrow color="gold" className="mb-4">
                {SERVICES_PAGE_CATALOG_HEADER_DATA.eyebrow}
              </Eyebrow>
              <h2 className="font-montserrat font-semibold text-heading sm:text-page-title text-soft-charcoal leading-tight tracking-tight mb-4">
                {SERVICES_PAGE_CATALOG_HEADER_DATA.titlePrefix}
                <span className="text-gold">{SERVICES_PAGE_CATALOG_HEADER_DATA.titleHighlight}</span>
              </h2>
              <p className="font-montserrat text-body sm:text-body-lg text-stone-taupe leading-relaxed">
                {SERVICES_PAGE_CATALOG_HEADER_DATA.description}
              </p>
            </div>
          </MotionReveal>

          {/* 4 Architectural Service Spreads */}
          <div className="flex flex-col">
            {SERVICES_DATA.map((service, idx) => (
              <MotionReveal key={service.id} delay={0.08 * (idx + 1)} direction="up">
                <ServiceDetailPanel service={service} isEven={idx % 2 === 1} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CTA */}
      <ContactCTA
        eyebrow={SERVICES_PAGE_CONTACT_CTA_DATA.eyebrow}
        title={SERVICES_PAGE_CONTACT_CTA_DATA.title}
        description={SERVICES_PAGE_CONTACT_CTA_DATA.description}
        buttonText={SERVICES_PAGE_CONTACT_CTA_DATA.buttonText}
        buttonLink={SERVICES_PAGE_CONTACT_CTA_DATA.buttonLink}
      />
    </div>
  );
};
