import { useState, useMemo, useEffect } from 'react';
import { DashboardData } from '@/domain/types/dashboard';
import { getDashboardData } from '@/services/dashboardService';

interface BatchOption {
  label: string;
  value: string;
}

export const useDashboardData = () => {
  const [selectedBatch, setSelectedBatch] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const batchOptions: BatchOption[] = useMemo(
    () => [
      { value: 'all', label: 'Todos os lotes' },
      { value: 'lote001', label: 'Lote 001' },
      { value: 'lote002', label: 'Lote 002' },
      { value: 'lote003', label: 'Lote 003' },
    ],
    []
  );

  const fetchDashboardData = async (batchId?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getDashboardData(batchId === 'all' ? undefined : batchId);
      setDashboardData(data);
    } catch (err) {
      setError('Erro ao carregar dados do dashboard');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(selectedBatch);
  }, [selectedBatch]);

  const handleBatchChange = (value: string) => {
    setSelectedBatch(value);
  };

  return {
    selectedBatch,
    batchOptions,
    dashboardData,
    isLoading,
    error,
    handleBatchChange,
    refetch: () => fetchDashboardData(selectedBatch),
  };
};
