import { useState, useCallback, useEffect } from 'react';
import { getUploads, createUpload } from '@/services/uploadService';
import { Upload, CreateUploadInput } from '@/domain/entities/Upload';

export const useUploadsList = () => {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUploads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUploads();
      setUploads(data);
    } catch (err) {
      setError('Não foi possível carregar os uploads');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUploads();
  }, [fetchUploads]);

  const handleCreateUpload = useCallback(
    async (input: CreateUploadInput) => {
      try {
        await createUpload(input);
        await fetchUploads();
      } catch (err) {
        console.error('Erro ao criar upload:', err);
        throw err;
      }
    },
    [fetchUploads]
  );

  return {
    uploads,
    loading,
    error,
    createUpload: handleCreateUpload,
    refreshList: fetchUploads,
  };
};
