import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  priorityService,
  type ProviderPriorityBulkUpdate,
  type DeviceTypePriorityBulkUpdate,
} from '@/lib/api/services/priority.service';
import { queryKeys } from '@/lib/query/keys';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errors/handler';

// ==================== Provider Priorities ====================

export function useProviderPriorities() {
  return useQuery({
    queryKey: queryKeys.priorities.providers(),
    queryFn: () => priorityService.getProviderPriorities(),
  });
}

export function useBulkUpdateProviderPriorities() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProviderPriorityBulkUpdate) =>
      priorityService.bulkUpdateProviderPriorities(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.priorities.all,
      });
      toast.success('Las prioridades de proveedores se actualizaron correctamente');
    },
    onError: (error) => {
      toast.error(`No se pudieron actualizar las prioridades: ${getErrorMessage(error)}`);
    },
  });
}

// ==================== Device Type Priorities ====================

export function useDeviceTypePriorities() {
  return useQuery({
    queryKey: queryKeys.priorities.deviceTypes(),
    queryFn: () => priorityService.getDeviceTypePriorities(),
  });
}

export function useBulkUpdateDeviceTypePriorities() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeviceTypePriorityBulkUpdate) =>
      priorityService.bulkUpdateDeviceTypePriorities(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.priorities.all,
      });
      toast.success('Las prioridades por tipo de dispositivo se actualizaron correctamente');
    },
    onError: (error) => {
      toast.error(
        `No se pudieron actualizar las prioridades de dispositivos: ${getErrorMessage(error)}`
      );
    },
  });
}

// ==================== User Data Sources ====================

export function useUserDataSources(userId: string) {
  return useQuery({
    queryKey: queryKeys.priorities.dataSources(userId),
    queryFn: () => priorityService.getUserDataSources(userId),
    enabled: !!userId,
  });
}

export function useUpdateDataSourceEnabled() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      dataSourceId,
      isEnabled,
    }: {
      userId: string;
      dataSourceId: string;
      isEnabled: boolean;
    }) =>
      priorityService.updateDataSourceEnabled(userId, dataSourceId, {
        is_enabled: isEnabled,
      }),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.priorities.dataSources(variables.userId),
      });
      toast.success(
        `Fuente de datos ${variables.isEnabled ? 'activada' : 'desactivada'}`
      );
    },
    onError: (error) => {
      toast.error(`No se pudo actualizar la fuente de datos: ${getErrorMessage(error)}`);
    },
  });
}
