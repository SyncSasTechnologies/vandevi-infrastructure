import React from 'react';
import { Link } from 'react-router-dom';
import { Eyebrow } from '../../../shared/components/Eyebrow';
import { MotionReveal } from '../../../shared/components/MotionReveal';
import { SERVICES_DATA, ServiceCard } from '../../services-catalog';
import { SERVICES_SECTION_DATA } from '../data/home.data';

export interface ServicesSectionProps {
  showViewAll?: boolean;
  className?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  showViewAll = true,
  className = '',
}) => {
  return (
    <section className={`py-20 md:py-28 border-t border-stone-taupe/20 w-full ${className}`}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 w-full">
        <MotionReveal delay={0.1} direction="up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 lg:gap-10">
            {/* Left: Eyebrow + Heading */}
            <div className="max-w-xl">
              <Eyebrow color="gold" className="mb-4">
                {SERVICES_SECTION_DATA.eyebrow}
              </Eyebrow>
              <h2 className="font-montserrat font-semibold text-heading sm:text-page-title text-soft-charcoal leading-tight tracking-tight">
                {SERVICES_SECTION_DATA.title}
              </h2>
            </div>

            {/* Right: Supporting Copy */}
            <div className="max-w-md lg:pb-1">
              <p className="font-montserrat text-body text-stone-taupe leading-relaxed">
                {SERVICES_SECTION_DATA.description}
              </p>
            </div>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service, idx) => (
            <MotionReveal key={service.id} delay={0.08 * (idx + 1)} direction="up">
              <ServiceCard service={service} />
            </MotionReveal>
          ))}
        </div>

        {/* Centered Action Button Below Service Cards */}
        {showViewAll && (
          <MotionReveal delay={0.35} direction="up">
            <div className="mt-12 sm:mt-16 flex justify-center">
              <Link
                to={SERVICES_SECTION_DATA.viewAllCta.link}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-pill border border-soft-charcoal/30 hover:border-gold bg-transparent hover:bg-gold text-soft-charcoal font-montserrat text-sm font-semibold transition-all group"
              >
                <span>{SERVICES_SECTION_DATA.viewAllCta.label}</span>
              </Link>
            </div>
          </MotionReveal>
        )}
      </div>
    </section>
  );
};
