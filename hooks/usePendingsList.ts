import { useState, useEffect } from 'react';
import { Pending, UpdatePendingInput, ProcessPendingsInput } from '../domain/entities/Pending';
import { pendingService } from '../services/pendingService';

export const usePendingsList = () => {
  const [pendings, setPendings] = useState<Pending[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPendings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await pendingService.getPendings();
      setPendings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar pendências');
      console.error('Error loading pendings:', err);
    } finally {
      setLoading(false);
    }
  };

  const updatePending = async (id: string, input: UpdatePendingInput): Promise<Pending> => {
    try {
      const updated = await pendingService.updatePending(id, input);
      setPendings((prev) =>
        prev.map((pending) => (pending.id === id ? updated : pending))
      );
      return updated;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao atualizar pendência');
    }
  };

  const processSelectedPendings = async (input: ProcessPendingsInput): Promise<boolean> => {
    try {
      const result = await pendingService.processSelectedPendings(input);
      if (result) {
        // Recarregar lista após processar
        await loadPendings();
      }
      return result;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao processar pendências');
    }
  };

  useEffect(() => {
    loadPendings();
  }, []);

  return {
    pendings,
    loading,
    error,
    loadPendings,
    updatePending,
    processSelectedPendings,
  };
};
