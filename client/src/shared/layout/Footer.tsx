import React from "react";
import { Link } from "react-router-dom";
import { CONTACT_DATA } from "../data/contact.data";

const QUICK_LINKS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Contact Us", path: "/contact" },
];

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  WhatsApp: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  ),
  Instagram: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Facebook: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
    </svg>
  ),
  LinkedIn: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
    </svg>
  ),
};

export const Footer: React.FC = () => {
  const { brand, studio, social } = CONTACT_DATA;

  return (
    <footer className="relative bg-ivory border-t border-stone-taupe/30 pt-16 md:pt-20 pb-0 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14">
        {/* Top Section: 3 Comprehensive Columns Powered by Central Config */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-14 md:mb-16">
          {/* Brand Info (Left Column: 5 cols) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link
              to="/"
              className="flex flex-col group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm mb-4"
              aria-label={`${brand.name} Home`}
            >
              <span className="font-montserrat font-semibold text-[19px] tracking-[-0.03em] text-soft-charcoal uppercase leading-none">
                {brand.shortName}
              </span>
              <span className="font-montserrat text-[10px] tracking-[0.24em] text-stone-taupe uppercase leading-none mt-1">
                Infrastructure
              </span>
            </Link>

            <span className="font-montserrat font-semibold text-[12px] uppercase tracking-[0.14em] text-stone-taupe mb-3">
              {brand.tagline}
            </span>

            <p className="font-montserrat text-[14px] leading-relaxed text-soft-charcoal/80 max-w-[380px]">
              {brand.philosophy}
            </p>
          </div>

          {/* Quick Links (Middle Column: 3 cols) */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="font-montserrat font-semibold text-[12px] uppercase tracking-[0.18em] text-soft-charcoal mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-montserrat text-[14px] text-soft-charcoal/75 hover:text-soft-charcoal hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us (Right Column: 4 cols) */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="font-montserrat font-semibold text-[12px] uppercase tracking-[0.18em] text-soft-charcoal mb-4">
              Connect With Us
            </h4>
            <p className="font-montserrat text-[13px] text-stone-taupe mb-3">
              Direct social and messaging channels:
            </p>
            <div className="flex flex-col gap-2 text-[13px] font-montserrat">
              {social.channels.map((channel) => (
                <a
                  key={channel.name}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={channel.label}
                  className="group flex items-center justify-between py-1.5 border-b border-stone-taupe/15 max-w-[260px] hover:border-gold/60 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-xs"
                >
                  <span className="text-soft-charcoal/80 group-hover:text-soft-charcoal group-hover:translate-x-0.5 font-medium transition-all duration-200 inline-flex items-center gap-1.5">
                    {channel.name}
                    <svg
                      className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200 text-gold"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                  <span className="text-stone-taupe text-[11px] uppercase tracking-wider font-medium group-hover:text-gold transition-colors">
                    {channel.status}
                  </span>
                </a>
              ))}
            </div>
            <p className="font-montserrat text-micro text-stone-taupe mt-3">
              {social.notice}
            </p>
          </div>
        </div>

        {/* Clean Architectural Horizontal Divider (Matching Reference Image) */}
        <div className="border-t border-stone-taupe/20 pt-8 pb-8">
          {/* Meta Row: Address & Copyright (Left) and Circular Social Badges (Right) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Left: Studio HQ & Copyright */}
            <div className="flex flex-col gap-1.5 text-left">
              <p className="font-montserrat text-[13px] text-soft-charcoal/85 font-medium">
                {studio.footerAddress}
              </p>
              <p className="font-montserrat text-micro text-soft-charcoal">
                {brand.copyrightText}
              </p>
            </div>

            {/* Right: Circular Icon Badges */}
            <div className="flex items-center gap-3" aria-label="Social media channels">
              {social.channels.map((channel) => (
                <a
                  key={channel.name}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={channel.label}
                  title={channel.name}
                  className="w-10 h-10 rounded-full bg-soft-charcoal/5 border border-stone-taupe/30 text-soft-charcoal hover:bg-soft-charcoal hover:text-ivory hover:border-soft-charcoal flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {SOCIAL_ICONS[channel.name] || (
                    <span className="text-xs font-semibold">{channel.name[0]}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Massive Brand Watermark Text (Matching Reference Image Edge Bleed with Soft Charcoal Gradient) */}
      <div 
        className="w-full overflow-hidden select-none pointer-events-none mt-2 sm:mt-4 md:mt-6 -mb-3 sm:-mb-6 md:-mb-10 lg:-mb-14"
        aria-hidden="true"
      >
        <div 
          className="text-center font-montserrat font-extrabold text-[64px] sm:text-[110px] md:text-[160px] lg:text-[220px] xl:text-[255px] tracking-tight leading-none uppercase whitespace-nowrap bg-gradient-to-b from-soft-charcoal/40 via-soft-charcoal/20 to-soft-charcoal/5 bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(180deg, rgba(46, 46, 42, 0.38) 0%, rgba(46, 46, 42, 0.18) 55%, rgba(46, 46, 42, 0.04) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {brand.shortName.toUpperCase()}
        </div>
      </div>
    </footer>
  );
};
