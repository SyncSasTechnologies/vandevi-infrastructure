import { apiClient } from '../../../shared/api/apiClient';
import type { Project, ProjectListResponse } from '../types/project.types';

export interface GetProjectsParams {
  service?: string;
  tag?: string;
  category?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface UploadImageResponse {
  imageUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  aspectRatio: string;
}

export const projectApi = {
  /**
   * Fetches published projects with optional service, tag, category, and featured filtering.
   */
  async getProjects(params?: GetProjectsParams): Promise<ProjectListResponse> {
    const queryParams: Record<string, string | number | boolean> = {};

    if (params?.service && params.service !== 'all') {
      queryParams.service = params.service;
    }
    if (params?.tag && params.tag !== 'all') {
      queryParams.tag = params.tag;
    }
    if (params?.category && params.category !== 'all') {
      queryParams.category = params.category;
    }
    if (typeof params?.featured === 'boolean') {
      queryParams.featured = params.featured;
    }
    if (params?.page) {
      queryParams.page = params.page;
    }
    if (params?.limit) {
      queryParams.limit = params.limit;
    }

    const response = await apiClient.get<{
      success: boolean;
      data: ProjectListResponse;
    }>('/projects', { params: queryParams });

    return response.data.data;
  },

  /**
   * Fetches a single project by its ID.
   */
  async getProjectById(id: string): Promise<Project> {
    const response = await apiClient.get<{
      success: boolean;
      data: Project;
    }>(`/projects/${id}`);

    return response.data.data;
  },

  /**
   * Uploads an architectural image to the backend Sharp WebP optimization engine.
   */
  async uploadImage(file: File): Promise<UploadImageResponse> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await apiClient.post<{
      success: boolean;
      data: UploadImageResponse;
    }>('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data.data;
  },

  /**
   * Creates a new project item (Admin action).
   */
  async createProject(data: Partial<Project>): Promise<Project> {
    const response = await apiClient.post<{
      success: boolean;
      data: Project;
    }>('/projects', data);

    return response.data.data;
  },

  /**
   * Updates an existing project item (Admin action).
   */
  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    const response = await apiClient.patch<{
      success: boolean;
      data: Project;
    }>(`/projects/${id}`, data);

    return response.data.data;
  },

  /**
   * Deletes a project item and cleans up local media files (Admin action).
   */
  async deleteProject(id: string): Promise<void> {
    await apiClient.delete(`/projects/${id}`);
  }
};

