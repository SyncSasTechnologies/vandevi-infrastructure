import livingRoomHeroImg from '../../../assets/images/living_room_hero.png';
import modernOfficeHeroImg from '../../../assets/images/modern_office_hero.png';

export interface HeroSlide {
  image: string;
  alt: string;
  title: string;
}

export interface HomeHeroData {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: {
    label: string;
    link: string;
  };
  secondaryCta: {
    label: string;
    link: string;
  };
  slides: HeroSlide[];
}

export const HOME_HERO_DATA: HomeHeroData = {
  eyebrow: 'Interior · Furniture · Spaces',
  title: 'Designing Spaces. Creating Experiences.',
  subtitle:
    'Transforming houses, workplaces, and commercial spaces into beautiful, functional, and inspiring environments.',
  description:
    'Vandevi Infrastructure specializes in interior and furniture design, bringing together thoughtful layouts, refined materials, modern aesthetics, and functional solutions to create spaces that reflect your lifestyle and vision.',
  primaryCta: {
    label: 'Explore Our Projects',
    link: '/projects'
  },
  secondaryCta: {
    label: 'Get in Touch',
    link: '/contact'
  },
  slides: [
    {
      image: livingRoomHeroImg,
      alt: 'Vandevi Infrastructure residential interior design living space',
      title: 'Residential Interiors'
    },
    {
      image: modernOfficeHeroImg,
      alt: 'Vandevi Infrastructure modern corporate office design',
      title: 'Commercial Workspaces'
    }
  ]
};

export interface ServicesSectionData {
  eyebrow: string;
  title: string;
  description: string;
  viewAllCta: {
    label: string;
    link: string;
  };
}

export const SERVICES_SECTION_DATA: ServicesSectionData = {
  eyebrow: 'Our Services',
  title: 'Interior Design Solutions for Every Space',
  description:
    'From residential interiors to commercial environments, furniture selection, and renovation, we bring design and functionality together.',
  viewAllCta: {
    label: 'View All Services',
    link: '/services'
  }
};

export interface WhyChoosePoint {
  index: string;
  category: string;
  title: string;
  description: string;
}

export interface WhyChooseUsData {
  eyebrow: string;
  title: string;
  description: string;
  points: WhyChoosePoint[];
  learnMoreCta: {
    label: string;
    link: string;
  };
}

export const WHY_CHOOSE_US_DATA: WhyChooseUsData = {
  eyebrow: 'Why Choose Us',
  title: 'Design That Understands Your Space',
  description:
    'Grounded in authenticity, thoughtful spatial planning, and an unwavering commitment to enduring quality.',
  points: [
    {
      index: '01',
      category: 'Spatial Flow',
      title: 'Human-Centered Planning',
      description:
        'We design around how you intuitively live and work, crafting layouts that balance spatial efficiency with everyday comfort.'
    },
    {
      index: '02',
      category: 'Tactile Sourcing',
      title: 'Refined Material Integrity',
      description:
        'Tactile woods, natural textures, and disciplined neutral palettes selected for visual richness, authenticity, and longevity.'
    },
    {
      index: '03',
      category: 'Cohesive Vision',
      title: 'Seamless Interior Harmony',
      description:
        'Unifying custom joinery, architectural lighting, and bespoke furniture into one coherent, beautifully balanced environment.'
    },
    {
      index: '04',
      category: 'Joinery Standards',
      title: 'Meticulous Detailing',
      description:
        'Every junction, hardware fixture, and surface transition is resolved with thoughtful precision and enduring craftsmanship.'
    }
  ],
  learnMoreCta: {
    label: 'Discover Our Approach & Philosophy',
    link: '/about'
  }
};

export interface TestimonialItem {
  quote: string;
  name: string;
  location: string;
  projectType: string;
  initials: string;
}

export interface TestimonialsSectionData {
  eyebrow: string;
  title: string;
  description: string;
  testimonials: TestimonialItem[];
}

export const TESTIMONIALS_DATA: TestimonialsSectionData = {
  eyebrow: 'Client Voices',
  title: 'What Our Clients Say',
  description:
    'Reflections on our collaborative process, spatial planning, and dedication to craftsmanship.',
  testimonials: [
    {
      quote:
        'Vandevi transformed our living and dining space with remarkable restraint. The bespoke oak joinery, concealed lighting, and natural textures make our home feel expansive yet wonderfully warm and welcoming.',
      name: 'Rajesh & Meera Sharma',
      location: 'Pune',
      projectType: '4-BHK Residential Interior',
      initials: 'RS'
    },
    {
      quote:
        'Our workplace needed a design that balanced executive meeting zones with open collaborative spaces. Vandevi understood our functional workflow from day one and delivered an inspiring, coherent environment.',
      name: 'Ananya Deshmukh',
      location: 'Mumbai',
      projectType: 'Corporate Workspace Design',
      initials: 'AD'
    },
    {
      quote:
        'From spatial restructuring to custom furniture selection, the process was seamless. The balance of warm neutrals, travertine stone, and architectural lighting gave our villa an enduring, timeless character.',
      name: 'Vikramaditya Kulkarni',
      location: 'Goa',
      projectType: 'Contemporary Villa Renovation',
      initials: 'VK'
    }
  ]
};

export interface HomeContactCtaData {
  eyebrow: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export const HOME_CONTACT_CTA_DATA: HomeContactCtaData = {
  eyebrow: 'Start A Project',
  title: "Let's Create Something Beautiful Together",
  description:
    'Planning a new home interior, renovating an existing space, or designing a commercial environment? We would love to understand your requirements and explore how Vandevi Infrastructure can help bring your ideas to life.',
  buttonText: 'Get in Touch',
  buttonLink: '/contact'
};
