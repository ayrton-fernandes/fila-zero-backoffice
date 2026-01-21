'use client';

import React from 'react';
import { Table, Tag } from '@uigovpe/components';
import { Patient } from '../../../domain/entities/Patient';
import { Column } from 'primereact/column';
import { PatientActionMenu } from './PatientActionMenu';

interface PatientsTableProps {
  patients: Patient[];
  totalElements?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number, pageSize?: number) => void;
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onReschedule: (patient: Patient) => void;
  onExclude: (patient: Patient) => void;
}

const statusLabels: Record<string, string> = {
  sim: 'SIM',
  nao: 'NÃO',
  nao_sou_eu: 'NÃO SOU EU',
  pendente: 'PENDENTE',
  exclusao_indicada: 'EXCLUSÃO INDICADA',
  aguardando: 'Aguardando',
};

const statusSeverities: Record<string, 'success' | 'danger' | 'warning' | 'info'> = {
  sim: 'success',
  nao: 'danger',
  nao_sou_eu: 'warning',
  pendente: 'info',
  exclusao_indicada: 'danger',
  aguardando: 'info',
};

const appointmentLabels: Record<string, string> = {
  aguardando: 'Aguardando',
  agendado: 'Agendado',
  remarcado: 'Remarcado',
  remarcado_confirmado: 'Remarcado Confirmado',
  ja_agendado_cmce: 'Já agendado CMCE',
};

const appointmentSeverities: Record<string, 'success' | 'danger' | 'warning' | 'info'> = {
  aguardando: 'info',
  agendado: 'success',
  remarcado: 'warning',
  remarcado_confirmado: 'success',
  ja_agendado_cmce: 'success',
};

const headerCellStyle = {
  headerCell: {
    className: 'font-bold text-sm',
  },
};

export function PatientsTable({
  patients,
  totalElements = 0,
  currentPage = 0,
  pageSize = 10,
  onPageChange,
  onView,
  onEdit,
  onReschedule,
  onExclude,
}: PatientsTableProps) {
  const statusBodyTemplate = (rowData: Patient) => {
    const label = statusLabels[rowData.status] || rowData.status;
    const severity = statusSeverities[rowData.status] || 'info';
    return <Tag severity={severity} value={label} />;
  };

  const appointmentBodyTemplate = (rowData: Patient) => {
    const label = appointmentLabels[rowData.appointmentStatus] || rowData.appointmentStatus;
    const severity = appointmentSeverities[rowData.appointmentStatus] || 'info';
    return <Tag severity={severity} value={label} />;
  };

  const dateBodyTemplate = (rowData: Patient) => {
    return new Date(rowData.date).toLocaleDateString('pt-BR');
  };

  const actionBodyTemplate = (rowData: Patient) => {
    return (
      <PatientActionMenu
        onView={() => onView(rowData)}
        onEdit={() => onEdit(rowData)}
        onReschedule={() => onReschedule(rowData)}
        onExclude={() => onExclude(rowData)}
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
      value={patients}
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
      <Column
        field="solicitationNumber"
        header="Nº Solicitação CMCE"
        sortable
        style={{ width: '10%' }}
        pt={headerCellStyle}
      />
      <Column field="name" header="Nome" sortable style={{ width: '15%' }} pt={headerCellStyle} />
      <Column field="cpf" header="CPF" sortable style={{ width: '10%' }} pt={headerCellStyle} />
      <Column
        field="phone"
        header="Telefone"
        sortable
        style={{ width: '10%' }}
        pt={headerCellStyle}
      />
      <Column
        field="procedure"
        header="Procedimento"
        sortable
        style={{ width: '12%' }}
        pt={headerCellStyle}
      />
      <Column
        header="Data"
        body={dateBodyTemplate}
        sortable
        style={{ width: '8%' }}
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
        header="Agendamento"
        body={appointmentBodyTemplate}
        sortable
        style={{ width: '12%' }}
        pt={headerCellStyle}
      />
      <Column
        field="batchName"
        header="Lote"
        sortable
        style={{ width: '8%' }}
        pt={headerCellStyle}
      />
      <Column
        header="Ações"
        body={actionBodyTemplate}
        style={{ width: '5%' }}
        pt={headerCellStyle}
      />
    </Table>
  );
}
