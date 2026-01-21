'use client';

import React from 'react';
import { Dropdown, Typography } from '@uigovpe/components';
import { Loading } from '@/components/common/loading/loading';
import { PageInfo } from '@/components/layout/pageInfo';
import { StatCard } from '@/components/features/dashboard/StatCard';
import { WhatsAppStatsCard } from '@/components/features/dashboard/WhatsAppStatsCard';
import { RecentUploads } from '@/components/features/dashboard/RecentUploads';
import { StatusDistributionChart } from '@/components/features/dashboard/StatusDistributionChart';
import { useDashboardData } from '@/hooks/features/dashboard/useDashboardData';

export default function DashboardPage() {
  const { selectedBatch, batchOptions, dashboardData, isLoading, error, handleBatchChange } =
    useDashboardData();

  const dropdownOptions = batchOptions.map((option) => ({
    label: option.label,
    value: option.value,
  }));

  if (error) {
    return (
      <div className="px-2 py-3.5 flex items-center justify-center min-h-96">
        <div className="text-center">
          <Typography variant="h2" className="text-red-600 mb-2">
            Erro ao carregar dados
          </Typography>
          <Typography variant="p" className="text-gray-600">
            {error}
          </Typography>
        </div>
      </div>
    );
  }

  if (isLoading || !dashboardData) {
    return (
      <div className="px-2 py-3.5 flex items-center justify-center min-h-96">
        <Loading />
      </div>
    );
  }

  return (
    <div className="px-2 py-3.5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <PageInfo
          title="Dashboard"
          descriptions={['Visão geral do processamento de pacientes']}
        />
        <div className="min-w-50">
          <Dropdown
            value={selectedBatch}
            options={dropdownOptions}
            onChange={(e) => handleBatchChange(e.value)}
            placeholder="Selecione um lote"
            className="w-full"
          />
        </div>
      </div>

      {/* WhatsApp Stats Card */}
      <WhatsAppStatsCard stats={dashboardData.whatsAppStats} />

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Processados"
          value={dashboardData.stats.totalProcessed}
          subtitle={dashboardData.stats.totalProcessedPeriod}
          variant="blue"
          icon="description"
        />

        <StatCard
          title="SIM"
          value={dashboardData.stats.yesCount}
          percentage={dashboardData.stats.yesPercentage}
          variant="green"
          icon="check_circle"
        />

        <StatCard
          title="NÃO"
          value={dashboardData.stats.noCount}
          percentage={dashboardData.stats.noPercentage}
          variant="red"
          icon="cancel"
        />

        <StatCard
          title="NÃO SOU EU"
          value={dashboardData.stats.notMeCount}
          percentage={dashboardData.stats.notMePercentage}
          variant="yellow"
          icon="help"
        />

        <StatCard
          title="Pendentes"
          value={dashboardData.stats.pendingCount}
          subtitle="Aguardando resposta"
          variant="gray"
          icon="schedule"
        />
      </div>

      {/* Bottom Section - Uploads and Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentUploads uploads={dashboardData.recentUploads} />
        <StatusDistributionChart data={dashboardData.statusDistribution} />
      </div>
    </div>
  );
}
