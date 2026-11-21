import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ServiceItem } from '../data/services.data';
import { SERVICE_PANEL_UI_TEXT } from '../data/services.data';

interface ServiceDetailPanelProps {
  service: ServiceItem;
  isEven?: boolean;
}

export const ServiceDetailPanel: React.FC<ServiceDetailPanelProps> = ({
  service,
  isEven = false
}) => {
  return (
    <div
      id={service.id}
      className="py-16 sm:py-20 md:py-24 border-t border-stone-taupe/30 first:border-t-0 scroll-mt-24 group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
        {/* Content Column */}
        <div className={`lg:col-span-6 flex flex-col items-start ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          {/* Index & Practice Eyebrow */}
          <div className="flex items-baseline gap-4 mb-4">
            <span className="font-montserrat font-light text-[36px] sm:text-[44px] text-gold/90 leading-none tracking-tight">
              {service.orderNumber}
            </span>
          </div>

          <div className="w-10 h-[2px] bg-gold mb-5 group-hover:w-16 transition-all duration-300" />

          {/* Service Title */}
          <h3 className="font-montserrat font-semibold text-[26px] sm:text-[32px] lg:text-[36px] text-soft-charcoal tracking-tight leading-tight mb-4 group-hover:text-gold transition-colors duration-200">
            {service.title}
          </h3>

          {/* Description */}
          <p className="font-montserrat text-body sm:text-body-lg text-stone-taupe leading-relaxed mb-6">
            {service.fullDescription}
          </p>

          {/* Scope of Work */}
          <div className="w-full pt-5 pb-6 border-t border-stone-taupe/25 mb-6">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2.5 h-[2px] bg-gold" aria-hidden="true" />
              <h4 className="font-montserrat font-bold text-sm sm:text-[15px] uppercase tracking-[0.16em] text-soft-charcoal">
                {SERVICE_PANEL_UI_TEXT.scopeTitlePrefix}
                <span className="text-gold">{SERVICE_PANEL_UI_TEXT.scopeTitleHighlight}</span>
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {service.inclusions.map((inclusion, idx) => (
                <div key={idx} className="flex items-start gap-2.5 group/item">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0 transition-transform group-hover/item:scale-125" aria-hidden="true" />
                  <span className="font-montserrat font-medium text-[13px] sm:text-[14px] text-soft-charcoal/90 leading-snug">
                    {inclusion}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              to={`/services/${service.id}`}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-pill bg-soft-charcoal text-ivory hover:bg-gold hover:text-soft-charcoal font-montserrat text-sm font-semibold transition-all group/btn shadow-xs"
            >
              <span>{SERVICE_PANEL_UI_TEXT.exploreDetailsLabel}</span>
              <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover/btn:translate-x-1" strokeWidth={2.2} />
            </Link>

            <Link
              to={`/contact?subject=${encodeURIComponent(`Enquiry for ${service.title}`)}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-pill border border-soft-charcoal/30 hover:border-gold hover:bg-gold hover:text-soft-charcoal text-soft-charcoal font-montserrat text-sm font-semibold transition-all"
            >
              <span>{SERVICE_PANEL_UI_TEXT.discussProjectLabel}</span>
            </Link>
          </div>
        </div>

        {/* Visual Column */}
        <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="relative aspect-[16/11] sm:aspect-[4/3] rounded-[20px] overflow-hidden bg-sand-beige/30 border border-stone-taupe/25 shadow-xs">
            <img
              src={service.imageUrl}
              alt={service.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            />
            {/* Architectural Label Badge */}
            <div className="absolute bottom-3 left-3 z-10">
              <span className="inline-block bg-black/65 backdrop-blur-xs text-white text-[11px] sm:text-[12px] font-montserrat font-medium px-3 py-1.5 rounded-[6px] tracking-tight">
                {service.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
