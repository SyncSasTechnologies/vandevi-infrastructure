/**
 * ============================================================================
 * VANDEVI INFRASTRUCTURE - CENTRAL CONTACT & STUDIO CONFIGURATION
 * ============================================================================
 * Single source of truth for all company contact details, studio locations,
 * operating hours, direct phone/WhatsApp lines, official email, social channels,
 * and Google Maps integration.
 *
 * When any of these details change in the future, updating this single file will
 * automatically update:
 *   1. Contact Us Page (/contact) - Hero, studio address, hours, interactive map
 *   2. Contact Information Blocks across marketing pages
 *   3. Shared Global Footer - Studio address, copyright, channel status list, and social icon pills
 * ============================================================================
 */

export interface SocialChannel {
  name: string;
  label: string;
  href: string;
  status: string; // e.g. "Active", "To be confirmed"
  isConfirmed: boolean;
  username?: string;
}

export interface StudioLocation {
  city: string;
  region: string;
  addressLine1: string;
  addressLine2: string;
  fullAddress: string;
  footerAddress: string;
  hoursWeekday: string;
  hoursWeekend: string;
  googleMapsUrl: string;
  embedMapSrc: string;
}

export interface ContactInfo {
  phone: {
    primary: string;
    display: string;
    telHref: string;
    note: string;
  };
  whatsapp: {
    number: string;
    display: string;
    chatHref: string;
    note: string;
  };
  email: {
    inquiries: string;
    mailtoHref: string;
    note: string;
  };
  studio: StudioLocation;
  scope: {
    title: string;
    summary: string;
    description: string;
    note: string;
  };
  social: {
    notice: string;
    channels: SocialChannel[];
  };
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    slogan: string;
    philosophy: string;
    copyrightYear: number;
    copyrightText: string;
  };
}

export const CONTACT_DATA: ContactInfo = {
  // Direct Phone Contacts
  phone: {
    primary: "+91 98100 00000",
    display: "+91 98100 00000",
    telHref: "tel:+919810000000",
    note: "Mon – Sat, 10:00 AM – 7:00 PM IST",
  },

  // WhatsApp Messaging
  whatsapp: {
    number: "+91 98100 00000",
    display: "+91 98100 00000",
    chatHref: "https://wa.me/919810000000",
    note: "Direct chat for consultations & appointments",
  },

  // Studio Email Inquiries
  email: {
    inquiries: "contact@vandeviinfrastructure.com",
    mailtoHref: "mailto:contact@vandeviinfrastructure.com",
    note: "Response within 24 business hours",
  },

  // Physical Studio Location & Operating Hours
  studio: {
    city: "Delhi",
    region: "Delhi NCR, India",
    addressLine1: "Vandevi Infrastructure Studio",
    addressLine2: "New Delhi, Delhi 110001, India",
    fullAddress: "Vandevi Infrastructure Studio, New Delhi, Delhi 110001, India",
    footerAddress: "Vandevi Infrastructure Studio, Delhi NCR, India.",
    hoursWeekday: "Monday – Saturday: 10:00 AM – 7:00 PM",
    hoursWeekend: "Sunday: Closed (Site Visits By Pre-Appointment Only)",
    googleMapsUrl: "https://maps.google.com/?q=New+Delhi,+Delhi,+India",
    embedMapSrc: "https://maps.google.com/maps?q=New+Delhi,+Delhi,+India&t=&z=12&ie=UTF8&iwloc=&output=embed",
  },

  // Project Scope & Execution Coverage
  scope: {
    title: "Project Scope",
    summary: "Delhi NCR & Pan-India Execution",
    description: "We handle on-site spatial evaluations across Delhi NCR, with pan-India execution capability for bespoke residential and commercial developments.",
    note: "Residential & Commercial Turnkey",
  },

  // Social & Messaging Channels
  social: {
    notice: "Official links will be activated once verified business channels are finalized.",
    channels: [
      {
        name: "WhatsApp",
        label: "Chat with us on WhatsApp",
        href: "https://wa.me/919810000000",
        status: "Active",
        isConfirmed: true,
        username: "+91 98100 00000",
      },
      {
        name: "Instagram",
        label: "Follow us on Instagram",
        href: "https://instagram.com",
        status: "To be confirmed",
        isConfirmed: false,
        username: "@vandevi.infrastructure",
      },
      {
        name: "Facebook",
        label: "Connect with us on Facebook",
        href: "https://facebook.com",
        status: "To be confirmed",
        isConfirmed: false,
      },
      {
        name: "LinkedIn",
        label: "Follow us on LinkedIn",
        href: "https://linkedin.com",
        status: "To be confirmed",
        isConfirmed: false,
      },
    ],
  },

  // Brand Info & Identity
  brand: {
    name: "Vandevi Infrastructure",
    shortName: "Vandevi",
    tagline: "Interior & Furniture Design",
    slogan: "Designing Spaces. Creating Experiences.",
    philosophy: "Thoughtfully designed spaces for the way people live and work. Transforming houses, workplaces, and commercial environments through refined materials and functional aesthetics.",
    copyrightYear: 2026,
    copyrightText: "© 2026 Vandevi Infrastructure. All rights reserved.",
  },
};
