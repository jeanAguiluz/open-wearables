import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { invitationsService } from '@/lib/api/services/invitations.service';
import type {
  Invitation,
  InvitationCreate,
  InvitationAccept,
} from '@/lib/api/types';
import { queryKeys } from '@/lib/query/keys';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errors/handler';

export function useInvitations() {
  return useQuery({
    queryKey: queryKeys.invitations.list(),
    queryFn: () => invitationsService.getInvitations(),
  });
}

export function useCreateInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InvitationCreate) =>
      invitationsService.createInvitation(data),
    onSuccess: (createdInvitation) => {
      // Optimistically set status to 'sent' since email sending usually succeeds
      // On page refresh, the real status will be fetched (sent or failed)
      queryClient.setQueryData(
        queryKeys.invitations.list(),
        (old: Invitation[] = []) => [
          ...old,
          { ...createdInvitation, status: 'sent' },
        ]
      );
      toast.success('Invitación enviada correctamente');
    },
    onError: (error) => {
      toast.error(`No se pudo enviar la invitación: ${getErrorMessage(error)}`);
    },
  });
}

export function useRevokeInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => invitationsService.revokeInvitation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.invitations.list() });
      toast.success('Invitación revocada correctamente');
    },
    onError: (error) => {
      toast.error(`No se pudo revocar la invitación: ${getErrorMessage(error)}`);
    },
  });
}

export function useResendInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => invitationsService.resendInvitation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.invitations.list() });
      toast.success('Invitación reenviada correctamente');
    },
    onError: (error) => {
      toast.error(`No se pudo reenviar la invitación: ${getErrorMessage(error)}`);
    },
  });
}

export function useAcceptInvitation() {
  return useMutation({
    mutationFn: (data: InvitationAccept) =>
      invitationsService.acceptInvitation(data),
    onSuccess: () => {
      toast.success('Invitación aceptada correctamente');
    },
    onError: (error) => {
      toast.error(`No se pudo aceptar la invitación: ${getErrorMessage(error)}`);
    },
  });
}
