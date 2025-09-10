import { ReactNode } from 'react';
import { getStatsColor, type StatsVariant } from '@/lib/design-tokens/colors';

interface StatItem {
  label: string;
  value: string | number;
  color?: StatsVariant;
  icon?: ReactNode;
  suffix?: string;
}

interface StatsGridProps {
  stats: StatItem[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

const getColorClass = (color?: StatsVariant) => {
  if (!color) return 'text-primary';
  return getStatsColor(color).text;
};

export function StatsGrid({ 
  stats, 
  columns = 3,
  className = ''
}: StatsGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            {stat.icon}
            <div className={`text-2xl font-bold ${stat.color ? getColorClass(stat.color) : 'text-primary'}`}>
              {stat.value}
              {stat.suffix}
            </div>
          </div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}