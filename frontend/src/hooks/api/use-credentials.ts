import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { credentialsService } from '@/lib/api/services/credentials.service';
import type { ApiKeyCreate } from '@/lib/api/types';
import { queryKeys } from '@/lib/query/keys';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errors/handler';

// Get all API keys
export function useApiKeys() {
  return useQuery({
    queryKey: queryKeys.credentials.list(),
    queryFn: () => credentialsService.getApiKeys(),
  });
}

// Get single API key
export function useApiKey(id: string) {
  return useQuery({
    queryKey: queryKeys.credentials.detail(id),
    queryFn: () => credentialsService.getApiKey(id),
    enabled: !!id,
  });
}

// Create API key
export function useCreateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ApiKeyCreate) => credentialsService.createApiKey(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.credentials.list() });
      toast.success('API key creada correctamente');
    },
    onError: (error) => {
      toast.error(`No se pudo crear la API key: ${getErrorMessage(error)}`);
    },
  });
}

// Revoke API key
export function useRevokeApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => credentialsService.revokeApiKey(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.credentials.list() });
      toast.success('API key revocada correctamente');
    },
    onError: (error) => {
      toast.error(`No se pudo revocar la API key: ${getErrorMessage(error)}`);
    },
  });
}

// Delete API key
export function useDeleteApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => credentialsService.deleteApiKey(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.credentials.list() });
      toast.success('API key eliminada correctamente');
    },
    onError: (error) => {
      toast.error(`No se pudo eliminar la API key: ${getErrorMessage(error)}`);
    },
  });
}
