// 4 Core Business Services (Where images are routed)
export const TARGET_SERVICES = [
  { id: 'residential', label: 'Residential Interiors', slug: 'residential-interiors' },
  { id: 'commercial', label: 'Commercial Interiors', slug: 'commercial-interiors' },
  { id: 'furniture', label: 'Furniture & Material', slug: 'furniture-material' },
  { id: 'renovation', label: 'Customize & Renovation', slug: 'customize-renovation' }
] as const;

export type TargetServiceId = (typeof TARGET_SERVICES)[number]['id'];

// 4 Groups of Curated Visitor Filter Tags (Discovery on /projects)
export const FILTER_TAG_GROUPS = [
  {
    group: 'Residential Spaces',
    tags: [
      'Living Rooms',
      'Master Bedrooms',
      'Kids & Study Rooms',
      'Kitchens & Dining',
      'Washrooms',
      'Wardrobes & Storage'
    ]
  },
  {
    group: 'Commercial Spaces',
    tags: [
      'Offices & Workspaces',
      'Cafeterias & Breakout',
      'Retail & Boutiques',
      'Reception & Lounges'
    ]
  },
  {
    group: 'Craft, Finishes & Elements',
    tags: [
      'Custom Furniture',
      'Upholstery & Fabrics',
      'Stone & Surfaces',
      'Wood & Laminates',
      'Hardware & Metalwork',
      'Lighting',
      'Acoustics & Partitions'
    ]
  },
  {
    group: 'Renovation & Build',
    tags: [
      'Full Makeovers',
      'Flooring & Ceilings',
      'Space Optimization',
      'Electrical & Plumbing',
      'Structural Restoration'
    ]
  }
] as const;

export const ALL_FILTER_TAGS = FILTER_TAG_GROUPS.flatMap((g) => g.tags);
export type FilterTag = (typeof ALL_FILTER_TAGS)[number];

// Backward-compatible category definition
export const PROJECT_CATEGORIES = ALL_FILTER_TAGS;
export type ProjectCategory = FilterTag;

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  targetServices: TargetServiceId[];
  filterTag: FilterTag;
  category?: string;
  imageUrl: string;
  thumbnailUrl: string;
  aspectRatio?: string;
  featured: boolean;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectListResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
