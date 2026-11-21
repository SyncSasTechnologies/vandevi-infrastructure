import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Eyebrow } from '../../../shared/components/Eyebrow';
import { MotionReveal } from '../../../shared/components/MotionReveal';
import { TESTIMONIALS_DATA } from '../data/home.data';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="w-full border-t border-stone-taupe/20 py-20 md:py-28">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 w-full">
        {/* Section Header */}
        <MotionReveal delay={0.1} direction="up">
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <Eyebrow color="gold" className="mb-4">
              {TESTIMONIALS_DATA.eyebrow}
            </Eyebrow>
            <h2 className="font-montserrat font-semibold text-heading sm:text-page-title text-soft-charcoal leading-tight tracking-tight mb-4">
              {TESTIMONIALS_DATA.title}
            </h2>
            <p className="font-montserrat text-body sm:text-body-lg text-stone-taupe leading-relaxed">
              {TESTIMONIALS_DATA.description}
            </p>
          </div>
        </MotionReveal>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS_DATA.testimonials.map((testimonial, idx) => (
            <MotionReveal key={idx} delay={0.08 * (idx + 1)} direction="up">
              <div className="bg-ivory border border-stone-taupe/25 rounded-[22px] p-7 sm:p-8 flex flex-col justify-between h-full hover:border-gold/50 hover:shadow-md transition-all duration-300 shadow-xs group relative">
                <div>
                  {/* Top Bar: 5 Stars + Quote Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className="w-4.5 h-4.5 fill-gold text-gold"
                        />
                      ))}
                    </div>
                    <Quote className="w-7 h-7 text-gold/40 group-hover:text-gold/70 transition-colors" />
                  </div>

                  {/* Quote Body */}
                  <p className="font-montserrat text-body-sm sm:text-body text-soft-charcoal/90 leading-relaxed italic mb-6">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-5 border-t border-stone-taupe/20 mt-auto flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-sand-beige/45 border border-stone-taupe/20 flex items-center justify-center shrink-0">
                    <span className="font-montserrat font-bold text-xs text-soft-charcoal">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-sm text-soft-charcoal tracking-tight">
                      {testimonial.name}
                    </h3>
                    <p className="font-montserrat text-xs text-stone-taupe">
                      {testimonial.projectType} · {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
