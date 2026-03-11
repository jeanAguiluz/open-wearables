import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { oauthService } from '@/lib/api/services/oauth.service';
import type { OAuthProvidersUpdate } from '@/lib/api/services/oauth.service';
import { queryKeys } from '@/lib/query/keys';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errors/handler';

// Get OAuth providers
export function useOAuthProviders(
  cloudOnly: boolean = false,
  enabledOnly: boolean = false
) {
  return useQuery({
    queryKey: queryKeys.oauthProviders.list(cloudOnly, enabledOnly),
    queryFn: () => oauthService.getProviders(cloudOnly, enabledOnly),
  });
}

// Update OAuth providers
export function useUpdateOAuthProviders() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OAuthProvidersUpdate) =>
      oauthService.updateProviders(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.oauthProviders.all,
      });
      toast.success('La configuración de proveedores se actualizó correctamente');
    },
    onError: (error) => {
      toast.error(`No se pudieron actualizar los proveedores: ${getErrorMessage(error)}`);
    },
  });
}
