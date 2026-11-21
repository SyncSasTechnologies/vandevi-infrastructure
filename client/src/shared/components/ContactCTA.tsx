import React from 'react';
import { Link } from 'react-router-dom';
import { Eyebrow } from './Eyebrow';
import { Button } from './Button';
import { MotionReveal } from './MotionReveal';

export interface ContactCTAProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({
  eyebrow = 'Start A Project',
  title = "Let's Create Something Beautiful Together",
  description = 'Planning a new home interior, renovating an existing space, or designing a commercial environment? We would love to understand your requirements and explore how Vandevi Infrastructure can help bring your ideas to life.',
  buttonText = 'Get in Touch',
  buttonLink = '/contact',
}) => {
  return (
    <section className="bg-soft-charcoal text-ivory py-20 md:py-28 px-6 md:px-10 lg:px-14 border-t border-stone-taupe/30 w-full">
      <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center">
        <MotionReveal delay={0.1} direction="up">
          <Eyebrow color="gold" className="mb-4">
            {eyebrow}
          </Eyebrow>
          <h2 className="font-montserrat font-semibold text-heading sm:text-page-title text-ivory leading-tight tracking-tight mb-6">
            {title}
          </h2>
          <p className="font-montserrat text-body sm:text-body-lg text-ivory/80 max-w-2xl leading-relaxed mb-10 mx-auto">
            {description}
          </p>
          <Link to={buttonLink}>
            <Button variant="dark-primary" size="lg" withArrow>
              {buttonText}
            </Button>
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
};
