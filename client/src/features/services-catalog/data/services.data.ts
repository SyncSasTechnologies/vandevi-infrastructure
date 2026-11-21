import livingRoomServiceImg from '../../../assets/images/living_room_service.png';
import modernOfficeServiceImg from '../../../assets/images/modern_office_service.png';
import furnitureMaterialServiceImg from '../../../assets/images/furniture_material_selection_service.png';
import customizeServiceImg from '../../../assets/images/customize_service.png';
import serviceHeroImg from '../../../assets/images/service_hero.png';
import residentialProjectsImg from '../../../assets/images/residential_projects.png';
import commercialProjectsImg from '../../../assets/images/commercial_projects.png';
import masterBedroomsImg from '../../../assets/images/master_bedrooms.png';
import livingRoomsImg from '../../../assets/images/living_rooms.png';
import washroomsImg from '../../../assets/images/washrooms.png';
import officeInteriorsImg from '../../../assets/images/office_interiors.png';

export interface ServiceGalleryImage {
  url: string;
  title: string;
  caption: string;
}

export interface ServiceWorkflowStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceHighlight {
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  orderNumber: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  overviewNarrative: string;
  heroImage: string;
  imageUrl: string;
  inclusions: string[];
  keyHighlights: ServiceHighlight[];
  processSteps: ServiceWorkflowStep[];
  galleryImages: ServiceGalleryImage[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'residential',
    slug: 'residential-interiors',
    orderNumber: '01',
    title: 'Residential Interiors',
    tagline: 'Bespoke living environments shaped around everyday comfort, intimacy, and enduring craftsmanship.',
    shortDescription:
      'Residential spaces shaped around individual lifestyles, preferences, and everyday requirements.',
    fullDescription:
      'We design residential spaces that reflect individual lifestyles, preferences, and everyday requirements, creating enduring environments where beauty and utility coexist in quiet harmony.',
    overviewNarrative:
      'A home is more than an arrangement of furniture—it is an intimate sanctuary that should support how you recharge, gather, and live. At Vandevi Infrastructure, our residential interior approach starts with an in-depth spatial assessment of natural light, circulation flow, and storage habits. We orchestrate tactile finishes, concealed millwork, and balanced neutral palettes that elevate daily living into an experience of understated luxury.',
    heroImage: livingRoomServiceImg,
    imageUrl: livingRoomServiceImg,
    inclusions: [
      'Living rooms & entertainment lounges',
      'Master bedrooms & private retreats',
      "Children's bedrooms & study zones",
      'Modular kitchens & formal dining spaces',
      'Luxury washrooms & powder rooms',
      'Custom wardrobes & walk-in storage',
      'Tactile furniture & material curation'
    ],
    keyHighlights: [
      {
        title: 'Human-Centered Spatial Flow',
        description:
          'Layouts choreographed around intuitive movement, ergonomic comfort, and natural daylight penetration.'
      },
      {
        title: 'Natural & Tactile Materials',
        description:
          'Curated pairings of warm oak joinery, natural stone vanities, breathable linens, and honed finishes.'
      },
      {
        title: 'Seamless Concealed Storage',
        description:
          'Bespoke architectural cabinetry, floor-to-ceiling wardrobes, and integrated shelving that de-clutter spaces.'
      },
      {
        title: 'Layered Architectural Lighting',
        description:
          'Coordinated ambient, cove, and task lighting schemes programmed to transform atmosphere from day to evening.'
      }
    ],
    processSteps: [
      {
        step: '01',
        title: 'Consultation & Spatial Audit',
        description:
          'We study your daily routines, functional priorities, storage demands, and architectural site conditions.'
      },
      {
        step: '02',
        title: 'Concept & Material Curation',
        description:
          'Developing moodboards, tactile finish samples, color palettes, and preliminary 2D spatial zoning layouts.'
      },
      {
        step: '03',
        title: '3D Modeling & Blueprints',
        description:
          'Detailed photorealistic renders, electrical and plumbing schematics, and millwork shop drawings.'
      },
      {
        step: '04',
        title: 'Craftsmanship & Final Styling',
        description:
          'Precise on-site carpentry, stone installation, lighting commissioning, and white-glove finishing.'
      }
    ],
    galleryImages: [
      {
        url: livingRoomsImg,
        title: 'Contemporary Living Area',
        caption: 'Low-profile linen seating with architectural oak paneling and travertine occasional tables.'
      },
      {
        url: masterBedroomsImg,
        title: 'Master Bedroom Suite',
        caption: 'Acoustic headboard wall, integrated nightstands, and concealed warm cove illumination.'
      },
      {
        url: washroomsImg,
        title: 'Ensuite Bathroom',
        caption: 'Freestanding soaking tub, fluted stone vanity, and minimalist matte brass fittings.'
      },
      {
        url: residentialProjectsImg,
        title: 'Dining & Entertaining Lounge',
        caption: 'Sculptural dining table paired with custom upholstered chairs and architectural pendant.'
      }
    ]
  },
  {
    id: 'commercial',
    slug: 'commercial-interiors',
    orderNumber: '02',
    title: 'Commercial Interiors',
    tagline: 'Strategic corporate environments designed to amplify brand identity, teamwork, and operational efficiency.',
    shortDescription:
      'Commercial environments designed to reflect a business identity while supporting functionality.',
    fullDescription:
      'We create commercial interiors that reflect the identity of a business while supporting functionality, employee well-being, and a memorable customer experience.',
    overviewNarrative:
      'Modern workplaces require a balance between focused individual work, spontaneous collaboration, and professional client presentation. Our commercial interior solutions translate your corporate culture into a physical space that attracts top talent and inspires productive energy. We coordinate acoustic treatment, ergonomic furniture standards, and flexible spatial zoning that easily evolves with your growing business.',
    heroImage: modernOfficeServiceImg,
    imageUrl: modernOfficeServiceImg,
    inclusions: [
      'Executive offices & open workspaces',
      'Cafeterias & collaborative breakout zones',
      'Retail displays & boutique client experience rooms',
      'Reception areas & waiting lounges',
      'Commercial ergonomic furniture layouts',
      'Acoustic partitioning & phone booths'
    ],
    keyHighlights: [
      {
        title: 'Brand Culture Made Physical',
        description:
          'Signature architectural focal points, branded color nuances, and refined reception environments.'
      },
      {
        title: 'Agile & Collaborative Zoning',
        description:
          'Effortless transitions between quiet focus pods, agile team clusters, and relaxed social cafeterias.'
      },
      {
        title: 'Acoustics & Biophilic Wellness',
        description:
          'Engineered sound-dampening ceiling baffles, indoor vegetation, and circadian-aligned lighting.'
      },
      {
        title: 'Durable Commercial Finishes',
        description:
          'High-traffic flooring, scratch-resistant laminates, and commercial hardware built for longevity.'
      }
    ],
    processSteps: [
      {
        step: '01',
        title: 'Workplace Strategy & Programming',
        description:
          'Assessing department headcounts, collaboration frequencies, client traffic, and growth projections.'
      },
      {
        step: '02',
        title: 'Circulation & Acoustic Layout',
        description:
          'Optimizing open office densities while isolating high-noise zones through thoughtful space zoning.'
      },
      {
        step: '03',
        title: 'Services & Technology Integration',
        description:
          'Coordinating HVAC, structured data cabling, video conference AV, power drops, and fire safety systems.'
      },
      {
        step: '04',
        title: 'Turnkey Fit-Out & Handover',
        description:
          'Fast-track execution managed against strict milestone timelines to minimize operational downtime.'
      }
    ],
    galleryImages: [
      {
        url: commercialProjectsImg,
        title: 'Executive Open Workspace',
        caption: 'Ergonomic benching systems, warm wood privacy dividers, and glare-free task lighting.'
      },
      {
        url: officeInteriorsImg,
        title: 'Collaborative Team Lounge',
        caption: 'Modular soft seating and writeable surfaces designed for spontaneous team ideation.'
      },
      {
        url: modernOfficeServiceImg,
        title: 'Conference & Boardroom',
        caption: 'Acoustically insulated glass enclosures with integrated smart presentation technology.'
      }
    ]
  },
  {
    id: 'furniture',
    slug: 'furniture-material',
    orderNumber: '03',
    title: 'Furniture & Material',
    tagline: 'Curated textiles, custom millwork, and tactile surfaces harmonized for cohesive architectural depth.',
    shortDescription:
      'Coordinated furniture, finishes, textures, colours, and materials for a cohesive design concept.',
    fullDescription:
      'Furniture and materials play an important role in defining the character of an interior. We focus on coordinating bespoke furniture, finishes, textures, colours, and materials to create a unified design vision.',
    overviewNarrative:
      'The tactile soul of any interior lies in its materials. From the grain of natural oak and the cool weight of honed travertine to the warmth of woven linens, material selection dictates how a space feels and ages. Rather than relying on generic off-the-shelf items, Vandevi Infrastructure specializes in custom furniture design and comprehensive material palettes tailored specifically for each client concept.',
    heroImage: furnitureMaterialServiceImg,
    imageUrl: furnitureMaterialServiceImg,
    inclusions: [
      'Custom furniture design & bespoke fabrication',
      'Upholstery, performance fabrics & soft furnishings',
      'Natural stone, marble & porcelain surface sourcing',
      'Hardwood, veneer & architectural laminate coordination',
      'Architectural hardware & bespoke metal detailing',
      'Decorative & focal lighting selection'
    ],
    keyHighlights: [
      {
        title: 'Bespoke Millwork & Fabrication',
        description:
          'One-of-a-kind dining tables, low credenzas, headboards, and shelving built by master craftsmen.'
      },
      {
        title: 'Material Integrity & Authenticity',
        description:
          'Honest materials selected for tactile beauty, natural patina, and enduring structural stability.'
      },
      {
        title: 'Harmonious Color & Texture Balance',
        description:
          'Carefully tested palettes ensuring timber grains, metals, and fabrics complement rather than compete.'
      },
      {
        title: 'White-Glove Sourcing',
        description:
          'Direct partnerships with reputable timber mills, stone quarries, and boutique fabric houses.'
      }
    ],
    processSteps: [
      {
        step: '01',
        title: 'Palette Curation & Moodboarding',
        description:
          'Developing physical material trays pairing timber swatches, stone samples, metals, and textiles.'
      },
      {
        step: '02',
        title: 'Shop Drawings & Prototyping',
        description:
          'Detailed technical drawings for custom pieces including joint details, finish specs, and hardware.'
      },
      {
        step: '03',
        title: 'Fabrication & Quality Control',
        description:
          'Supervising factory fabrication, timber seasoning, joinery tolerances, and finish consistency.'
      },
      {
        step: '04',
        title: 'Delivery & Curated Styling',
        description:
          'Careful on-site placement, assembly, protective sealing, and artful accessory staging.'
      }
    ],
    galleryImages: [
      {
        url: furnitureMaterialServiceImg,
        title: 'Architectural Material Moodboard',
        caption: 'Carefully curated travertine stone, fluted oak timber, and textured neutral boucles.'
      },
     
      {
        url: livingRoomsImg,
        title: 'Sculptural Furniture Grouping',
        caption: 'Bespoke sofa silhouette paired with geometric solid stone cocktail tables.'
      }
    ]
  },
  {
    id: 'renovation',
    slug: 'customize-renovation',
    orderNumber: '04',
    title: 'Customize & Renovation',
    tagline: 'Revitalizing existing structures into contemporary, high-performance spaces with seamless project management.',
    shortDescription:
      'Redesign and renovation of existing residential or commercial interiors to suit updated requirements.',
    fullDescription:
      'We take on renovation contracts and specialize in redesigning any existing residential or commercial interior space to perfectly suit your vision and updated requirements with seamless project execution.',
    overviewNarrative:
      'Renovating an existing property requires architectural foresight, structural sensitivity, and rigorous execution. Whether transforming an outdated apartment into an airy modern home or reconfiguring a legacy office into an agile workplace, Vandevi Infrastructure manages the complete renovation lifecycle. We identify hidden structural potential, modernize plumbing and electrical systems, and introduce contemporary spatial flow.',
    heroImage: customizeServiceImg,
    imageUrl: customizeServiceImg,
    inclusions: [
      'Comprehensive residential & commercial makeovers',
      'Modular kitchen & wardrobe system overhauls',
      'Internal wall reconfiguration & spatial optimization',
      'Flooring, tile & ceiling replacement',
      'Complete electrical, plumbing & HVAC modernization',
      'Structural restoration & architectural resurfacing'
    ],
    keyHighlights: [
      {
        title: 'Unlocking Hidden Spatial Potential',
        description:
          'Re-engineering awkward existing layouts into open, light-filled, functional modern spaces.'
      },
      {
        title: 'Infrastructure & Utility Upgrades',
        description:
          'Replacing legacy wiring, plumbing lines, waterproofing, and acoustic insulation for peace of mind.'
      },
      {
        title: 'Modular & High-Precision Joinery',
        description:
          'Installing custom cabinetry and wardrobes designed down to the millimeter for clean finishes.'
      },
      {
        title: 'Rigorous On-Time Delivery',
        description:
          'Phased schedules, daily supervision, and quality gate checks to prevent cost and timeline creep.'
      }
    ],
    processSteps: [
      {
        step: '01',
        title: 'Condition Survey & Feasibility',
        description:
          'On-site structural assessment, load-bearing checks, utility tracing, and measurement verification.'
      },
      {
        step: '02',
        title: 'Adaptive Layout & Design Plan',
        description:
          'Presenting side-by-side existing vs proposed layouts with 3D visualizations and cost breakdowns.'
      },
      {
        step: '03',
        title: 'Controlled Strip-Out & Core Works',
        description:
          'Safe demolition, debris removal, structural reinforcement, waterproofing, and MEP conduit rough-ins.'
      },
      {
        step: '04',
        title: 'Joinery Fit-Out & Turnkey Handover',
        description:
          'Floor finishes, modular installations, lighting commissioning, deep cleaning, and final sign-off.'
      }
    ],
    galleryImages: [
      {
        url: customizeServiceImg,
        title: 'Complete Living Concept Remodel',
        caption: 'Transformed segmented layout into a sweeping, unified living and entertaining suite.'
      },
      {
        url: residentialProjectsImg,
        title: 'Kitchen & Dining Modernization',
        caption: 'Replaced dark legacy cabinetry with flush minimalist storage and quartz prep counters.'
      },
      {
        url: masterBedroomsImg,
        title: 'Bedroom Architecture Renewal',
        caption: 'Flush custom wardrobe wall, recessed perimeter lighting, and restored timber flooring.'
      },
      {
        url: washroomsImg,
        title: 'Ensuite Bathroom Re-Tile',
        caption: 'Complete waterproofing, large format porcelain slabs, and concealed thermostatic valves.'
      }
    ]
  }
];

export function getServiceByIdOrSlug(idOrSlug: string): ServiceItem | undefined {
  const normalized = idOrSlug.toLowerCase().trim();
  return SERVICES_DATA.find(
    (s) =>
      s.id.toLowerCase() === normalized ||
      s.slug.toLowerCase() === normalized ||
      s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === normalized
  );
}

export interface ServicesPageHeroData {
  backgroundImage: string;
  eyebrow: string;
  title: string;
  description: string;
}

export const SERVICES_PAGE_HERO_DATA: ServicesPageHeroData = {
  backgroundImage: serviceHeroImg,
  eyebrow: 'Our Services',
  title: 'Interior Design Solutions for Every Space',
  description:
    'From residential interiors to commercial environments, furniture selection, and renovation, we bring design and functionality together to shape spaces around your needs.'
};

export interface ServicesPageCatalogHeaderData {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
}

export const SERVICES_PAGE_CATALOG_HEADER_DATA: ServicesPageCatalogHeaderData = {
  eyebrow: 'Our Services',
  titlePrefix: 'Architectural Solutions Tailored to ',
  titleHighlight: 'Every Space',
  description:
    'From bespoke residential living environments and corporate headquarters to custom furniture selection and turnkey interior execution, explore our comprehensive design practices.'
};

export interface ServicesPageContactCtaData {
  eyebrow: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export const SERVICES_PAGE_CONTACT_CTA_DATA: ServicesPageContactCtaData = {
  eyebrow: 'Start A Project',
  title: "Let's Create Something Beautiful Together",
  description:
    'Planning a new home interior, renovating an existing space, or designing a commercial environment? We would love to understand your requirements and explore how Vandevi Infrastructure can help bring your ideas to life.',
  buttonText: 'Get in Touch',
  buttonLink: '/contact'
};

export interface ServicePanelUiText {
  scopeTitlePrefix: string;
  scopeTitleHighlight: string;
  exploreDetailsLabel: string;
  discussProjectLabel: string;
}

export const SERVICE_PANEL_UI_TEXT: ServicePanelUiText = {
  scopeTitlePrefix: 'Scope of Work & ',
  scopeTitleHighlight: 'Deliverables',
  exploreDetailsLabel: 'Explore Details',
  discussProjectLabel: 'Discuss Project'
};
