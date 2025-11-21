// Utility functions

export function calculateProgress(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
}

export function determinePerformanceStatus(
  current: number,
  target: number,
  atRiskThreshold = 0.7,
): 'ON_TRACK' | 'AT_RISK' | 'OFF_TRACK' {
  const progress = current / target;

  if (progress >= 0.9) return 'ON_TRACK';
  if (progress >= atRiskThreshold) return 'AT_RISK';
  return 'OFF_TRACK';
}

export function formatPeriod(date: Date): string {
  const year = date.getFullYear();
  const quarter = Math.floor(date.getMonth() / 3) + 1;
  return `${year}-Q${quarter}`;
}

export function getCurrentPeriod(): string {
  return formatPeriod(new Date());
}

export function sanitizeSearchQuery(query: string): string {
  return query.trim().toLowerCase();
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
