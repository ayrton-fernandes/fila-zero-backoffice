'use client';

import React, { useState } from 'react';
import { PageInfo } from '@/components/layout/pageInfo';
import { Card, Button } from '@uigovpe/components';
import { PendingsTable } from '../../../components/features/pendings/PendingsTable';
import { CorrectPhoneModal } from '../../../components/features/pendings/CorrectPhoneModal';
import { usePendingsList } from '../../../hooks/usePendingsList';
import { Pending, UpdatePendingInput } from '../../../domain/entities/Pending';
import { Loading } from '@/components/common/loading/loading';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export default function PendenciasPage() {
  const {
    pendings,
    loading,
    error,
    updatePending,
    processSelectedPendings,
  } = usePendingsList();

  const [selectedPendings, setSelectedPendings] = useState<Pending[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPending, setSelectedPending] = useState<Pending | null>(null);
  const [processing, setProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const toast = useRef<Toast>(null);

  const handleCorrectClick = (pending: Pending) => {
    setSelectedPending(pending);
    setModalVisible(true);
  };

  const handleSaveCorrection = async (id: string, input: UpdatePendingInput) => {
    try {
      await updatePending(id, input);
      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Correção salva com sucesso',
        life: 3000,
      });
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: error instanceof Error ? error.message : 'Erro ao salvar correção',
        life: 3000,
      });
      throw error;
    }
  };

  const handleProcessSelected = async () => {
    if (selectedPendings.length === 0) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Selecione pelo menos uma pendência',
        life: 3000,
      });
      return;
    }

    // Verificar se todas as pendências selecionadas foram corrigidas
    const uncorrected = selectedPendings.filter((p) => p.status !== 'corrected');

    if (uncorrected.length > 0) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Atenção',
        detail: `${uncorrected.length} pendência(s) selecionada(s) não foi(ram) corrigida(s). Corrija antes de processar.`,
        life: 3000,
      });
      return;
    }

    try {
      setProcessing(true);
      const pendingIds = selectedPendings.map((p) => p.id);
      await processSelectedPendings({ pendingIds });
      setSelectedPendings([]);
      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: `${pendingIds.length} pendência(s) enviada(s) para automação`,
        life: 3000,
      });
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: error instanceof Error ? error.message : 'Erro ao processar pendências',
        life: 3000,
      });
    } finally {
      setProcessing(false);
    }
  };

  const handlePageChange = (page: number, newPageSize?: number) => {
    setCurrentPage(page);
    if (newPageSize) {
      setPageSize(newPageSize);
    }
  };

  const pendingCount = pendings.filter((p) => p.status === 'pending').length;
  const totalElements = pendings.length;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        <PageInfo
          title="Pendências de Contato"
          descriptions={['Corrija os contatos de pacientes com problemas de validação']}
        />
        <Message severity="error" text={error} />
      </div>
    );
  }

  return (
    <div>
      <Toast ref={toast} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1.5rem',
        }}
      >
        <PageInfo
          title="Pendências de Contato"
          descriptions={['Corrija os contatos de pacientes com problemas de validação']}
        />
        {pendingCount > 0 && (
          <div
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '1rem',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            {pendingCount} pendências
          </div>
        )}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <Message
          severity="info"
          text="Selecione os pacientes que deseja processar. Atenção: apenas pacientes com correção salva podem ser enviados para automação."
        />
      </div>

      <Card>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            label="Processar selecionados"
            onClick={handleProcessSelected}
            disabled={selectedPendings.length === 0 || processing}
            loading={processing}
          />
        </div>

        <PendingsTable
          pendings={pendings}
          selectedPendings={selectedPendings}
          onSelectionChange={setSelectedPendings}
          onCorrectClick={handleCorrectClick}
          totalElements={totalElements}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </Card>

      <CorrectPhoneModal
        visible={modalVisible}
        pending={selectedPending}
        onHide={() => setModalVisible(false)}
        onSave={handleSaveCorrection}
      />
    </div>
  );
}
