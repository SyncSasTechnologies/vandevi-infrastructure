import { useQuery } from '@tanstack/react-query';
import { projectApi } from '../api/projectApi';
import type { GetProjectsParams } from '../api/projectApi';
import type { ProjectListResponse } from '../types/project.types';

export function useProjects(params?: GetProjectsParams) {
  return useQuery<ProjectListResponse>({
    queryKey: [
      'projects',
      params?.service || 'all',
      params?.tag || params?.category || 'all',
      params?.featured,
      params?.page,
      params?.limit
    ],
    queryFn: async () => {
      const response = await projectApi.getProjects(params);
      return (
        response || {
          projects: [],
          total: 0,
          page: 1,
          limit: 50,
          totalPages: 0
        }
      );
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false
  });
}
