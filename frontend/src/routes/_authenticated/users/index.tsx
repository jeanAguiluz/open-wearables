import { createFileRoute } from '@tanstack/react-router';
import { useState, useCallback } from 'react';
import { Plus, Users as UsersIcon } from 'lucide-react';
import { useUsers, useDeleteUser, useCreateUser } from '@/hooks/api/use-users';
import type { UserCreate, UserQueryParams } from '@/lib/api/types';
import { UsersTable } from '@/components/users/users-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const initialFormState: UserCreate = {
  external_user_id: '',
  first_name: '',
  last_name: '',
  email: '',
};

const DEFAULT_PAGE_SIZE = 9;

export const Route = createFileRoute('/_authenticated/users/')({
  component: UsersPage,
});

function UsersPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserCreate>(initialFormState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [queryParams, setQueryParams] = useState<UserQueryParams>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    sort_by: 'created_at',
    sort_order: 'desc',
  });

  const { data, isLoading, isFetching, error, refetch } = useUsers(queryParams);
  const deleteUser = useDeleteUser();
  const createUser = useCreateUser();

  const handleQueryChange = useCallback((params: UserQueryParams) => {
    setQueryParams(params);
  }, []);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (formData.external_user_id && formData.external_user_id.length > 255) {
      errors.external_user_id =
        'El ID externo de usuario debe tener 255 caracteres o menos';
    }

    if (formData.first_name && formData.first_name.length > 100) {
      errors.first_name = 'El nombre debe tener 100 caracteres o menos';
    }

    if (formData.last_name && formData.last_name.length > 100) {
      errors.last_name = 'El apellido debe tener 100 caracteres o menos';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Ingresa un correo electrónico válido';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateUser = () => {
    if (!validateForm()) return;

    const payload: UserCreate = {
      external_user_id: formData.external_user_id?.trim() || null,
      first_name: formData.first_name?.trim() || null,
      last_name: formData.last_name?.trim() || null,
      email: formData.email?.trim() || null,
    };

    createUser.mutate(payload, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
        setFormData(initialFormState);
        setFormErrors({});
      },
    });
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setFormData(initialFormState);
    setFormErrors({});
  };

  const handleDeleteUser = () => {
    if (deleteUserId) {
      deleteUser.mutate(deleteUserId, {
        onSuccess: () => {
          setDeleteUserId(null);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-white">Usuarios</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Administra los usuarios de tu plataforma
          </p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-zinc-800 rounded-md w-full" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-zinc-800/50 rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center">
          <p className="text-zinc-400 mb-4">
            No se pudieron cargar los usuarios. Inténtalo de nuevo.
          </p>
          <Button onClick={() => refetch()}>Reintentar</Button>
        </div>
      </div>
    );
  }

  const users = data?.items ?? [];
  const total = data?.total ?? 0;
  const pageCount = data?.pages ?? 0;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-medium text-white">Usuarios</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Administra los usuarios de tu plataforma y sus conexiones de wearables
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Agregar usuario
        </Button>
      </div>

      {total > 0 || queryParams.search ? (
        <UsersTable
          data={users}
          total={total}
          page={queryParams.page ?? 1}
          pageSize={queryParams.limit ?? DEFAULT_PAGE_SIZE}
          pageCount={pageCount}
          isLoading={isFetching}
          onDelete={setDeleteUserId}
          isDeleting={deleteUser.isPending}
          onQueryChange={handleQueryChange}
        />
      ) : (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-12 text-center">
          <UsersIcon className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400 mb-2">No se encontraron usuarios</p>
          <Button
            variant="outline"
            onClick={() => setIsCreateDialogOpen(true)}
            className="mt-4"
          >
            <Plus className="h-4 w-4" />
            Crear el primer usuario
          </Button>
        </div>
      )}

      <Dialog
        open={isCreateDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseCreateDialog();
          } else {
            setIsCreateDialogOpen(true);
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Crear nuevo usuario</DialogTitle>
            <DialogDescription>
              Crea un nuevo usuario para conectar dispositivos wearables y
              recopilar datos de salud.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="external_user_id" className="text-zinc-300">
                ID externo de usuario
              </Label>
              <Input
                id="external_user_id"
                type="text"
                placeholder="por ejemplo, user_12345 o ID de sistema externo"
                value={formData.external_user_id || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    external_user_id: e.target.value,
                  })
                }
                maxLength={255}
                className="bg-zinc-800 border-zinc-700"
              />
              {formErrors.external_user_id && (
                <p className="text-xs text-red-500">
                  {formErrors.external_user_id}
                </p>
              )}
              <p className="text-[10px] text-zinc-600">
                Tu identificador único para este usuario (máximo 255 caracteres)
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="first_name" className="text-zinc-300">
                  Nombre
                </Label>
                <Input
                  id="first_name"
                  type="text"
                  placeholder="John"
                  value={formData.first_name || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                  maxLength={100}
                  className="bg-zinc-800 border-zinc-700"
                />
                {formErrors.first_name && (
                  <p className="text-xs text-red-500">
                    {formErrors.first_name}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="last_name" className="text-zinc-300">
                  Apellido
                </Label>
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Doe"
                  value={formData.last_name || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                  maxLength={100}
                  className="bg-zinc-800 border-zinc-700"
                />
                {formErrors.last_name && (
                  <p className="text-xs text-red-500">{formErrors.last_name}</p>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-zinc-300">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email || ''}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-zinc-800 border-zinc-700"
              />
              {formErrors.email && (
                <p className="text-xs text-red-500">{formErrors.email}</p>
              )}
            </div>
          </div>
          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={handleCloseCreateDialog}>
              Cancelar
            </Button>
            <Button onClick={handleCreateUser} disabled={createUser.isPending}>
              {createUser.isPending ? 'Creando...' : 'Crear usuario'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!deleteUserId}
        onOpenChange={(open) => !open && setDeleteUserId(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>¿Eliminar usuario?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Eliminará permanentemente al
              usuario y todos sus datos asociados, incluidos:
            </DialogDescription>
          </DialogHeader>
          <div>
            <ul className="list-disc list-inside text-sm text-zinc-500 space-y-1">
              <li>Todas las conexiones con dispositivos wearables</li>
              <li>Todos los datos de salud (sueño, actividad)</li>
              <li>Todos los disparadores de automatizaciones de este usuario</li>
            </ul>
            <div className="mt-4 p-3 bg-zinc-800 rounded-md">
              <p className="text-xs text-zinc-500">ID de usuario:</p>
              <code className="font-mono text-sm text-zinc-300">
                {deleteUserId}
              </code>
            </div>
          </div>
          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setDeleteUserId(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteUser}
              disabled={deleteUser.isPending}
            >
              {deleteUser.isPending ? 'Eliminando...' : 'Eliminar usuario'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
