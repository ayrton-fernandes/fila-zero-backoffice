'use client';

import React from 'react';
import { Table, Tag, Button } from '@uigovpe/components';
import { Pending } from '../../../domain/entities/Pending';
import { Column } from 'primereact/column';

interface PendingsTableProps {
  pendings: Pending[];
  selectedPendings: Pending[];
  onSelectionChange: (selected: Pending[]) => void;
  onCorrectClick: (pending: Pending) => void;
  totalElements?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number, pageSize?: number) => void;
}

const pendingReasonLabels: Record<string, string> = {
  invalid_phone: 'Telefone Inválido',
  incomplete_number: 'Número Incompleto',
  fake_number: 'Número Falso',
  empty_field: 'Campo Vazio',
  invalid_format: 'Formato Inválido',
  not_me: 'Não é o Paciente',
};

const pendingReasonSeverity: Record<string, 'danger' | 'warning' | 'info' | 'success'> = {
  invalid_phone: 'danger',
  incomplete_number: 'warning',
  fake_number: 'danger',
  empty_field: 'warning',
  invalid_format: 'warning',
  not_me: 'info',
};

const headerCellStyle = {
  headerCell: {
    className: 'font-bold text-sm',
  },
};

export function PendingsTable({
  pendings,
  selectedPendings,
  onSelectionChange,
  onCorrectClick,
  totalElements = 0,
  currentPage = 0,
  pageSize = 10,
  onPageChange,
}: PendingsTableProps) {
  const phoneBodyTemplate = (rowData: Pending) => {
    return <span>{rowData.currentPhone || '-'}</span>;
  };

  const statusBodyTemplate = (rowData: Pending) => {
    const isCorrected = rowData.status === 'corrected';
    return (
      <Tag
        severity={isCorrected ? 'success' : 'warning'}
        value={isCorrected ? 'Corrigido' : 'Pendente'}
      />
    );
  };

  const reasonBodyTemplate = (rowData: Pending) => {
    const label = pendingReasonLabels[rowData.pendingReason] || rowData.pendingReason;
    const severity = pendingReasonSeverity[rowData.pendingReason] || 'info';

    return <Tag severity={severity} value={label} />;
  };

  const actionBodyTemplate = (rowData: Pending) => {
    return (
      <Button
        label="Corrigir"
        outlined
        size="small"
        onClick={() => onCorrectClick(rowData)}
      />
    );
  };

  return (
    <Table
      pt={{
        bodyRow: {
          className: 'text-sm font-normal',
        },
        root: {
          className: 'w-full',
        },
      }}
      value={pendings}
      selection={selectedPendings}
      onSelectionChange={(e) => onSelectionChange(e.value as Pending[])}
      dataKey="id"
      tableStyle={{ width: '100%' }}
      paginator={totalElements > 4}
      rows={pageSize}
      totalRecords={totalElements}
      first={currentPage ? currentPage * pageSize : 0}
      onPage={(e) => {
        const newPage = e.first / e.rows;
        const newPageSize = e.rows;
        onPageChange?.(newPage, newPageSize);
      }}
      rowsPerPageOptions={[5, 10, 20, 30]}
      stripedRows
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
      <Column
        field="cpf"
        header="CPF"
        sortable
        style={{ width: '15%' }}
        pt={headerCellStyle}
      />
      <Column
        field="name"
        header="Nome"
        sortable
        style={{ width: '25%' }}
        pt={headerCellStyle}
      />
      <Column
        header="Telefone Atual"
        body={phoneBodyTemplate}
        style={{ width: '12%' }}
        pt={headerCellStyle}
      />
      <Column
        header="Status"
        body={statusBodyTemplate}
        sortable
        style={{ width: '10%' }}
        pt={headerCellStyle}
      />
      <Column
        header="Motivo da Pendência"
        body={reasonBodyTemplate}
        sortable
        style={{ width: '18%' }}
        pt={headerCellStyle}
      />
      <Column
        header="Ação"
        body={actionBodyTemplate}
        style={{ width: '10%' }}
        pt={headerCellStyle}
      />
    </Table>
  );
}
