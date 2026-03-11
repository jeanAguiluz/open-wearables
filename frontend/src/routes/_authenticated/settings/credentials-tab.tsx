import { useState } from 'react';
import { Plus, Eye, EyeOff, Copy, Trash2, Key } from 'lucide-react';
import { toast } from 'sonner';
import {
  useApiKeys,
  useCreateApiKey,
  useDeleteApiKey,
} from '@/hooks/api/use-credentials';
import { copyToClipboard } from '@/lib/utils/clipboard';
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

export function CredentialsTab() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [keyName, setKeyName] = useState('');

  const { data: apiKeys, isLoading, error, refetch } = useApiKeys();
  const createMutation = useCreateApiKey();
  const deleteMutation = useDeleteApiKey();

  const handleCreate = async () => {
    if (!keyName.trim()) {
      toast.error('Ingresa un nombre para la clave');
      return;
    }

    const newKey = await createMutation.mutateAsync({ name: keyName });
    setIsCreateDialogOpen(false);
    setKeyName('');

    setVisibleKeys((prev) => new Set(prev).add(newKey.id));
  };

  const handleDelete = async (id: string) => {
    if (
      confirm(
        '¿Seguro que quieres eliminar esta API key? Esta acción no se puede deshacer.'
      )
    ) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const maskKey = (key: string) => {
    if (key.length < 10) return '****';
    return key.substring(0, 10) + '****' + key.substring(key.length - 4);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL');
  };

  if (isLoading) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-zinc-800 rounded-md w-full" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-zinc-800/50 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-12 text-center">
        <p className="text-zinc-400 mb-4">No se pudieron cargar las API keys</p>
        <Button onClick={() => refetch()}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium text-white">Credenciales API</h2>
          <p className="text-sm text-zinc-500 mt-1">
            Administra tus API keys y los códigos de inserción de widgets
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Crear API Key
        </Button>
      </div>

      {/* API Keys Table */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h3 className="text-sm font-medium text-white">API Keys</h3>
          <p className="text-xs text-zinc-500 mt-1">
            Usa estas claves para autenticar solicitudes API e integrar widgets
          </p>
        </div>

        {apiKeys && apiKeys.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Clave
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Creada
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider text-right">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {apiKeys.map((key) => (
                  <tr
                    key={key.id}
                    className="hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-zinc-300">
                      {key.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                          {visibleKeys.has(key.id) ? key.id : maskKey(key.id)}
                        </code>
                        <Button
                          variant="ghost-faded"
                          size="icon-sm"
                          onClick={() => toggleKeyVisibility(key.id)}
                        >
                          {visibleKeys.has(key.id) ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost-faded"
                          size="icon-sm"
                          onClick={() => copyToClipboard(key.id)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-500">
                      {formatDate(key.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <Button
                          variant="destructive-outline"
                          size="icon-sm"
                          onClick={() => handleDelete(key.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Key className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400 mb-2">Aún no hay API keys</p>
            <p className="text-sm text-zinc-500 mb-4">
              Crea tu primera clave para comenzar
            </p>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Crear API Key
            </Button>
          </div>
        )}
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Crear nueva API key</DialogTitle>
            <DialogDescription>
              Genera una nueva API key para tu aplicación
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="key_name" className="text-zinc-300">
              Nombre de la clave
            </Label>
            <Input
              id="key_name"
              type="text"
              placeholder="Ej.: API key de producción"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
            />
            <p className="text-[10px] text-zinc-600">
              Un nombre descriptivo para identificar esta clave
            </p>
          </div>
          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateDialogOpen(false);
                setKeyName('');
              }}
              disabled={createMutation.isPending}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreate} disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Creando...' : 'Crear clave'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
