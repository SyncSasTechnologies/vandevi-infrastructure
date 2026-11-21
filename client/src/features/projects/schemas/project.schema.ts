import { z } from 'zod';
import { PROJECT_CATEGORIES } from '../types/project.types';

export const projectCategorySchema = z.enum(PROJECT_CATEGORIES, {
  message: 'Please select a valid project category.'
});

export const projectSchema = z.object({
  _id: z.string(),
  title: z.string().min(2).max(120),
  description: z.string().max(2000).default(''),
  category: projectCategorySchema,
  imageUrl: z.string().min(1),
  thumbnailUrl: z.string().min(1),
  aspectRatio: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  isPublished: z.boolean().default(true),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const createProjectFormSchema = z.object({
  title: z
    .string()
    .min(2, 'Project title must be at least 2 characters.')
    .max(120, 'Project title cannot exceed 120 characters.'),
  description: z.string().max(2000, 'Description cannot exceed 2000 characters.').default(''),
  category: projectCategorySchema,
  imageUrl: z.string().min(1, 'Display image URL is required.'),
  thumbnailUrl: z.string().min(1, 'Thumbnail image URL is required.'),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(true)
});

export type CreateProjectFormData = z.infer<typeof createProjectFormSchema>;

