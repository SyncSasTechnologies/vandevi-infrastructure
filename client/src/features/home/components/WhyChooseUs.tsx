import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Eyebrow } from '../../../shared/components/Eyebrow';
import { MotionReveal } from '../../../shared/components/MotionReveal';
import { WHY_CHOOSE_US_DATA } from '../data/home.data';

export interface WhyChooseUsProps {
  showLearnMore?: boolean;
  children?: React.ReactNode;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  showLearnMore = true,
  children,
}) => {
  return (
    <section className="bg-sand-beige/25 py-20 md:py-28 border-t border-stone-taupe/20 w-full">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 w-full">
        {/* Section Header */}
        <MotionReveal delay={0.1} direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <Eyebrow color="gold" className="mb-4">
              {WHY_CHOOSE_US_DATA.eyebrow}
            </Eyebrow>
            <h2 className="font-montserrat font-semibold text-heading sm:text-page-title text-soft-charcoal leading-tight tracking-tight mb-4">
              {WHY_CHOOSE_US_DATA.title}
            </h2>
            <p className="font-montserrat text-body sm:text-body-lg text-stone-taupe leading-relaxed">
              {WHY_CHOOSE_US_DATA.description}
            </p>
          </div>
        </MotionReveal>

        {/* 4 Architectural Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {WHY_CHOOSE_US_DATA.points.map((point, idx) => (
            <MotionReveal key={idx} delay={0.08 * (idx + 1)} direction="up">
              <div className="border-t border-stone-taupe/35 pt-7 sm:pt-8 flex flex-col justify-between h-full group">
                <div>
                  {/* Top: Architectural Index + Category */}
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-montserrat font-light text-[34px] sm:text-[40px] text-gold/90 leading-none tracking-tight">
                      {point.index}
                    </span>
                    <span className="font-montserrat font-semibold text-[11px] uppercase tracking-widest text-stone-taupe">
                      {point.category}
                    </span>
                  </div>

                  {/* Architectural Accent Rule */}
                  <div className="w-8 h-[1.5px] bg-gold/60 mb-5 group-hover:w-14 group-hover:bg-gold transition-all duration-300" />

                  {/* Title & Narrative */}
                  <h3 className="font-montserrat font-semibold text-[19px] sm:text-[20px] text-soft-charcoal mb-3 leading-snug tracking-tight group-hover:text-gold transition-colors duration-200">
                    {point.title}
                  </h3>

                  <p className="font-montserrat text-body-sm text-stone-taupe leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Supporting Link */}
        {showLearnMore && (
          <MotionReveal delay={0.3} direction="up">
            <div className="mt-14 sm:mt-18 text-center">
              <Link
                to={WHY_CHOOSE_US_DATA.learnMoreCta.link}
                className="inline-flex items-center gap-2.5 font-montserrat text-sm font-semibold text-soft-charcoal hover:text-gold transition-colors group"
              >
                <span>{WHY_CHOOSE_US_DATA.learnMoreCta.label}</span>
                <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
              </Link>
            </div>
          </MotionReveal>
        )}

        {/* Optional Nested Content (e.g. Vision & Mission on About page) */}
        {children}
      </div>
    </section>
  );
};
