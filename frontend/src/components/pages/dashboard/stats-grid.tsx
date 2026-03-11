import { Users, Activity, Database } from 'lucide-react';
import { StatsCard } from './stats-card';
import { cn } from '@/lib/utils';
import type { DashboardStats } from '@/lib/api/types';

export interface StatsGridProps {
  stats: DashboardStats;
  className?: string;
}

export function StatsGrid({ stats, className }: StatsGridProps) {
  const statCards = [
    {
      title: 'Usuarios totales',
      value: stats.total_users.count,
      suffix: '',
      description: 'Usuarios registrados',
      icon: Users,
      growth: stats.total_users.weekly_growth,
    },
    {
      title: 'Conexiones activas',
      value: stats.active_conn.count,
      suffix: '',
      description: 'Wearables conectados',
      icon: Activity,
      growth: stats.active_conn.weekly_growth,
    },
    {
      title: 'Puntos de datos',
      value: stats.data_points.count / 1000,
      suffix: 'K',
      description: 'Datos de salud recopilados',
      icon: Database,
      decimalPlaces: 1,
      growth: stats.data_points.weekly_growth,
    },
  ];

  return (
    <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-3', className)}>
      {statCards.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          suffix={stat.suffix}
          description={stat.description}
          icon={stat.icon}
          growth={stat.growth}
          decimalPlaces={stat.decimalPlaces}
        />
      ))}
    </div>
  );
}
