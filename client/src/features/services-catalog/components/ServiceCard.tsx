import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ServiceItem } from '../data/services.data';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Link
      to={`/services/${service.id}`}
      aria-label={`Learn more about ${service.title}`}
      className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-[20px]"
    >
      {/* Image container */}
      <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-sand-beige/30 mb-3.5 shadow-sm group-hover:shadow-md transition-shadow duration-300">
        <img
          src={service.imageUrl}
          alt={service.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Title and Action Button Below Image */}
      <div className="flex items-center justify-between gap-3 px-1">
        <div className="min-w-0 flex-1">
          <h3
            title={service.title}
            className="font-montserrat font-semibold text-[16px] sm:text-[17px] text-soft-charcoal tracking-tight truncate leading-snug"
          >
            {service.title}
          </h3>
        </div>

        {/* Action Button */}
        <div
          aria-hidden="true"
          className="w-10 h-10 rounded-full bg-sand-beige/50 text-soft-charcoal group-hover:bg-gold group-hover:text-soft-charcoal flex items-center justify-center transition-all duration-300 shrink-0 shadow-xs"
        >
          <ArrowRight
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={2.5}
          />
        </div>
      </div>
    </Link>
  );
};
