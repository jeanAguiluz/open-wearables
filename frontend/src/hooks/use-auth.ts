import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { authService } from '../lib/api';
import { ApiError } from '@/lib/errors/api-error';
import { setSession, clearSession, isAuthenticated } from '../lib/auth/session';
import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../lib/api/types';
import { queryKeys } from '@/lib/query/keys';
import { DEFAULT_REDIRECTS } from '@/lib/constants/routes';

export function useAuth() {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data) => {
      setSession(data.access_token, data.developer_id);
      toast.success('Sesión iniciada correctamente');
      navigate({ to: DEFAULT_REDIRECTS.authenticated });
    },
    onError: (error: unknown) => {
      if (error instanceof ApiError) {
        switch (error.code) {
          case 'UNAUTHORIZED':
            toast.error('Correo o contraseña incorrectos');
            break;
          case 'NETWORK_ERROR':
            toast.error(
              'No se pudo conectar con el servidor. Revisa tu conexión.'
            );
            break;
          case 'TIMEOUT':
            toast.error('La solicitud excedió el tiempo de espera. Inténtalo de nuevo.');
            break;
          case 'SERVER_ERROR':
            toast.error('Error del servidor. Inténtalo más tarde.');
            break;
          default:
            toast.error('No se pudo iniciar sesión. Inténtalo de nuevo.');
        }
      } else {
        toast.error('No se pudo iniciar sesión. Inténtalo de nuevo.');
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterRequest) => {
      await authService.register(data);
      const loginResponse = await authService.login({
        email: data.email,
        password: data.password,
      });
      return loginResponse;
    },
    onSuccess: (data) => {
      setSession(data.access_token, data.developer_id);
      toast.success('Cuenta creada correctamente');
      navigate({ to: DEFAULT_REDIRECTS.authenticated });
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : 'No se pudo completar el registro';
      toast.error(message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearSession();
      toast.success('Sesión cerrada correctamente');
      navigate({ to: DEFAULT_REDIRECTS.unauthenticated });
    },
    onError: () => {
      clearSession();
      navigate({ to: DEFAULT_REDIRECTS.unauthenticated });
    },
  });

  const meQuery = useQuery({
    queryKey: queryKeys.auth.session(),
    queryFn: () => authService.me(),
    enabled: isAuthenticated(),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      authService.forgotPassword(data),
    onSuccess: () => {
      toast.success(
        'Si existe una cuenta con ese correo, ya enviamos las instrucciones para restablecer la contraseña'
      );
    },
    onError: () => {
      toast.success(
        'Si existe una cuenta con ese correo, ya enviamos las instrucciones para restablecer la contraseña'
      );
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
    onSuccess: () => {
      toast.success('Contraseña restablecida correctamente');
      navigate({ to: DEFAULT_REDIRECTS.unauthenticated });
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : 'No se pudo restablecer la contraseña. Es posible que el enlace haya expirado.';
      toast.error(message);
    },
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isForgotPasswordPending: forgotPasswordMutation.isPending,
    isResetPasswordPending: resetPasswordMutation.isPending,
    isAuthenticated: isAuthenticated(),
    me: meQuery.data,
    isMeLoading: meQuery.isLoading,
  };
}
