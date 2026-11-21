import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Maximize2, SlidersHorizontal, ArrowRight, ChevronDown, RotateCcw } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { FILTER_TAG_GROUPS } from '../types/project.types';
import { getMediaUrl } from '../../../shared/utils/mediaUrl';

export const ProjectCategoryGallery: React.FC = () => {
  // Tier 1: Group selection (All, Residential Spaces, Commercial Spaces, etc.)
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | 'all'>('all');

  // Tier 2: Specific visitor filter tag
  const [activeTag, setActiveTag] = useState<string>('all');

  // Visitor keyword search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Available tags depending on selected group
  const visibleTags = useMemo(() => {
    if (activeGroupIndex === 'all') {
      return FILTER_TAG_GROUPS.flatMap((g) => g.tags);
    }
    return FILTER_TAG_GROUPS[activeGroupIndex]?.tags || [];
  }, [activeGroupIndex]);

  // Fetch projects filtered by visitor tag
  const { data, isLoading, isError } = useProjects({
    tag: activeTag === 'all' ? undefined : activeTag
  });

  const rawProjects = data?.projects || [];

  // Instant real-time search across title, filterTag, and description
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return rawProjects;
    const query = searchQuery.toLowerCase().trim();
    return rawProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        (p.filterTag && p.filterTag.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query)) ||
        (p.slug && p.slug.toLowerCase().includes(query))
    );
  }, [rawProjects, searchQuery]);

  // Fullscreen image preview modal
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);

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

  const handleSelectGroup = (groupIndex: number | 'all') => {
    setActiveGroupIndex(groupIndex);
    setActiveTag('all');
  };

  const handleClearFilters = () => {
    setActiveGroupIndex('all');
    setActiveTag('all');
    setSearchQuery('');
  };

  const isFilterActive = activeTag !== 'all' || activeGroupIndex !== 'all' || Boolean(searchQuery.trim());

  return (
    <div className="w-full font-montserrat">
      {/* ─────────────────────────────────────────────────────────────
          MODERN UNIFIED TOOLBAR: SEARCH & DROPDOWN FILTERS IN SAME LINE
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-3.5 mb-10 sm:mb-14 pb-6 border-b border-stone-taupe/20">
        {/* 1. Real-time Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-stone-taupe absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search spaces, finishes, or concepts..."
            className="w-full pl-11 pr-10 py-2.5 sm:py-3 rounded-full bg-sand-beige/25 border border-stone-taupe/30 text-soft-charcoal text-xs sm:text-sm placeholder:text-stone-taupe/70 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-soft-charcoal/10 hover:bg-soft-charcoal hover:text-ivory text-soft-charcoal flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns Container (Side by side on tablet/desktop, stacked on mobile) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          {/* 2. Discipline / Category Group Dropdown */}
          <div className="relative w-full sm:w-auto min-w-[170px] sm:min-w-[190px]">
            <select
              value={activeGroupIndex}
              onChange={(e) => handleSelectGroup(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              aria-label="Filter by architectural discipline"
              className="w-full appearance-none pl-4 pr-10 py-2.5 sm:py-3 rounded-full bg-white border border-stone-taupe/30 text-soft-charcoal text-xs sm:text-sm font-semibold focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all cursor-pointer shadow-xs"
            >
              <option value="all">All Works</option>
              {FILTER_TAG_GROUPS.map((group, idx) => (
                <option key={group.group} value={idx}>
                  {group.group}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-stone-taupe absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* 3. Space / Craft Tag Dropdown */}
          <div className="relative w-full sm:w-auto min-w-[180px] sm:min-w-[210px]">
            <select
              value={activeTag}
              onChange={(e) => setActiveTag(e.target.value)}
              aria-label="Filter by room, finish, or craft tag"
              className="w-full appearance-none pl-4 pr-10 py-2.5 sm:py-3 rounded-full bg-white border border-stone-taupe/30 text-soft-charcoal text-xs sm:text-sm font-medium focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all cursor-pointer shadow-xs"
            >
              <option value="all">
                {activeGroupIndex === 'all' ? 'All Spaces & Elements' : `All ${FILTER_TAG_GROUPS[activeGroupIndex as number]?.group}`}
              </option>

              {activeGroupIndex === 'all' ? (
                FILTER_TAG_GROUPS.map((g) => (
                  <optgroup key={g.group} label={`── ${g.group} ──`}>
                    {g.tags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </optgroup>
                ))
              ) : (
                visibleTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))
              )}
            </select>
            <ChevronDown className="w-4 h-4 text-stone-taupe absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* 4. Reset Filters Action Button */}
          {isFilterActive && (
            <button
              type="button"
              onClick={handleClearFilters}
              title="Reset all filters and search"
              className="h-10 sm:h-11 px-4 rounded-full border border-stone-taupe/30 hover:border-gold bg-sand-beige/20 hover:bg-gold/15 text-soft-charcoal text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gold" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LOADING SKELETON STATE
      ───────────────────────────────────────────────────────────── */}
      {isLoading && (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance]">
          {[
            'aspect-[4/3]',
            'aspect-[3/4]',
            'aspect-[16/10]',
            'aspect-[4/5]',
            'aspect-[1/1]',
            'aspect-[3/4]',
            'aspect-[4/3]',
            'aspect-[4/5]'
          ].map((aspect, idx) => (
            <div
              key={idx}
              className={`break-inside-avoid mb-6 rounded-[20px] bg-sand-beige/35 border border-stone-taupe/20 animate-pulse ${aspect}`}
            />
          ))}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          ERROR STATE
      ───────────────────────────────────────────────────────────── */}
      {isError && (
        <div className="p-8 sm:p-12 text-center bg-sand-beige/20 border border-stone-taupe/30 rounded-[24px]">
          <p className="font-montserrat text-stone-taupe text-sm sm:text-base mb-4">
            Unable to connect to the project portfolio service right now.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-full bg-soft-charcoal text-ivory text-xs font-semibold hover:bg-gold hover:text-soft-charcoal transition-colors cursor-pointer"
          >
            Refresh Gallery
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          EMPTY STATE (No matching concepts)
      ───────────────────────────────────────────────────────────── */}
      {!isLoading && !isError && filteredProjects.length === 0 && (
        <div className="py-16 sm:py-24 px-6 text-center bg-ivory border border-stone-taupe/25 rounded-[28px] max-w-xl mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-full bg-sand-beige/35 text-stone-taupe flex items-center justify-center mx-auto mb-4">
            <SlidersHorizontal className="w-6 h-6 text-stone-taupe" />
          </div>

          <h3 className="font-semibold text-lg sm:text-xl text-soft-charcoal mb-2">
            {searchQuery ? 'No Concepts Match Your Search' : 'Concepts in Preparation'}
          </h3>

          <p className="text-stone-taupe text-xs sm:text-sm leading-relaxed mb-6">
            {searchQuery
              ? `We couldn't find any concepts matching "${searchQuery}". Try using different terms like "Living", "Linen", "Oak", or clearing your filters.`
              : activeTag !== 'all'
              ? `Curated concepts for "${activeTag}" are currently being photographed and added. Browse all spaces or get in touch for custom previews.`
              : 'New curated concepts are currently being added. Check back soon or contact our design team.'}
          </p>

          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex items-center gap-2 font-montserrat text-xs sm:text-sm font-semibold px-6 py-3 rounded-full bg-soft-charcoal text-ivory hover:bg-gold hover:text-soft-charcoal transition-all cursor-pointer shadow-xs"
          >
            <span>View All Concepts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MASONRY GALLERY OF CONCEPTS (Responsive 1 -> 2 -> 3 -> 4 cols)
      ───────────────────────────────────────────────────────────── */}
      {!isLoading && !isError && filteredProjects.length > 0 && (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance]">
          {filteredProjects.map((project, index) => {
            const rawImg = project.imageUrl || project.thumbnailUrl;
            const projectImg = getMediaUrl(rawImg);
            return (
              <div
                key={project._id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedLightboxImage(projectImg)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedLightboxImage(projectImg);
                  }
                }}
                aria-label={`View ${project.title}`}
                className="break-inside-avoid mb-6 rounded-[20px] overflow-hidden bg-sand-beige/25 border border-stone-taupe/25 group relative cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <img
                  src={projectImg}
                  alt={project.title}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                />

                {/* Corner Zoom Pill */}
                <div className="absolute top-3.5 right-3.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-sm pointer-events-none">
                  <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          FULLSCREEN LIGHTBOX MODAL (Pure image view)
      ───────────────────────────────────────────────────────────── */}
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
            className="absolute top-4 right-4 sm:top-7 sm:right-7 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold z-10 cursor-pointer"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" strokeWidth={2.2} />
          </button>
          <img
            src={selectedLightboxImage}
            alt="Project full preview"
            className="max-h-[90vh] max-w-[92vw] rounded-[16px] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
