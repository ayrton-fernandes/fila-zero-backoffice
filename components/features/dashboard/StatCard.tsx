import React from 'react';
import { Card, Icon, IconName, Typography } from '@uigovpe/components';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  percentage?: number;
  icon: IconName;
  variant: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
}

const variantStyles = {
  blue: {
    container: 'bg-blue-50 border-blue-100',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  green: {
    container: 'bg-green-50 border-green-100',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  red: {
    container: 'bg-red-50 border-red-100',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  yellow: {
    container: 'bg-yellow-50 border-yellow-100',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
  gray: {
    container: 'bg-gray-50 border-gray-100',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-600',
  },
};

export function StatCard({ title, value, subtitle, percentage, icon, variant }: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card className={cn('p-6', styles.container)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Typography variant="small" className="text-gray-600 mb-2">
            {title}
          </Typography>
          <Typography variant="h2" className="text-3xl font-bold text-gray-900 mb-1">
            {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
          </Typography>
          {subtitle && (
            <Typography variant="small" className="text-gray-500">
              {subtitle}
            </Typography>
          )}
          {percentage !== undefined && (
            <Typography variant="small" className="text-gray-500 mt-1">
              {percentage.toFixed(1)}% do total
            </Typography>
          )}
        </div>
        <div className={cn('rounded-full p-3', styles.iconBg)}>
          <Icon icon={icon} className={cn('text-2xl', styles.iconColor)} />
        </div>
      </div>
    </Card>
  );
}
