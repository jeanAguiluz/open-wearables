import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import type { BloodPressure } from '@/lib/api/types';

/**
 * BMI category with label and color class
 */
export interface BmiCategory {
  label: string;
  color: string;
}

/**
 * Get BMI category label and color based on BMI value
 */
export function getBmiCategory(bmi: number | null | undefined): BmiCategory {
  if (bmi === null || bmi === undefined) {
    return { label: '', color: 'text-zinc-500' };
  }
  if (bmi < 18.5) return { label: 'Bajo peso', color: 'text-sky-400' };
  if (bmi < 25) return { label: 'Normal', color: 'text-emerald-400' };
  if (bmi < 30) return { label: 'Sobrepeso', color: 'text-amber-400' };
  return { label: 'Obesidad', color: 'text-rose-400' };
}

/**
 * Format the last updated timestamp for display
 */
export function formatLastUpdated(timestamp: string | null): string {
  if (!timestamp) return 'Desconocido';
  try {
    return formatDistanceToNow(new Date(timestamp), {
      addSuffix: true,
      locale: es,
    });
  } catch {
    return 'Desconocido';
  }
}

/**
 * Format period for display (e.g., "7-day average")
 */
export function formatAveragePeriod(days: number): string {
  return days === 1 ? 'Hoy' : `promedio de ${days} días`;
}

/**
 * Format blood pressure reading for display
 */
export function formatBloodPressure(
  bp: BloodPressure | null | undefined
): string {
  if (!bp) return '-';
  const sys = bp.avg_systolic_mmhg;
  const dia = bp.avg_diastolic_mmhg;
  if (sys === null || dia === null) return '-';
  return `${sys}/${dia}`;
}

/**
 * Format heart rate value for display
 */
export function formatHeartRate(bpm: number | null | undefined): string {
  if (bpm === null || bpm === undefined) return '-';
  return String(bpm);
}

/**
 * Format HRV value for display
 */
export function formatHrv(ms: number | null | undefined): string {
  if (ms === null || ms === undefined) return '-';
  return String(Math.round(ms));
}
