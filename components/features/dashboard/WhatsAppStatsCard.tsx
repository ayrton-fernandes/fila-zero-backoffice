import React from 'react';
import { Card, Typography } from '@uigovpe/components';
import { ProgressBar } from 'primereact/progressbar';
import { WhatsAppMessageStats } from '@/domain/types/dashboard';
import { cn } from '@/lib/utils';

interface WhatsAppStatsCardProps {
  stats: WhatsAppMessageStats;
}

export function WhatsAppStatsCard({ stats }: WhatsAppStatsCardProps) {
  const percentage = (stats.sent / stats.limit) * 100;

  const statusStyles = {
    normal: {
      bg: 'bg-green-50 border-green-100',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-600',
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-100',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-600',
    },
    critical: {
      bg: 'bg-red-50 border-red-100',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      textColor: 'text-red-600',
    },
  };

  const currentStyles = statusStyles[stats.status];

  return (
    <Card className={cn('p-6', currentStyles.bg)}>
      <div className="flex items-start gap-4">
        <div className={cn('rounded-full p-3 shrink-0', currentStyles.iconBg)}>
          <i className={cn('pi pi-whatsapp text-2xl', currentStyles.iconColor)} />
        </div>

        <div className="flex-1">
          <Typography variant="small" className="text-gray-600 mb-2">
            Mensagens enviadas hoje
          </Typography>
          <div className="flex items-baseline gap-2 mb-3">
            <Typography variant="h2" className="text-3xl font-bold text-gray-900">
              {stats.sent.toLocaleString('pt-BR')}
            </Typography>
            <Typography variant="p" className="text-gray-500">
              / {stats.limit.toLocaleString('pt-BR')}
            </Typography>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1">
              <ProgressBar
                value={percentage}
                showValue={false}
                style={{ height: '8px' }}
                className="progress-bar-custom"
              />
            </div>
            <Typography variant="small" className={cn('font-medium', currentStyles.textColor)}>
              {percentage.toFixed(1)}%
            </Typography>
          </div>

          <Typography variant="small" className="text-gray-500">
            {stats.resetInfo}
          </Typography>
        </div>
      </div>
    </Card>
  );
}
