import React from 'react';
import { SEO } from '../shared/components/SEO';
import { PageHero } from '../shared/components/PageHero';
import { MotionReveal } from '../shared/components/MotionReveal';
import { Eyebrow } from '../shared/components/Eyebrow';
import { ContactCTA } from '../shared/components/ContactCTA';
import { WhyChooseUs, ServicesSection } from '../features/home';
import {
  ABOUT_HERO_DATA,
  ABOUT_INTRO_DATA,
  ABOUT_VISION_MISSION_DATA,
  ABOUT_APPROACH_DATA,
  ABOUT_CONTACT_CTA_DATA
} from '../features/about';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <SEO
        title="About Us · Studio Philosophy & Craft"
        description="Learn about Vandevi Infrastructure's architectural journey, client-centric design ethos, and turnkey interior and bespoke furniture craftsmanship across India."
        canonicalPath="/about"
        keywords="interior design firm Delhi, architectural interior studio, bespoke furniture creators, turnkey interior contractors"
      />
      {/* SECTION 1: HERO */}
      <PageHero
        backgroundImage={ABOUT_HERO_DATA.backgroundImage}
        eyebrow={ABOUT_HERO_DATA.eyebrow}
        title={ABOUT_HERO_DATA.title}
        description={ABOUT_HERO_DATA.description}
      />

      {/* SECTION 2: ABOUT US */}
      <section className="bg-sand-beige/25 py-20 md:py-24 border-t border-stone-taupe/20 w-full">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 w-full">
          <MotionReveal delay={0.1} direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 flex flex-col gap-5 text-soft-charcoal leading-relaxed font-montserrat">
                <Eyebrow color="gold" className="mb-1">
                  {ABOUT_INTRO_DATA.eyebrow}
                </Eyebrow>
                <h2 className="font-montserrat font-semibold text-heading sm:text-page-title text-soft-charcoal leading-tight tracking-tight mb-2">
                  {ABOUT_INTRO_DATA.title}
                </h2>
                {ABOUT_INTRO_DATA.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? 'text-body-lg text-soft-charcoal/90'
                        : 'text-body text-stone-taupe leading-relaxed'
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Modern Brand Card */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="w-full aspect-[4/3] rounded-[24px] bg-ivory border border-stone-taupe/30 p-8 sm:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-xs">
                  <span className="font-montserrat font-bold text-[38px] sm:text-[48px] lg:text-[54px] tracking-[-0.03em] text-soft-charcoal uppercase leading-none block">
                    {ABOUT_INTRO_DATA.brandCard.primary}
                  </span>
                  <span className="font-montserrat font-semibold text-[13px] sm:text-[15px] lg:text-[16px] tracking-[0.36em] text-stone-taupe uppercase block mt-3 sm:mt-4">
                    {ABOUT_INTRO_DATA.brandCard.subtitle}
                  </span>
                  <div className="w-12 h-[2px] bg-gold mt-6 rounded-full group-hover:w-20 transition-all duration-300" />
                </div>
              </div>
            </div>
          </MotionReveal>

          {/* Paired Vision & Mission Architectural Blocks */}
          <div className="pt-14 sm:pt-16 border-t border-stone-taupe/25 mt-14 sm:mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <MotionReveal delay={0.15} direction="up">
                <div className="flex flex-col justify-between h-full group">
                  <div>
                    <h3 className="font-montserrat font-semibold text-[22px] sm:text-[24px] text-soft-charcoal mb-3 leading-snug tracking-tight group-hover:text-gold transition-colors duration-200">
                      {ABOUT_VISION_MISSION_DATA.vision.title}
                    </h3>
                    <p className="font-montserrat text-body text-stone-taupe leading-relaxed">
                      {ABOUT_VISION_MISSION_DATA.vision.description}
                    </p>
                  </div>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.2} direction="up">
                <div className="flex flex-col justify-between h-full group">
                  <div>
                    <h3 className="font-montserrat font-semibold text-[22px] sm:text-[24px] text-soft-charcoal mb-3 leading-snug tracking-tight group-hover:text-gold transition-colors duration-200">
                      {ABOUT_VISION_MISSION_DATA.mission.title}
                    </h3>
                    <p className="font-montserrat text-body text-stone-taupe leading-relaxed">
                      {ABOUT_VISION_MISSION_DATA.mission.description}
                    </p>
                  </div>
                </div>
              </MotionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 5 CORE APPROACH TENETS */}
      <section className="py-20 md:py-28 bg-warm-white border-t border-stone-taupe/20 w-full">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Heading & Editorial Manifesto */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <MotionReveal delay={0.1} direction="up">
                <Eyebrow color="gold" className="mb-4">
                  {ABOUT_APPROACH_DATA.eyebrow}
                </Eyebrow>
                <h2 className="font-montserrat font-semibold text-heading sm:text-page-title text-soft-charcoal leading-tight tracking-tight mb-6">
                  {ABOUT_APPROACH_DATA.titlePrefix}
                  <span className="text-gold">{ABOUT_APPROACH_DATA.titleHighlight}</span>
                </h2>
                <p className="font-montserrat text-body sm:text-body-lg text-stone-taupe leading-relaxed">
                  {ABOUT_APPROACH_DATA.description}
                </p>
              </MotionReveal>
            </div>

            {/* Right Column: 5 Architectural Hairline Tenets */}
            <div className="lg:col-span-7 flex flex-col">
              <MotionReveal delay={0.15} direction="up">
                <div>
                  {ABOUT_APPROACH_DATA.tenets.map((tenet) => (
                    <div
                      key={tenet.num}
                      className="border-t border-stone-taupe/30 py-7 sm:py-8 last:border-b border-stone-taupe/30 group transition-colors duration-200"
                    >
                      <div className="flex items-start gap-6 sm:gap-8">
                        {/* Architectural Numeral */}
                        <span className="font-montserrat font-light text-[32px] sm:text-[40px] text-gold/90 leading-none shrink-0 w-12 sm:w-14 tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                          {tenet.num}
                        </span>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-montserrat font-semibold text-[11px] uppercase tracking-widest text-stone-taupe">
                              {tenet.category}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                          </div>

                          <h3 className="font-montserrat font-semibold text-lg sm:text-xl text-soft-charcoal tracking-tight mb-2 group-hover:text-gold transition-colors duration-200">
                            {tenet.title}
                          </h3>

                          <p className="font-montserrat text-body-sm sm:text-body text-stone-taupe leading-relaxed">
                            {tenet.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </MotionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR SERVICES */}
      <ServicesSection />

      {/* SECTION 5: WHY CHOOSE US */}
      <WhyChooseUs showLearnMore={false} />

      {/* SECTION 6: CTA */}
      <ContactCTA
        eyebrow={ABOUT_CONTACT_CTA_DATA.eyebrow}
        title={ABOUT_CONTACT_CTA_DATA.title}
        description={ABOUT_CONTACT_CTA_DATA.description}
        buttonText={ABOUT_CONTACT_CTA_DATA.buttonText}
        buttonLink={ABOUT_CONTACT_CTA_DATA.buttonLink}
      />
    </div>
  );
};
