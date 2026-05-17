'use client';

import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    label: string;
  };
  accentColor?: string;
}

const trendColors = {
  up: 'text-green-600',
  down: 'text-red-600',
  neutral: 'text-zinc-500',
};

const trendArrows = {
  up: '↑',
  down: '↓',
  neutral: '→',
};

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  accentColor = 'bg-indigo-50 text-indigo-600',
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">{label}</p>
          <p className="mt-1 text-3xl font-bold text-zinc-900">{value}</p>
          {trend && (
            <p className={`mt-1 text-xs font-medium ${trendColors[trend.direction]}`}>
              {trendArrows[trend.direction]} {trend.label}
            </p>
          )}
        </div>
        <div className={`rounded-lg p-2 ${accentColor}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
