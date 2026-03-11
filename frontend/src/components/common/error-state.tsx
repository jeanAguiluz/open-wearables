import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Algo salió mal',
  message = 'Ocurrió un error al cargar los datos. Inténtalo de nuevo.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center',
        className
      )}
    >
      <div className="rounded-full bg-destructive/10 p-3">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="mt-4">
          Reintentar
        </Button>
      )}
    </div>
  );
}
