import { z } from 'zod';
import { TARGET_SERVICES, ALL_FILTER_TAGS } from './project.model.js';

export const createProjectSchema = z.object({
  title: z
    .string()
    .min(2, 'Project title must be at least 2 characters.')
    .max(120, 'Project title cannot exceed 120 characters.'),
  slug: z
    .string()
    .max(150)
    .optional(),
  description: z
    .string()
    .max(2000, 'Project description cannot exceed 2000 characters.')
    .default(''),
  targetServices: z
    .array(z.enum(TARGET_SERVICES))
    .min(1, 'Please select at least one target service page.'),
  filterTag: z.enum(ALL_FILTER_TAGS, {
    message: 'Please select a valid visitor filter tag.'
  }),
  category: z.string().optional(),
  imageUrl: z.string().min(1, 'Display image URL is required.'),
  thumbnailUrl: z.string().min(1, 'Thumbnail image URL is required.'),
  aspectRatio: z.string().default('1.50'),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(true)
});

export const updateProjectSchema = createProjectSchema.partial();

export const projectQuerySchema = z.object({
  service: z.string().optional(),
  tag: z.string().optional(),
  category: z.string().optional(),
  featured: z
    .string()
    .optional()
    .transform((val) => (val === 'true' ? true : val === 'false' ? false : undefined)),
  isPublished: z
    .string()
    .optional()
    .transform((val) => (val === 'false' ? false : true)), // Defaults to published projects for public views
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Math.max(1, parseInt(val, 10)) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Math.min(100, Math.max(1, parseInt(val, 10))) : 50))
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectQueryInput = z.infer<typeof projectQuerySchema>;
