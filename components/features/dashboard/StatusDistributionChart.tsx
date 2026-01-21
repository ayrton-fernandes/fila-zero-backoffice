import React from 'react';
import { Card, Typography } from '@uigovpe/components';
import { StatusDistribution } from '@/domain/types/dashboard';

interface StatusDistributionChartProps {
  data: StatusDistribution[];
}

export function StatusDistributionChart({ data }: StatusDistributionChartProps) {
  const maxCount = Math.max(...data.map((item) => item.count));

  return (
    <Card className="p-6">
      <Typography variant="h3" className="text-lg font-semibold text-gray-900 mb-6">
        Distribuição por Status
      </Typography>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <Typography variant="small" className="font-medium text-gray-700">
                {item.label}
              </Typography>
              <Typography variant="small" className="text-gray-500">
                {item.count.toLocaleString('pt-BR')} ({item.percentage.toFixed(1)}%)
              </Typography>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${(item.count / maxCount) * 100}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
