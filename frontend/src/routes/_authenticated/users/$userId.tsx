import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState, useRef, useMemo, type ReactNode } from 'react';
import {
  ArrowLeft,
  Link as LinkIcon,
  Trash2,
  Check,
  Upload,
  Loader2,
  User,
  Dumbbell,
  Activity,
  Moon,
  Scale,
  Smartphone,
  Copy,
  type LucideIcon,
} from 'lucide-react';
import {
  useUser,
  useDeleteUser,
  useAppleXmlUpload,
  useGenerateInvitationCode,
} from '@/hooks/api/use-users';
import { ROUTES } from '@/lib/constants/routes';
import { API_CONFIG } from '@/lib/api/config';
import { copyToClipboard } from '@/lib/utils/clipboard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ProfileSection } from '@/components/user/profile-section';
import { SleepSection } from '@/components/user/sleep-section';
import { ActivitySection } from '@/components/user/activity-section';
import { BodySection } from '@/components/user/body-section';
import { WorkoutSection } from '@/components/user/workout-section';
import type { DateRangeValue } from '@/components/ui/date-range-selector';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

export const Route = createFileRoute('/_authenticated/users/$userId')({
  component: UserDetailPage,
});

interface TabConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  content: ReactNode;
}

function UserDetailPage() {
  const { userId } = Route.useParams();
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useUser(userId);

  // Tab state
  const [activeTab, setActiveTab] = useState('profile');

  // Date range states for different sections
  const [workoutDateRange, setWorkoutDateRange] = useState<DateRangeValue>(30);
  const [activityDateRange, setActivityDateRange] =
    useState<DateRangeValue>(30);
  const [sleepDateRange, setSleepDateRange] = useState<DateRangeValue>(30);

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { handleUpload, isUploading: isUploadingFile } = useAppleXmlUpload();
  const {
    mutate: generateInvitationCode,
    data: invitationCodeData,
    isPending: isGeneratingCode,
  } = useGenerateInvitationCode();
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isUploading = isUploadingFile(userId);

  // Tab configuration
  const tabs: TabConfig[] = useMemo(
    () => [
      {
        id: 'profile',
        label: 'Perfil',
        icon: User,
        content: <ProfileSection userId={userId} />,
      },
      {
        id: 'workouts',
        label: 'Entrenamientos',
        icon: Dumbbell,
        content: (
          <WorkoutSection
            userId={userId}
            dateRange={workoutDateRange}
            onDateRangeChange={setWorkoutDateRange}
          />
        ),
      },
      {
        id: 'activity',
        label: 'Actividad',
        icon: Activity,
        content: (
          <ActivitySection
            userId={userId}
            dateRange={activityDateRange}
            onDateRangeChange={setActivityDateRange}
          />
        ),
      },
      {
        id: 'sleep',
        label: 'Sueño',
        icon: Moon,
        content: (
          <SleepSection
            userId={userId}
            dateRange={sleepDateRange}
            onDateRangeChange={setSleepDateRange}
          />
        ),
      },
      {
        id: 'body',
        label: 'Cuerpo',
        icon: Scale,
        content: <BodySection userId={userId} />,
      },
    ],
    [userId, workoutDateRange, activityDateRange, sleepDateRange]
  );

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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = () => {
    deleteUser(userId, {
      onSuccess: () => {
        navigate({ to: ROUTES.users });
      },
    });
  };

  const handleGenerateInvitationCode = () => {
    generateInvitationCode(userId, {
      onSuccess: () => {
        setIsCodeDialogOpen(true);
      },
    });
  };

  const handleCopyCode = async () => {
    const success = await copyToClipboard(
      invitationCodeData?.code || '',
      'Código de invitación copiado al portapapeles'
    );
    if (success) {
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };
  if (!userLoading && !user) {
    return (
      <div className="p-8">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-400">Usuario no encontrado</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to={ROUTES.users}>
              <ArrowLeft className="h-4 w-4" />
              Volver a usuarios
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to={ROUTES.users}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          {userLoading ? (
            <div className="space-y-2">
              <div className="h-7 w-48 bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-32 bg-zinc-800/50 rounded animate-pulse" />
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-medium text-white">
                {user?.first_name || user?.last_name
                  ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim()
                  : 'Usuario sin nombre'}
              </h1>
              <p className="text-sm text-zinc-500">
                {user?.email || 'Sin correo'}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={handleUploadClick}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Subir XML de Apple Health
              </>
            )}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xml"
            onChange={(e) => handleUpload(userId, e)}
            className="hidden"
          />
          <Button variant="secondary" onClick={handleCopyPairLink}>
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                Copiado
              </>
            ) : (
              <>
                <LinkIcon className="h-4 w-4" />
                Copiar enlace de vinculación
              </>
            )}
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                onClick={handleGenerateInvitationCode}
                disabled={isGeneratingCode}
              >
                {isGeneratingCode ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Smartphone className="h-4 w-4" />
                    Conectar app móvil
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Genera un código de un solo uso para conectar la app iOS de Open Wearables
            </TooltipContent>
          </Tooltip>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={isDeleting}>
                <Trash2 className="h-4 w-4" />
                {isDeleting ? 'Eliminando...' : 'Eliminar usuario'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Eliminar usuario</AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Seguro que quieres eliminar a este usuario? Esta acción no
                  se puede deshacer y eliminará permanentemente todos los datos
                  asociados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="gap-2">
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-6">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>

      {/* Invitation Code Dialog */}
      <Dialog open={isCodeDialogOpen} onOpenChange={setIsCodeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Conectar app móvil</DialogTitle>
            <DialogDescription>
              Ingresa estos datos en la app iOS de Open Wearables para
              conectarla con la cuenta de este usuario. El código de invitación
              es de un solo uso y vencerá.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-url" className="text-zinc-300">
                URL de la API
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="api-url"
                  readOnly
                  value={API_CONFIG.baseUrl}
                  className="bg-zinc-800 border-zinc-700 font-mono text-sm focus-visible:ring-0"
                />
                <Button
                  onClick={async () => {
                    const success = await copyToClipboard(
                      API_CONFIG.baseUrl,
                      'URL de la API copiada al portapapeles'
                    );
                    if (success) {
                      setUrlCopied(true);
                      setTimeout(() => setUrlCopied(false), 2000);
                    }
                  }}
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  aria-label="Copiar URL de la API"
                >
                  {urlCopied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="invitation-code" className="text-zinc-300">
                Código de invitación
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="invitation-code"
                  readOnly
                  value={invitationCodeData?.code || ''}
                  className="bg-zinc-800 border-zinc-700 font-mono text-lg tracking-widest text-center focus-visible:ring-0"
                />
                <Button
                  onClick={handleCopyCode}
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  aria-label="Copiar código de invitación"
                >
                  {codeCopied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {invitationCodeData?.expires_at && (
                <p className="text-xs text-zinc-500">
                  Expira:{' '}
                  {new Date(invitationCodeData.expires_at).toLocaleString('es-CL')}
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
