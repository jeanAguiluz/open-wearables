import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface DashboardErrorStateProps {
  onRetry: () => void;
  className?: string;
}

export function DashboardErrorState({
  onRetry,
  className,
}: DashboardErrorStateProps) {
  return (
    <div className={cn('p-8', className)}>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-12 text-center">
        <p className="text-zinc-400 mb-4">
          No se pudieron cargar los datos del panel. Inténtalo de nuevo.
        </p>
        <Button variant="outline" onClick={onRetry}>
          Reintentar
        </Button>
      </div>
    </div>
  );
}
