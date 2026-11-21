import React from 'react';
import { SEO } from '../shared/components/SEO';
import { PageHero } from '../shared/components/PageHero';
import { ContactCTA } from '../shared/components/ContactCTA';
import { ProjectCategoryGallery } from '../features/projects';
import modernOfficeServiceImg from '../assets/images/modern_office_service.png';

export const OurProjectsPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <SEO
        title="Portfolio & Visual Gallery"
        description="Explore Vandevi Infrastructure's portfolio of luxury residential homes, executive workspaces, modular kitchens, and custom furniture craftsmanship."
        canonicalPath="/projects"
        keywords="interior design portfolio, living room concepts, office interiors gallery, modern luxury homes, bespoke cabinetry Delhi"
      />
      {/* SECTION 1: HERO */}
      <PageHero
        backgroundImage={modernOfficeServiceImg}
        eyebrow="Our Projects"
        title="Our Selected Works"
        description="Explore our collection of residential and commercial interior design concepts. Every project reflects a different approach to space planning, materials, colours, lighting, and furniture."
      />

      {/* SECTION 2: CATEGORY-WISE GALLERY & FILTER TABS */}
      <section className="py-20 md:py-28 bg-warm-white border-t border-stone-taupe/20 w-full">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 w-full">
          <ProjectCategoryGallery />
        </div>
      </section>

      {/* SECTION 3: CTA */}
      <ContactCTA />
    </div>
  );
};
