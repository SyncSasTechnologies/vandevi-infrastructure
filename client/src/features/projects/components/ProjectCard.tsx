import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../types/project.types';
import { Badge } from '../../../shared/components/Badge';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  priority?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  priority = false
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={`View ${project.title} concept details`}
      className="group bg-ivory border border-stone-taupe/25 hover:border-stone-taupe/60 rounded-[20px] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <div>
        {/* Image Container with Architectural Framing */}
        <div className="relative w-full aspect-[4/3] rounded-[14px] overflow-hidden bg-sand-beige/30 mb-4 sm:mb-5">
          <img
            src={project.thumbnailUrl || project.imageUrl}
            alt={project.title}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Featured pill if marked */}
          {project.featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-soft-charcoal/85 backdrop-blur-sm text-ivory text-[11px] font-montserrat font-medium px-2.5 py-1 rounded-pill uppercase tracking-wider border border-white/10">
                Featured Work
              </span>
            </div>
          )}
        </div>

        {/* Category & Metadata */}
        <div className="mb-2">
          <Badge variant="default" className="text-[11px]">
            {project.category}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-montserrat font-semibold text-[19px] sm:text-[20px] text-soft-charcoal tracking-tight group-hover:text-soft-charcoal transition-colors mb-2">
          {project.title}
        </h3>

        {/* Description Excerpt */}
        <p className="font-montserrat text-body-sm text-stone-taupe line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Card Footer / View Concept CTA */}
      <div className="pt-4 mt-4 border-t border-stone-taupe/15 flex items-center justify-between text-soft-charcoal group-hover:text-gold transition-colors duration-200">
        <span className="font-montserrat text-[13px] font-medium tracking-wide">
          View Concept
        </span>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-sand-beige/30 group-hover:bg-soft-charcoal group-hover:text-gold flex items-center justify-center transition-all duration-300 shrink-0">
          <ArrowUpRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
};
