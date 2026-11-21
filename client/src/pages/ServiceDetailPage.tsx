import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Maximize2, X } from 'lucide-react';
import { SEO } from '../shared/components/SEO';
import { Eyebrow } from '../shared/components/Eyebrow';
import { PageHero } from '../shared/components/PageHero';
import { ContactCTA } from '../shared/components/ContactCTA';
import { Button } from '../shared/components/Button';
import { MotionReveal } from '../shared/components/MotionReveal';
import {
  SERVICES_DATA,
  getServiceByIdOrSlug,
  ServiceCard
} from '../features/services-catalog';
import { useProjects } from '../features/projects';
import { getMediaUrl } from '../shared/utils/mediaUrl';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);

  // Scroll to top on navigation or service switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Lock background scroll and listen for Escape key when preview is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedLightboxImage(null);
      }
    };
    if (selectedLightboxImage) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedLightboxImage]);

  const service = id ? getServiceByIdOrSlug(id) : undefined;

  // Query live uploaded projects assigned specifically to this service
  const { data: projectsData, isLoading: isProjectsLoading, isError: isProjectsError } = useProjects({
    service: service?.id
  });

  const serviceProjects = projectsData?.projects || [];

  // Fallback view when an unrecognized service ID is accessed
  if (!service) {
    return (
      <div className="flex flex-col min-h-screen">
        <SEO title="Service Not Found" noindex={true} />
        <PageHero
          backgroundImage={SERVICES_DATA[0].heroImage}
          eyebrow="Our Services"
          title="Service Not Found"
          description="The requested service category could not be located. Explore our core interior design and furniture solutions below."
        />

        <section className="py-20 md:py-28 px-6 md:px-10 lg:px-14 max-w-[1320px] mx-auto w-full text-center">
          <p className="font-montserrat text-body-lg text-stone-taupe mb-8 max-w-xl mx-auto">
            Please select from our available design and execution disciplines:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {SERVICES_DATA.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
          <Button variant="dark-primary" size="md" onClick={() => navigate('/services')} withArrow>
            Return to All Services
          </Button>
        </section>

        <ContactCTA />
      </div>
    );
  }

  // Other services for bottom switcher
  const otherServices = SERVICES_DATA.filter((s) => s.id !== service.id);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.title,
        description: service.shortDescription,
        provider: {
          '@type': 'HomeAndConstructionBusiness',
          name: 'Vandevi Infrastructure',
          url: 'https://vandeviinfrastructure.com'
        },
        url: `https://vandeviinfrastructure.com/services/${service.slug}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://vandeviinfrastructure.com/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: 'https://vandeviinfrastructure.com/services'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.title,
            item: `https://vandeviinfrastructure.com/services/${service.slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="flex flex-col">
      <SEO
        title={`${service.title} · Design & Execution`}
        description={service.shortDescription}
        canonicalPath={`/services/${service.slug}`}
        keywords={`${service.title}, interior design, ${service.inclusions.slice(0, 4).join(', ')}`}
        structuredData={structuredData}
      />
      {/* SECTION 1: HERO WITH BREADCRUMB */}
      <PageHero
        backgroundImage={service.heroImage || service.imageUrl}
        eyebrow="Our Services"
        title={service.title}
        description={service.tagline || service.shortDescription}
      >
        <div className="flex items-center gap-3 pt-2">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-ivory/15 hover:bg-ivory/25 text-ivory text-xs font-montserrat font-medium tracking-wide backdrop-blur-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Services</span>
          </Link>
          <span className="text-ivory/50 text-xs">/</span>
          <span className="text-gold text-xs font-montserrat font-medium tracking-wide">
            {service.title}
          </span>
        </div>
      </PageHero>

      {/* SECTION 2: SERVICE OVERVIEW & INCLUSIONS (2-COLUMN ARCHITECTURAL SPREAD) */}
      <section className="py-20 md:py-28 w-full">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Narrative & Key Highlights */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <MotionReveal delay={0.1} direction="up">
                <Eyebrow color="gold" className="mb-4">
                  Overview &amp; Approach
                </Eyebrow>

                <h2 className="font-montserrat font-semibold text-heading sm:text-page-title text-soft-charcoal leading-tight tracking-tight mb-6">
                  Crafting Purposeful Spaces for{' '}
                  <span className="text-gold">{service.title}</span>
                </h2>

                <p className="font-montserrat text-body-lg text-soft-charcoal/90 leading-relaxed mb-5">
                  {service.fullDescription}
                </p>

                <p className="font-montserrat text-body sm:text-body-lg text-stone-taupe leading-relaxed mb-8">
                  {service.overviewNarrative}
                </p>
              </MotionReveal>
            </div>

            {/* Right Column: Inclusions & Direct CTA */}
            <div className="lg:col-span-5 w-full lg:sticky lg:top-28">
              <MotionReveal delay={0.2} direction="up">
                <div className="lg:pl-8 xl:pl-10 lg:border-l lg:border-stone-taupe/30 flex flex-col">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-2.5 h-[2px] bg-gold" aria-hidden="true" />
                    <span className="font-montserrat font-semibold text-[11px] uppercase tracking-[0.22em] text-gold">
                      Scope of Work
                    </span>
                  </div>

                  <h3 className="font-montserrat font-bold text-[22px] sm:text-[26px] text-soft-charcoal tracking-tight leading-snug mb-3">
                    Service Deliverables &amp; <span className="text-gold">Inclusions</span>
                  </h3>

                  <p className="font-montserrat text-body-sm text-stone-taupe mb-6 leading-relaxed">
                    Every project is customized to your spatial footprint, material preferences, and functional priorities:
                  </p>

                  {/* Bold Architectural Inclusions List */}
                  <div className="divide-y divide-stone-taupe/20 border-y border-stone-taupe/30 mb-8">
                    {service.inclusions.map((item, idx) => (
                      <div key={idx} className="py-3.5 flex items-center gap-3.5 group transition-colors">
                        <span className="font-montserrat font-light text-base sm:text-lg text-gold/90 shrink-0 w-7">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="font-montserrat font-bold text-[14px] sm:text-[15px] text-soft-charcoal tracking-tight group-hover:text-gold transition-colors duration-200">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Direct Action Link */}
                  <Link
                    to={`/contact?subject=${encodeURIComponent(`Enquiry for ${service.title}`)}`}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-pill bg-soft-charcoal text-ivory hover:bg-gold hover:text-soft-charcoal font-montserrat font-semibold text-sm transition-all group shadow-xs"
                  >
                    <span>Discuss Your {service.title} Project</span>
                    <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
                  </Link>
                </div>
              </MotionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: UPLOADED VISUAL PORTFOLIO FOR THIS SERVICE */}
      <section className="w-full border-t border-stone-taupe/20 py-20 md:py-28 bg-sand-beige/10">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 w-full">
          <MotionReveal delay={0.1} direction="up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
              <div>
                <Eyebrow color="gold" className="mb-3">
                  Visual Portfolio
                </Eyebrow>
                <h2 className="font-montserrat font-semibold text-heading sm:text-page-title text-soft-charcoal leading-tight tracking-tight">
                  Selected Concepts &amp; <span className="text-gold">Finishes</span>
                </h2>
              </div>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 font-montserrat text-sm font-semibold text-soft-charcoal hover:text-gold transition-colors"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4.5 h-4.5" strokeWidth={2.2} />
              </Link>
            </div>
          </MotionReveal>

          {/* Loading Skeleton State */}
          {isProjectsLoading && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
              {['aspect-[4/3]', 'aspect-[3/4]', 'aspect-[16/10]', 'aspect-[1/1]', 'aspect-[4/3]', 'aspect-[3/4]'].map((aspect, idx) => (
                <div
                  key={idx}
                  className={`break-inside-avoid mb-6 rounded-[20px] bg-sand-beige/35 border border-stone-taupe/20 animate-pulse ${aspect}`}
                />
              ))}
            </div>
          )}

          {/* Error State */}
          {isProjectsError && (
            <div className="p-8 text-center bg-sand-beige/20 border border-stone-taupe/30 rounded-[20px]">
              <p className="font-montserrat text-stone-taupe">
                Unable to load portfolio images right now. Please refresh or explore our projects page.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isProjectsLoading && !isProjectsError && serviceProjects.length === 0 && (
            <div className="py-14 px-6 text-center bg-ivory border border-stone-taupe/25 rounded-[24px]">
              <h3 className="font-montserrat font-semibold text-title text-soft-charcoal mb-2">
                Portfolio Concepts Updating
              </h3>
              <p className="font-montserrat text-stone-taupe max-w-md mx-auto text-body-sm leading-relaxed mb-6">
                New curated portfolio entries for {service.title} are currently being prepared. Explore our full gallery of works across all categories.
              </p>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 font-montserrat text-sm font-semibold px-6 py-2.5 rounded-pill bg-soft-charcoal text-ivory hover:bg-gold hover:text-soft-charcoal transition-all shadow-xs"
              >
                <span>Explore Full Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Pinterest-style Masonry Gallery of Live Uploaded Projects */}
          {!isProjectsLoading && !isProjectsError && serviceProjects.length > 0 && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
              {serviceProjects.map((project, idx) => {
                const rawImg = project.imageUrl || project.thumbnailUrl;
                const projectImg = getMediaUrl(rawImg);
                return (
                  <MotionReveal key={project._id} delay={0.06 * (idx + 1)} direction="up">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedLightboxImage(projectImg)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedLightboxImage(projectImg);
                        }
                      }}
                      aria-label={`View full size ${project.title}`}
                      className="break-inside-avoid mb-6 rounded-[20px] overflow-hidden bg-sand-beige/30 border border-stone-taupe/25 group relative cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <img
                        src={projectImg}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                      />

                      {/* Corner Zoom Button */}
                      <div className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-sm pointer-events-none">
                        <Maximize2 className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </div>
                  </MotionReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Fullscreen Image Preview Modal */}
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
            alt="Portfolio concept preview"
            className="max-h-[90vh] max-w-[92vw] rounded-[14px] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* SECTION 4: EXPLORE OTHER SERVICES SWITCHER */}
      <section className="bg-sand-beige/15 border-t border-stone-taupe/20 py-20 md:py-24 w-full">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 w-full">
          <MotionReveal delay={0.1} direction="up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <Eyebrow color="gold" className="mb-3">
                  Explore More
                </Eyebrow>
                <h2 className="font-montserrat font-semibold text-heading sm:text-page-title text-soft-charcoal leading-tight tracking-tight">
                  Other Interior Solutions
                </h2>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 font-montserrat text-sm font-semibold text-soft-charcoal hover:text-gold transition-colors"
              >
                <span>View Full Services Overview</span>
                <ArrowRight className="w-4.5 h-4.5" strokeWidth={2.2} />
              </Link>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((other, idx) => (
              <MotionReveal key={other.id} delay={0.08 * (idx + 1)} direction="up">
                <ServiceCard service={other} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: GLOBAL CONTACT CTA BAND */}
      <ContactCTA />
    </div>
  );
};
