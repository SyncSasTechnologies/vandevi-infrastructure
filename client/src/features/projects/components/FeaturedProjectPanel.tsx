import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { FEATURED_PROJECTS_DATA } from '../data/featuredProjects.data';

export const FeaturedProjectPanel: React.FC = () => {
  // Fullscreen image preview modal matching ServiceDetailPage & ProjectCategoryGallery
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);

  return (
    <section className="w-full border-t border-stone-taupe/25 py-20 md:py-28 relative">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Our Selected Works & 3x2 Project Grid */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* Section Header */}
            <div className="mb-6 sm:mb-8">
              <h2 className="font-montserrat font-semibold text-heading sm:text-page-title tracking-tight leading-tight mb-3">
                <span className="text-soft-charcoal">{FEATURED_PROJECTS_DATA.titlePrefix}</span>
                <span className="text-gold">{FEATURED_PROJECTS_DATA.titleHighlight}</span>
              </h2>
              <p className="font-montserrat text-body sm:text-body-lg text-stone-taupe leading-relaxed max-w-2xl">
                {FEATURED_PROJECTS_DATA.description}
              </p>
            </div>

            {/* Permanent 3-Column x 2-Row Project Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
              {FEATURED_PROJECTS_DATA.works.map((item) => (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedLightboxImage(item.image)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedLightboxImage(item.image);
                    }
                  }}
                  aria-label={`View ${item.title}`}
                  className="group relative aspect-[4/3] rounded-[14px] sm:rounded-[16px] overflow-hidden bg-sand-beige/30 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Dark pill/badge at bottom left matching reference UI */}
                  <div className="absolute bottom-2.5 left-2.5 z-10">
                    <span className="inline-block bg-black/65 backdrop-blur-xs text-white text-[11px] sm:text-[12px] font-montserrat font-medium px-2.5 py-1 rounded-[6px] tracking-tight">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Callout + Actions */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-stone-taupe/25 pt-10 lg:pt-0 lg:pl-8 xl:pl-10 flex flex-col justify-center relative">
            <div className="max-w-md">
              <h3 className="font-montserrat font-semibold text-[26px] sm:text-[32px] lg:text-[36px] text-soft-charcoal leading-snug mb-3">
                {FEATURED_PROJECTS_DATA.calloutHeadingPrefix} <br className="hidden sm:inline" />
                <span className="text-gold">{FEATURED_PROJECTS_DATA.calloutHeadingHighlight}</span>
              </h3>

              <div className="w-12 h-[2.5px] bg-gold rounded-full mb-5" />

              <p className="font-montserrat text-body sm:text-body-lg text-stone-taupe leading-relaxed mb-7">
                {FEATURED_PROJECTS_DATA.calloutDescription}
              </p>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start gap-3">
                <Link
                  to={FEATURED_PROJECTS_DATA.viewAllCta.link}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-pill bg-soft-charcoal text-ivory hover:bg-gold hover:text-soft-charcoal font-montserrat text-sm font-semibold transition-all group shadow-xs"
                >
                  <span>{FEATURED_PROJECTS_DATA.viewAllCta.label}</span>
                  <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                </Link>

                <Link
                  to={FEATURED_PROJECTS_DATA.contactCta.link}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-pill border border-soft-charcoal/30 hover:border-gold bg-transparent hover:bg-gold text-soft-charcoal font-montserrat text-sm font-semibold transition-all group"
                >
                  <span>{FEATURED_PROJECTS_DATA.contactCta.label}</span>
                  <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal (Pure image view) */}
      {selectedLightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setSelectedLightboxImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setSelectedLightboxImage(null)}
            className="absolute top-5 right-5 sm:top-7 sm:right-7 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold z-10 cursor-pointer"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" strokeWidth={2.2} />
          </button>
          <img
            src={selectedLightboxImage}
            alt="Project full preview"
            className="max-h-[90vh] max-w-[92vw] rounded-[14px] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};
