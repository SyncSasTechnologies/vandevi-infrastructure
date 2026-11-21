import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '../api/projectApi';
import type { Project, TargetServiceId, FilterTag } from '../types/project.types';

export interface CreateProjectPayload {
  title: string;
  slug?: string;
  description: string;
  targetServices: TargetServiceId[];
  filterTag: FilterTag;
  featured?: boolean;
  order?: number;
  isPublished?: boolean;
  imageFile: File;
}

export interface UpdateProjectPayload {
  id: string;
  title?: string;
  slug?: string;
  description?: string;
  targetServices?: TargetServiceId[];
  filterTag?: FilterTag;
  featured?: boolean;
  order?: number;
  isPublished?: boolean;
  imageFile?: File;
}

export function useProjectMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (payload: CreateProjectPayload): Promise<Project> => {
      // 1. Upload and process the architectural image through backend Sharp WebP engine
      const mediaResponse = await projectApi.uploadImage(payload.imageFile);

      // 2. Create the project record with the optimized WebP asset URLs and auto-generated slug
      const newProject = await projectApi.createProject({
        title: payload.title.trim(),
        slug: payload.slug?.trim() || undefined,
        description: payload.description.trim(),
        targetServices: payload.targetServices,
        filterTag: payload.filterTag,
        category: payload.filterTag,
        imageUrl: mediaResponse.imageUrl,
        thumbnailUrl: mediaResponse.thumbnailUrl,
        aspectRatio: mediaResponse.aspectRatio,
        featured: payload.featured ?? false,
        order: payload.order ?? 0,
        isPublished: payload.isPublished ?? true
      });

      return newProject;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: UpdateProjectPayload): Promise<Project> => {
      const updateData: Partial<Project> = {};

      if (payload.title !== undefined) updateData.title = payload.title.trim();
      if (payload.slug !== undefined) updateData.slug = payload.slug.trim();
      if (payload.description !== undefined) updateData.description = payload.description.trim();
      if (payload.targetServices !== undefined) updateData.targetServices = payload.targetServices;
      if (payload.filterTag !== undefined) {
        updateData.filterTag = payload.filterTag;
        updateData.category = payload.filterTag;
      }
      if (payload.featured !== undefined) updateData.featured = payload.featured;
      if (payload.order !== undefined) updateData.order = payload.order;
      if (payload.isPublished !== undefined) updateData.isPublished = payload.isPublished;

      // If a new image was uploaded to replace the current one
      if (payload.imageFile) {
        const mediaResponse = await projectApi.uploadImage(payload.imageFile);
        updateData.imageUrl = mediaResponse.imageUrl;
        updateData.thumbnailUrl = mediaResponse.thumbnailUrl;
        updateData.aspectRatio = mediaResponse.aspectRatio;
      }

      return projectApi.updateProject(payload.id, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await projectApi.deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  return {
    createProject: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,

    updateProject: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,

    deleteProject: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error
  };
}
