import aboutUsHeroImg from '../../../assets/images/about_us_hero.png';

export interface AboutHeroData {
  backgroundImage: string;
  eyebrow: string;
  title: string;
  description: string;
}

export const ABOUT_HERO_DATA: AboutHeroData = {
  backgroundImage: aboutUsHeroImg,
  eyebrow: 'About Vandevi',
  title: 'About Vandevi Infrastructure',
  description: 'Thoughtfully designed spaces for the way people live and work.'
};

export interface AboutIntroData {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  brandCard: {
    primary: string;
    subtitle: string;
  };
}

export const ABOUT_INTRO_DATA: AboutIntroData = {
  eyebrow: 'About Us',
  title: 'Where Design Meets Functionality',
  paragraphs: [
    'Vandevi Infrastructure is an interior and furniture design firm focused on creating thoughtfully designed residential and commercial spaces.',
    'We believe that good design is more than appearance. It is about understanding how people use a space and creating an environment that brings together comfort, functionality, and visual harmony.',
    'From residential interiors to commercial environments, our objective is to create spaces that feel distinctive, purposeful, and welcoming.'
  ],
  brandCard: {
    primary: 'Vandevi',
    subtitle: 'Infrastructure'
  }
};

export interface VisionMissionItem {
  title: string;
  description: string;
}

export interface AboutVisionMissionData {
  vision: VisionMissionItem;
  mission: VisionMissionItem;
}

export const ABOUT_VISION_MISSION_DATA: AboutVisionMissionData = {
  vision: {
    title: 'Our Vision',
    description:
      'To create inspiring interior environments that combine thoughtful design, functionality, and timeless aesthetics.'
  },
  mission: {
    title: 'Our Mission',
    description:
      "To understand every client's vision and translate it into meaningful interior design solutions through creativity, attention to detail, and a commitment to quality."
  }
};

export interface ApproachTenet {
  num: string;
  category: string;
  title: string;
  text: string;
}

export interface AboutApproachData {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  tenets: ApproachTenet[];
}

export const ABOUT_APPROACH_DATA: AboutApproachData = {
  eyebrow: 'Design Philosophy',
  titlePrefix: 'Our design approach ',
  titleHighlight: 'focuses on',
  description:
    'We believe that extraordinary spaces are never accidental. Every interior we deliver is anchored to five foundational tenets—synthesizing human behavior, material honesty, and architectural precision into enduring living and working environments.',
  tenets: [
    {
      num: '01',
      category: 'Client Alignment',
      title: 'Client Understanding',
      text: "Understanding the client's requirements, lifestyle, and preferences."
    },
    {
      num: '02',
      category: 'Ergonomic Utility',
      title: 'Spatial Functionality',
      text: 'Creating functional, practical, and aesthetically pleasing spaces.'
    },
    {
      num: '03',
      category: 'Tactile Honesty',
      title: 'Material Integrity',
      text: 'Selecting suitable tactile materials, finishes, and balanced colour combinations.'
    },
    {
      num: '04',
      category: 'Cohesive Vision',
      title: 'Seamless Integration',
      text: 'Integrating custom furniture, architectural lighting, and bespoke interior elements.'
    },
    {
      num: '05',
      category: 'Bespoke Identity',
      title: 'Distinct Character',
      text: 'Developing design concepts that reflect the intended individual character of each space.'
    }
  ]
};

export interface AboutContactCtaData {
  eyebrow: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export const ABOUT_CONTACT_CTA_DATA: AboutContactCtaData = {
  eyebrow: 'Start A Project',
  title: "Let's Create Something Beautiful Together",
  description:
    'Planning a new home interior, renovating an existing space, or designing a commercial environment? We would love to understand your requirements and explore how Vandevi Infrastructure can help bring your ideas to life.',
  buttonText: 'Get in Touch',
  buttonLink: '/contact'
};
