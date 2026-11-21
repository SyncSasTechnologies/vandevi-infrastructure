import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Eyebrow } from '../../../shared/components/Eyebrow';
import { CONTACT_DATA } from '../../../shared/data/contact.data';

export const ContactInfoBlock: React.FC = () => {
  const { phone, email, studio, scope } = CONTACT_DATA;

  const contactDetails = [
    {
      icon: Phone,
      label: 'Direct Phone & WhatsApp',
      value: phone.display,
      note: phone.note,
      href: phone.telHref
    },
    {
      icon: Mail,
      label: 'Studio Inquiries',
      value: email.inquiries,
      note: email.note,
      href: email.mailtoHref
    },
    {
      icon: MapPin,
      label: 'Studio Location & Region',
      value: `${studio.city} & NCR · India`,
      note: 'Visits & on-site audits by appointment',
      href: studio.googleMapsUrl
    },
    {
      icon: Clock,
      label: scope.title,
      value: scope.summary,
      note: scope.note,
      href: undefined
    }
  ];

  return (
    <div className="flex flex-col">
      <Eyebrow color="gold" className="mb-3">
        Contact US
      </Eyebrow>

      <h2 className="font-montserrat font-semibold text-heading sm:text-page-title text-soft-charcoal leading-tight tracking-tight mb-4">
        Start a Conversation with <span className="text-gold">US</span>
      </h2>

      <p className="font-montserrat text-body sm:text-body-lg text-stone-taupe leading-relaxed mb-8">
        Connect directly with our design principals and spatial planning team. Whether you are envisioning a private residence, an executive commercial workspace, or bespoke joinery, we guide you from concept through completion.
      </p>

      {/* Architectural Hairline Contact Rows */}
      <div className="border-t border-stone-taupe/25">
        {contactDetails.map((item) => (
          <div
            key={item.label}
            className="py-4 sm:py-5 border-b border-stone-taupe/20 flex items-start gap-4 group transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-sand-beige/40 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-soft-charcoal transition-colors duration-200">
              <item.icon className="w-5 h-5 text-soft-charcoal group-hover:text-gold transition-colors duration-200" strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-montserrat text-[11px] uppercase tracking-widest text-stone-taupe font-semibold mb-1">
                {item.label}
              </span>
              {item.href ? (
                <a
                  href={item.href}
                  className="font-montserrat font-semibold text-base sm:text-lg text-soft-charcoal hover:text-gold transition-colors tracking-tight"
                >
                  {item.value}
                </a>
              ) : (
                <span className="font-montserrat font-semibold text-base sm:text-lg text-soft-charcoal tracking-tight">
                  {item.value}
                </span>
              )}
              <span className="font-montserrat text-xs text-stone-taupe mt-0.5">
                {item.note}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 mt-2 flex items-center gap-3 text-stone-taupe text-xs font-montserrat">
        <span className="w-6 h-px bg-gold shrink-0" aria-hidden="true" />
        <span>Consultation visits and on-site spatial audits are scheduled by prior appointment.</span>
      </div>
    </div>
  );
};


