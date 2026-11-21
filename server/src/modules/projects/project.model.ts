import mongoose, { Schema, Document } from 'mongoose';

// 4 Core Business Services (Destinations)
export const TARGET_SERVICES = [
  'residential',
  'commercial',
  'furniture',
  'renovation'
] as const;

export type TargetService = (typeof TARGET_SERVICES)[number];

// Predefined Visitor Filter Tags (Discovery)
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

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  targetServices: TargetService[];
  filterTag: FilterTag;
  category?: string; // Kept for backward compatibility
  imageUrl: string;
  thumbnailUrl: string;
  aspectRatio: string;
  featured: boolean;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true
    },
    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: 2000
    },
    targetServices: {
      type: [String],
      enum: TARGET_SERVICES,
      required: true,
      default: ['residential'],
      index: true
    },
    filterTag: {
      type: String,
      required: true,
      enum: ALL_FILTER_TAGS,
      index: true
    },
    category: {
      type: String,
      trim: true
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true
    },
    thumbnailUrl: {
      type: String,
      required: true,
      trim: true
    },
    aspectRatio: {
      type: String,
      default: '1.50',
      trim: true
    },
    featured: {
      type: Boolean,
      default: false,
      index: true
    },
    order: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Compound indexes for optimal queries
ProjectSchema.index({ targetServices: 1, isPublished: 1, order: 1, createdAt: -1 });
ProjectSchema.index({ filterTag: 1, isPublished: 1, order: 1, createdAt: -1 });
ProjectSchema.index({ featured: 1, isPublished: 1, order: 1 });

export const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema);
