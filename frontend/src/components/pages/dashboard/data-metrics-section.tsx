import { cn } from '@/lib/utils';

export interface SeriesTypeMetric {
  series_type: string;
  count: number;
}

export interface WorkoutTypeMetric {
  workout_type: string | null;
  count: number;
}

export interface DataMetricsSectionProps {
  topSeriesTypes: SeriesTypeMetric[];
  topWorkoutTypes: WorkoutTypeMetric[];
  className?: string;
}

export function DataMetricsSection({
  topSeriesTypes,
  topWorkoutTypes,
  className,
}: DataMetricsSectionProps) {
  return (
    <div
      className={cn(
        'bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden',
        className
      )}
    >
      <div className="px-6 py-4 border-b border-zinc-800">
        <h2 className="text-sm font-medium text-white">Métricas de puntos de datos</h2>
        <p className="text-xs text-zinc-500 mt-1">
          Desglose por tipo de serie y tipo de entrenamiento
        </p>
      </div>
      <div className="p-6 space-y-6">
        {/* Top Series Types */}
        <div>
          <h3 className="text-xs font-medium text-zinc-400 mb-3">
            Principales tipos de serie
          </h3>
          <div className="space-y-2">
            {topSeriesTypes.length > 0 ? (
              topSeriesTypes.map((metric, index) => (
                <div
                  key={metric.series_type}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 w-4">
                      {index + 1}.
                    </span>
                    <span className="text-sm text-zinc-300 capitalize">
                      {metric.series_type.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-white">
                    {metric.count.toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-zinc-600">No hay datos disponibles</p>
            )}
          </div>
        </div>

        {/* Top Workout Types */}
        <div>
          <h3 className="text-xs font-medium text-zinc-400 mb-3">
            Principales tipos de entrenamiento
          </h3>
          <div className="space-y-2">
            {topWorkoutTypes.length > 0 ? (
              topWorkoutTypes.map((metric, index) => (
                <div
                  key={metric.workout_type || 'unknown'}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 w-4">
                      {index + 1}.
                    </span>
                    <span className="text-sm text-zinc-300">
                      {metric.workout_type || 'Desconocido'}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-white">
                    {metric.count.toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-zinc-600">No hay datos disponibles</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
