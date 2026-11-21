import React from 'react';
import { MapPin, Clock, Compass, ExternalLink } from 'lucide-react';
import { SEO } from '../shared/components/SEO';
import { Eyebrow } from '../shared/components/Eyebrow';
import { PageHero } from '../shared/components/PageHero';
import { ContactForm } from '../features/leads/components/ContactForm';
import { ContactInfoBlock } from '../features/leads/components/ContactInfoBlock';
import { CONTACT_DATA } from '../shared/data/contact.data';
import contactUsHeroImg from '../assets/images/contact_us_hero.png';

export const ContactUsPage: React.FC = () => {
  const { studio, scope } = CONTACT_DATA;

  return (
    <div className="flex flex-col">
      <SEO
        title="Contact Us · Schedule a Consultation"
        description="Connect with Vandevi Infrastructure in Delhi NCR for project evaluations, site visits, and bespoke turnkey interior consultations."
        canonicalPath="/contact"
        keywords="contact interior designer Delhi, interior consultation appointment, hire commercial interior decorator, turnkey architecture studio"
      />
      {/* SECTION 1: HERO */}
      <PageHero
        backgroundImage={contactUsHeroImg}
        eyebrow="Contact Us"
        title="Let's Create Something Beautiful Together"
        description="Planning a new home interior, renovating an existing space, or designing a commercial environment? We would love to understand your requirements and explore how Vandevi Infrastructure can help bring your ideas to life."
      />

      {/* SECTION 2: CONTACT FORM & DETAILS (SPLIT ARCHITECTURAL GRID) */}
      <section className="py-20 md:py-28 bg-warm-white border-t border-stone-taupe/20 w-full">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct Studio Channels */}
            <div className="lg:col-span-5 w-full">
              <ContactInfoBlock />
            </div>

            {/* Right Column: 7-Field Contact Form */}
            <div className="lg:col-span-7 w-full">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STUDIO LOCATION & MAP */}
      <section className="bg-sand-beige/25 py-20 md:py-28 border-t border-stone-taupe/20 w-full">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 w-full">
          {/* Section Header */}
          <div className="max-w-2xl mb-12 sm:mb-16">
            <Eyebrow color="gold" className="mb-4">
              Our Location
            </Eyebrow>
            <h2 className="font-montserrat font-semibold text-heading sm:text-page-title text-soft-charcoal leading-tight tracking-tight mb-4">
              Our Location in <span className="text-gold">{studio.city}</span>
            </h2>
            <p className="font-montserrat text-body sm:text-body-lg text-stone-taupe leading-relaxed">
              Our primary design office and spatial planning studio. Studio consultations, material palette reviews, and spatial walkthroughs are hosted by prior appointment.
            </p>
          </div>

          {/* Split Architectural Grid: Details & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            {/* Left Details Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="bg-warm-white border border-stone-taupe/25 rounded-[20px] p-6 sm:p-8 flex flex-col gap-6">
                {/* Address Block */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-sand-beige/40 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-soft-charcoal" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-montserrat text-[11px] uppercase tracking-widest text-stone-taupe font-semibold block mb-1">
                      Studio Address
                    </span>
                    <h3 className="font-montserrat font-semibold text-lg text-soft-charcoal tracking-tight mb-1">
                      {studio.addressLine1}
                    </h3>
                    <p className="font-montserrat text-body-sm text-stone-taupe leading-relaxed mb-3">
                      {studio.addressLine2}
                    </p>
                    <a
                      href={studio.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-montserrat text-xs font-semibold text-gold hover:text-soft-charcoal transition-colors uppercase tracking-wider"
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="h-px bg-stone-taupe/20 w-full" />

                {/* Operating Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-sand-beige/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-soft-charcoal" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-montserrat text-[11px] uppercase tracking-widest text-stone-taupe font-semibold block mb-1">
                      Studio Hours
                    </span>
                    <p className="font-montserrat text-body-sm font-medium text-soft-charcoal mb-1">
                      {studio.hoursWeekday}
                    </p>
                    <p className="font-montserrat text-xs text-stone-taupe">
                      {studio.hoursWeekend}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-stone-taupe/20 w-full" />

                {/* Regional Execution Note */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-sand-beige/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Compass className="w-5 h-5 text-soft-charcoal" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-montserrat text-[11px] uppercase tracking-widest text-stone-taupe font-semibold block mb-1">
                      Consultations &amp; Site Audits
                    </span>
                    <p className="font-montserrat text-body-sm text-stone-taupe leading-relaxed">
                      {scope.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Map Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="relative w-full h-full min-h-[420px] rounded-[20px] overflow-hidden border border-stone-taupe/25 shadow-xs bg-sand-beige/30">
                <iframe
                  title={`Vandevi Infrastructure Studio Location - ${studio.city}`}
                  src={studio.embedMapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '420px' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
