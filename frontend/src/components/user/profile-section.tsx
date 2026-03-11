import { useState, useEffect } from 'react';
import { Link as LinkIcon, Check, Copy, Pencil } from 'lucide-react';
import { useUserConnections } from '@/hooks/api/use-health';
import { useUser, useUpdateUser } from '@/hooks/api/use-users';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatDate, truncateId } from '@/lib/utils/format';
import { copyToClipboard } from '@/lib/utils/clipboard';
import { ConnectionCard } from '@/components/user/connection-card';

interface ProfileSectionProps {
  userId: string;
}

export function ProfileSection({ userId }: ProfileSectionProps) {
  const { data: user, isLoading: userLoading } = useUser(userId);
  const { data: connections, isLoading: connectionsLoading } =
    useUserConnections(userId);
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const [copied, setCopied] = useState(false);
  const [copiedUserId, setCopiedUserId] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    external_user_id: '',
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        external_user_id: user.external_user_id || '',
      });
    }
  }, [user]);

  const handleCopyUserId = async () => {
    const success = await copyToClipboard(
      userId,
      'ID de usuario copiado al portapapeles'
    );
    if (success) {
      setCopiedUserId(true);
      setTimeout(() => setCopiedUserId(false), 2000);
    }
  };

  const handleCopyPairLink = async () => {
    const pairLink = `${window.location.origin}/users/${userId}/pair`;
    const success = await copyToClipboard(
      pairLink,
      'Enlace de vinculación copiado al portapapeles'
    );
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEditSubmit = () => {
    updateUser(
      {
        id: userId,
        data: {
          first_name: editForm.first_name || null,
          last_name: editForm.last_name || null,
          email: editForm.email || null,
          external_user_id: editForm.external_user_id || null,
        },
      },
      {
        onSuccess: () => {
          setIsEditDialogOpen(false);
        },
      }
    );
  };

  return (
    <>
      <div className="space-y-6">
        {/* User Information */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white">
              Información del usuario
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditDialogOpen(true)}
              className="text-zinc-400 hover:text-white"
            >
              <Pencil className="h-3.5 w-3.5" />
              Editar
            </Button>
          </div>
          <div className="p-6">
            {userLoading ? (
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="h-4 w-16 bg-zinc-800/50 rounded animate-pulse" />
                  <div className="h-5 w-48 bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-16 bg-zinc-800/50 rounded animate-pulse" />
                  <div className="h-5 w-32 bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">ID de usuario</p>
                  <div className="flex items-center gap-1.5">
                    <code className="font-mono text-sm text-zinc-300 bg-zinc-800 px-2 py-1 rounded">
                      {truncateId(user?.id ?? '')}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={handleCopyUserId}
                    >
                      {copiedUserId ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">
                    ID externo de usuario
                  </p>
                  <code className="font-mono text-sm text-zinc-300 bg-zinc-800 px-2 py-1 rounded">
                    {user?.external_user_id || '—'}
                  </code>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Correo</p>
                  <p className="text-sm text-zinc-300">{user?.email || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Creado</p>
                  <p className="text-sm text-zinc-300">
                    {formatDate(user?.created_at)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Connected Providers */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800">
            <h2 className="text-sm font-medium text-white">
              Proveedores conectados
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Dispositivos wearables y plataformas de salud conectados a esta persona usuaria
            </p>
          </div>
          <div className="p-6">
            {connectionsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="p-4 border border-zinc-800 rounded-lg space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-24 bg-zinc-800 rounded animate-pulse" />
                      <div className="h-5 w-16 bg-zinc-800/50 rounded animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-40 bg-zinc-800/50 rounded animate-pulse" />
                      <div className="h-4 w-36 bg-zinc-800/50 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : connections && connections.length > 0 ? (
              <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
                {connections.map((connection) => (
                  <ConnectionCard key={connection.id} connection={connection} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-zinc-500 mb-4">
                  Aún no hay proveedores conectados
                </p>
                <Button variant="outline" onClick={handleCopyPairLink}>
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-500" />
                      Enlace copiado
                    </>
                  ) : (
                    <>
                      <LinkIcon className="h-4 w-4" />
                      Copiar enlace de vinculación
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar usuario</DialogTitle>
            <DialogDescription>
              Actualiza la información del usuario
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name" className="text-zinc-300">
                  Nombre
                </Label>
                <Input
                  id="first_name"
                  value={editForm.first_name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, first_name: e.target.value })
                  }
                  placeholder="John"
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name" className="text-zinc-300">
                  Apellido
                </Label>
                <Input
                  id="last_name"
                  value={editForm.last_name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, last_name: e.target.value })
                  }
                  placeholder="Doe"
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                Correo
              </Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                placeholder="john@example.com"
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="external_user_id" className="text-zinc-300">
                ID externo de usuario
              </Label>
              <Input
                id="external_user_id"
                value={editForm.external_user_id}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    external_user_id: e.target.value,
                  })
                }
                placeholder="external-123"
                className="bg-zinc-800 border-zinc-700"
              />
              <p className="text-xs text-zinc-500">
                Identificador opcional de tu sistema
              </p>
            </div>
          </div>
          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleEditSubmit} disabled={isUpdating}>
              {isUpdating ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
