import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../shared/components/SEO';
import { Eyebrow } from '../shared/components/Eyebrow';
import { Button } from '../shared/components/Button';
import { ContactCTA } from '../shared/components/ContactCTA';
import { FeaturedProjectPanel } from '../features/projects';
import {
  WhyChooseUs,
  TestimonialsSection,
  ServicesSection,
  HOME_HERO_DATA,
  HOME_CONTACT_CTA_DATA
} from '../features/home';
import { MotionReveal } from '../shared/components/MotionReveal';

export const HomePage: React.FC = () => {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HOME_HERO_DATA.slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div className="flex flex-col">
      <SEO
        title="Interior & Furniture Design Studio | Delhi NCR"
        description="Vandevi Infrastructure designs luxury residences, executive workplaces, and bespoke commercial environments across Delhi NCR and India."
        canonicalPath="/"
        keywords="interior design Delhi NCR, luxury home interiors, commercial interior architecture, bespoke furniture, turnkey renovation"
      />
      {/* SECTION 1: HERO WITH BACKGROUND CAROUSEL */}
      <section
        className="relative w-full overflow-hidden min-h-[460px] sm:min-h-[500px] md:min-h-[540px] lg:min-h-[580px] h-[calc(80vh-76px)] md:h-[calc(82vh-84px)] flex items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Carousel Slides (No stretching, no white gradient) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {HOME_HERO_DATA.slides.map((slide, idx) => (
            <div
              key={idx}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                currentHeroSlide === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Slight Soft Charcoal Gradient (Leaves background image clearly visible) */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-soft-charcoal/75 via-soft-charcoal/40 to-soft-charcoal/10 lg:via-soft-charcoal/35 lg:via-45% lg:to-transparent z-[1] pointer-events-none"
          aria-hidden="true"
        />

        {/* Hero Content Area */}
        <div className="relative z-10 px-6 md:px-10 lg:px-14 py-8 sm:py-10 md:py-12 lg:py-14 max-w-[1320px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Text Column */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start">
              <MotionReveal delay={0.1} direction="up">
                <Eyebrow color="ivory" className="mb-2.5 sm:mb-3">
                  {HOME_HERO_DATA.eyebrow}
                </Eyebrow>

                <h1 className="font-montserrat font-semibold text-[32px] sm:text-[42px] lg:text-[48px] xl:text-[54px] leading-[1.08] tracking-[-0.03em] text-ivory mb-3 sm:mb-4">
                  {HOME_HERO_DATA.title}
                </h1>

                <p className="font-montserrat text-body sm:text-body-lg text-ivory leading-relaxed mb-3 sm:mb-4">
                  {HOME_HERO_DATA.subtitle}
                </p>

                <p className="font-montserrat text-body-sm text-ivory leading-relaxed mb-6 sm:mb-7 max-w-[500px]">
                  {HOME_HERO_DATA.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-6 sm:mb-7">
                  <Link to={HOME_HERO_DATA.primaryCta.link}>
                    <Button variant="dark-primary" size="md" withArrow>
                      {HOME_HERO_DATA.primaryCta.label}
                    </Button>
                  </Link>
                  <Link to={HOME_HERO_DATA.secondaryCta.link}>
                    <Button
                      variant="secondary"
                      size="md"
                      className="border-ivory/40 text-ivory hover:border-gold hover:bg-gold hover:text-soft-charcoal"
                    >
                      {HOME_HERO_DATA.secondaryCta.label}
                    </Button>
                  </Link>
                </div>

                {/* Minimal Carousel Pagination Dots (No Chevrons) */}
                <div className="flex items-center gap-2 pt-1" role="tablist" aria-label="Hero slide selection">
                  {HOME_HERO_DATA.slides.map((slide, idx) => (
                    <button
                      key={idx}
                      type="button"
                      role="tab"
                      aria-selected={currentHeroSlide === idx}
                      aria-label={`Slide ${idx + 1}: ${slide.title}`}
                      onClick={() => setCurrentHeroSlide(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold shadow-xs cursor-pointer ${
                        currentHeroSlide === idx
                          ? 'w-8 bg-gold'
                          : 'w-2.5 bg-ivory/35 hover:bg-ivory/70'
                      }`}
                    />
                  ))}
                </div>
              </MotionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR SERVICES PREVIEW */}
      <ServicesSection />

      {/* SECTION 3: WHY CHOOSE US */}
      <WhyChooseUs />

      {/* SECTION 4: TESTIMONIALS */}
      <TestimonialsSection />

      {/* SECTION 5: OUR PROJECTS PREVIEW */}
      <MotionReveal delay={0.15} direction="up" className="w-full">
        <FeaturedProjectPanel />
      </MotionReveal>

      {/* SECTION 6: CONTACT US / CTA BAND */}
      <ContactCTA
        eyebrow={HOME_CONTACT_CTA_DATA.eyebrow}
        title={HOME_CONTACT_CTA_DATA.title}
        description={HOME_CONTACT_CTA_DATA.description}
        buttonText={HOME_CONTACT_CTA_DATA.buttonText}
        buttonLink={HOME_CONTACT_CTA_DATA.buttonLink}
      />
    </div>
  );
};
