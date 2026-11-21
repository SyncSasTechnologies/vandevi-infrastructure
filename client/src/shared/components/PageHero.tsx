import React from 'react';
import { Eyebrow } from './Eyebrow';
import { MotionReveal } from './MotionReveal';

interface PageHeroProps {
  backgroundImage: string;
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  backgroundImage,
  eyebrow,
  title,
  description,
  children,
}) => {
  return (
    <section className="relative w-full overflow-hidden min-h-[460px] sm:min-h-[500px] md:min-h-[540px] lg:min-h-[580px] h-[calc(80vh-76px)] md:h-[calc(82vh-84px)] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />

      {/* Slight Soft Charcoal Gradient (Preserves image clarity while ensuring ivory text contrast) */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-soft-charcoal/80 via-soft-charcoal/45 to-soft-charcoal/15 lg:via-soft-charcoal/40 lg:via-45% lg:to-transparent z-[1] pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero Content Area */}
      <div className="relative z-10 px-6 md:px-10 lg:px-14 py-8 sm:py-10 md:py-12 lg:py-14 max-w-[1320px] mx-auto w-full">
        <div className="max-w-3xl">
          <MotionReveal delay={0.1} direction="up">
            <Eyebrow color="ivory" className="mb-4">
              {eyebrow}
            </Eyebrow>

            <h1 className="font-montserrat font-semibold text-page-title sm:text-display text-ivory leading-tight tracking-tight mb-6">
              {title}
            </h1>

            <p className="font-montserrat text-body-lg text-ivory leading-relaxed">
              {description}
            </p>

            {children && <div className="mt-8">{children}</div>}
          </MotionReveal>
        </div>
      </div>
    </section>
  );
};
