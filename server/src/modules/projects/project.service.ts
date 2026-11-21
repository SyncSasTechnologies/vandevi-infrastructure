import mongoose from 'mongoose';
import { ProjectRepository } from './project.repository.js';
import { IProject, ProjectModel } from './project.model.js';
import { CreateProjectInput, UpdateProjectInput, ProjectQueryInput } from './project.schema.js';
import { MediaService } from '../media/media.service.js';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export class ProjectService {
  static async getProjects(query: ProjectQueryInput): Promise<{
    projects: IProject[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const filter: Record<string, unknown> = {};

    // 1. Published status filter
    if (typeof query.isPublished === 'boolean') {
      filter.isPublished = query.isPublished;
    }

    // 2. Target Service filtering (Destination: where images are routed)
    if (query.service && query.service !== 'all') {
      filter.targetServices = query.service;
    }

    // 3. Visitor Tag filtering (Discovery: space / craft type)
    if (query.tag && query.tag !== 'all') {
      filter.filterTag = query.tag;
    } else if (query.category && query.category !== 'all') {
      // Backward compatibility for category query param
      filter.$or = [{ filterTag: query.category }, { category: query.category }];
    }

    // 4. Featured filtering
    if (typeof query.featured === 'boolean') {
      filter.featured = query.featured;
    }

    const page = query.page || 1;
    const limit = query.limit || 50;
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      ProjectRepository.find(filter, { skip, limit, sort: { order: 1, createdAt: -1 } }),
      ProjectRepository.count(filter)
    ]);

    return {
      projects,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1
    };
  }

  static async getProjectById(id: string): Promise<IProject> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error: any = new Error('Invalid project ID format.');
      error.statusCode = 400;
      throw error;
    }

    const project = await ProjectRepository.findById(id);
    if (!project) {
      const error: any = new Error('Project not found.');
      error.statusCode = 404;
      throw error;
    }

    return project;
  }

  static async createProject(input: CreateProjectInput): Promise<IProject> {
    // Auto-generate slug from title if omitted or blank
    let baseSlug = input.slug ? slugify(input.slug) : slugify(input.title);
    if (!baseSlug) {
      baseSlug = `project-${Date.now()}`;
    }

    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await ProjectModel.exists({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    const projectData = {
      ...input,
      slug: uniqueSlug,
      category: input.category || input.filterTag
    };

    return ProjectRepository.create(projectData);
  }

  static async updateProject(id: string, input: UpdateProjectInput): Promise<IProject> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error: any = new Error('Invalid project ID format.');
      error.statusCode = 400;
      throw error;
    }

    const existing = await ProjectRepository.findById(id);
    if (!existing) {
      const error: any = new Error('Project not found.');
      error.statusCode = 404;
      throw error;
    }

    // If slug is provided and changed, ensure uniqueness
    const updateData: Partial<IProject> = { ...input } as any;
    if (input.slug && input.slug !== existing.slug) {
      const cleanSlug = slugify(input.slug);
      let uniqueSlug = cleanSlug;
      let counter = 1;
      while (await ProjectModel.exists({ slug: uniqueSlug, _id: { $ne: id } })) {
        uniqueSlug = `${cleanSlug}-${counter}`;
        counter++;
      }
      updateData.slug = uniqueSlug;
    }

    // If filterTag updated without category, sync category
    if (input.filterTag && !input.category) {
      updateData.category = input.filterTag;
    }

    // If images are updated, clean up the obsolete local files
    const obsoleteImages: string[] = [];
    if (input.imageUrl && input.imageUrl !== existing.imageUrl) {
      obsoleteImages.push(existing.imageUrl);
    }
    if (input.thumbnailUrl && input.thumbnailUrl !== existing.thumbnailUrl) {
      obsoleteImages.push(existing.thumbnailUrl);
    }

    if (obsoleteImages.length > 0) {
      await MediaService.deleteProjectImageFiles(obsoleteImages);
    }

    const updated = await ProjectRepository.update(id, updateData);
    if (!updated) {
      const error: any = new Error('Failed to update project.');
      error.statusCode = 500;
      throw error;
    }

    return updated;
  }

  static async deleteProject(id: string): Promise<{ success: boolean }> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error: any = new Error('Invalid project ID format.');
      error.statusCode = 400;
      throw error;
    }

    const project = await ProjectRepository.findById(id);
    if (!project) {
      const error: any = new Error('Project not found.');
      error.statusCode = 404;
      throw error;
    }

    // Delete associated files safely
    await MediaService.deleteProjectImageFiles([project.imageUrl, project.thumbnailUrl]);

    await ProjectRepository.delete(id);
    return { success: true };
  }
}
