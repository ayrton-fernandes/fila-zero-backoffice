'use client';

import { Upload } from '@/domain/entities/Upload';
import { Column, Table, Tag, Icon } from '@uigovpe/components';
import { Loading } from '@/components/common/loading/loading';

interface UploadHistoryTableProps {
  uploads: Upload[];
  loading: boolean;
  error?: string | null;
}

export const UploadHistoryTable = ({ uploads, loading, error }: UploadHistoryTableProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusSeverity = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'error':
        return 'danger';
      case 'processing':
        return 'info';
      case 'pending':
        return 'warning';
      default:
        return undefined;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Sucesso';
      case 'error':
        return 'Erro';
      case 'processing':
        return 'Processando';
      case 'pending':
        return 'Pendente';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-8">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <Table value={uploads} emptyMessage="Nenhum upload encontrado">
      <Column field="batchName" header="Lote" sortable />
      <Column
        field="fileName"
        header="Arquivo"
        body={(rowData: Upload) => (
          <div className="flex items-center gap-2">
            <Icon icon="description" className="text-green-600" />
            <span>{rowData.fileName}</span>
          </div>
        )}
        sortable
      />
      <Column
        field="uploadDate"
        header="Data"
        body={(rowData: Upload) => formatDate(rowData.uploadDate)}
        sortable
      />
      <Column field="uploadedBy" header="Usuário" sortable />
      <Column field="totalRecords" header="Registros" sortable />
      <Column
        field="status"
        header="Status"
        body={(rowData: Upload) => (
          <Tag value={getStatusLabel(rowData.status)} severity={getStatusSeverity(rowData.status)} />
        )}
        sortable
      />
    </Table>
  );
};
