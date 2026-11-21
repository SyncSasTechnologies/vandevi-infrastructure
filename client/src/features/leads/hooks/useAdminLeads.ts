import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadApi } from '../api/leadApi';
import type { GetAdminLeadsParams } from '../types/lead.types';

export function useAdminMetrics() {
  return useQuery({
    queryKey: ['admin-metrics'],
    queryFn: () => leadApi.getMetrics(),
    refetchInterval: 30000 // Refresh metric cards every 30s
  });
}

export function useAdminLeads(params?: GetAdminLeadsParams) {
  return useQuery({
    queryKey: ['admin-leads', params?.status, params?.search, params?.page, params?.limit],
    queryFn: () => leadApi.getAdminLeads(params),
    placeholderData: (prev) => prev
  });
}

export function useAdminLead(id: string | undefined) {
  return useQuery({
    queryKey: ['admin-lead', id],
    queryFn: () => (id ? leadApi.getLeadById(id) : null),
    enabled: Boolean(id)
  });
}

export function useUpdateLeadStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      adminNotes
    }: {
      id: string;
      status: string;
      adminNotes?: string;
    }) => leadApi.updateLeadStatus(id, status, adminNotes),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-leads'] });
      queryClient.invalidateQueries({ queryKey: ['admin-metrics'] });
      queryClient.invalidateQueries({ queryKey: ['admin-lead', data._id] });
    }
  });
}
