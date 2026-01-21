'use client';

import React, { useState, useRef, useMemo } from 'react';
import { PageInfo } from '@/components/layout/pageInfo';
import { Card, Dropdown } from '@uigovpe/components';
import { DataTableHeaderSearch } from '@/components/layout/dataTableHeaderSearch';
import { PatientsTable } from '../../../components/features/patients/PatientsTable';
import { PatientModal } from '../../../components/features/patients/PatientModal';
import { RescheduleModal } from '../../../components/features/patients/RescheduleModal';
import { ExcludeModal } from '../../../components/features/patients/ExcludeModal';
import { usePatientsList } from '../../../hooks/usePatientsList';
import {
  Patient,
  UpdatePatientInput,
  ReschedulePatientInput,
  ExcludePatientInput,
} from '../../../domain/entities/Patient';
import { Loading } from '@/components/common/loading/loading';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';

const statusOptions = [
  { label: 'Todos', value: 'all' },
  { label: 'SIM', value: 'sim' },
  { label: 'NÃO', value: 'nao' },
  { label: 'NÃO SOU EU', value: 'nao_sou_eu' },
  { label: 'PENDENTE', value: 'pendente' },
  { label: 'EXCLUSÃO INDICADA', value: 'exclusao_indicada' },
];

const appointmentOptions = [
  { label: 'Todos agendamentos', value: 'all' },
  { label: 'Aguardando', value: 'aguardando' },
  { label: 'Agendado', value: 'agendado' },
  { label: 'Remarcado', value: 'remarcado' },
  { label: 'Remarcado Confirmado', value: 'remarcado_confirmado' },
  { label: 'Já agendado CMCE', value: 'ja_agendado_cmce' },
];

const batchOptions = [
  { label: 'Todos os lotes', value: 'all' },
  { label: 'Lote 001', value: 'Lote 001' },
  { label: 'Lote 002', value: 'Lote 002' },
  { label: 'Lote 003', value: 'Lote 003' },
];

export default function PacientesPage() {
  const {
    patients,
    loading,
    error,
    updatePatient,
    reschedulePatient,
    excludePatient,
  } = usePatientsList();

  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [appointmentFilter, setAppointmentFilter] = useState('all');
  const [batchFilter, setBatchFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [patientModal, setPatientModal] = useState<{
    visible: boolean;
    patient: Patient | null;
    mode: 'view' | 'edit';
  }>({ visible: false, patient: null, mode: 'view' });

  const [rescheduleModal, setRescheduleModal] = useState<{
    visible: boolean;
    patient: Patient | null;
  }>({ visible: false, patient: null });

  const [excludeModal, setExcludeModal] = useState<{
    visible: boolean;
    patient: Patient | null;
  }>({ visible: false, patient: null });

  const toast = useRef<Toast>(null);

  const handleSearch = (value: unknown) => {
    const searchTerm = (value ?? '') as string;
    setActiveSearchTerm(searchTerm);
    setCurrentPage(0);
  };

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        !activeSearchTerm ||
        patient.name.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
        patient.cpf.includes(activeSearchTerm) ||
        patient.phone.includes(activeSearchTerm) ||
        patient.solicitationNumber.toLowerCase().includes(activeSearchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
      const matchesAppointment =
        appointmentFilter === 'all' || patient.appointmentStatus === appointmentFilter;
      const matchesBatch = batchFilter === 'all' || patient.batchName === batchFilter;

      return matchesSearch && matchesStatus && matchesAppointment && matchesBatch;
    });
  }, [patients, activeSearchTerm, statusFilter, appointmentFilter, batchFilter]);

  const handleView = (patient: Patient) => {
    setPatientModal({ visible: true, patient, mode: 'view' });
  };

  const handleEdit = (patient: Patient) => {
    setPatientModal({ visible: true, patient, mode: 'edit' });
  };

  const handleReschedule = (patient: Patient) => {
    setRescheduleModal({ visible: true, patient });
  };

  const handleExclude = (patient: Patient) => {
    setExcludeModal({ visible: true, patient });
  };

  const handleSavePatient = async (id: string, input: UpdatePatientInput) => {
    try {
      await updatePatient(id, input);
      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Paciente atualizado com sucesso',
        life: 3000,
      });
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: error instanceof Error ? error.message : 'Erro ao atualizar paciente',
        life: 3000,
      });
      throw error;
    }
  };

  const handleSaveReschedule = async (id: string, input: ReschedulePatientInput) => {
    try {
      await reschedulePatient(id, input);
      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Paciente remarcado com sucesso',
        life: 3000,
      });
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: error instanceof Error ? error.message : 'Erro ao remarcar paciente',
        life: 3000,
      });
      throw error;
    }
  };

  const handleSaveExclude = async (id: string, input: ExcludePatientInput) => {
    try {
      await excludePatient(id, input);
      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Exclusão indicada com sucesso',
        life: 3000,
      });
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: error instanceof Error ? error.message : 'Erro ao indicar exclusão',
        life: 3000,
      });
      throw error;
    }
  };

  const handlePageChange = (page: number, newPageSize?: number) => {
    setCurrentPage(page);
    if (newPageSize) {
      setPageSize(newPageSize);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        <PageInfo
          title="Lista de Pacientes"
          descriptions={['Gerencie e acompanhe o status dos pacientes processados']}
        />
        <Message severity="error" text={error} />
      </div>
    );
  }

  return (
    <div className="px-2 py-3.5 flex flex-col gap-4">
      <Toast ref={toast} />

      <PageInfo
        title="Lista de Pacientes"
        descriptions={['Gerencie e acompanhe o status dos pacientes processados']}
      />

      <section>
        <Card>
          <DataTableHeaderSearch
            searchValue={searchValue}
            onSearch={handleSearch}
            handleSetSearchValue={handleSearchValueChange}
            searchLabel="Buscar paciente"
            searchPlaceholder="Nome, CPF, telefone ou Nº"
            searchSupportText=''
            showAddButton={false}
            rightContent={
              <div className="flex gap-3">
                <div className="min-w-[200px]">
                  <label className="block mb-1 text-sm font-bold">Status</label>
                  <Dropdown
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.value)}
                    options={statusOptions}
                    placeholder="Todos"
                    className="w-full"
                  />
                </div>

                <div className="min-w-[200px]">
                  <label className="block mb-1 text-sm font-bold">Agendamento</label>
                  <Dropdown
                    value={appointmentFilter}
                    onChange={(e) => setAppointmentFilter(e.value)}
                    options={appointmentOptions}
                    placeholder="Todos..."
                    className="w-full"
                  />
                </div>

                <div className="min-w-[180px]">
                  <label className="block mb-1 text-sm font-bold">Lote</label>
                  <Dropdown
                    value={batchFilter}
                    onChange={(e) => setBatchFilter(e.value)}
                    options={batchOptions}
                    placeholder="Todos os lotes"
                    className="w-full"
                  />
                </div>
              </div>
            }
          />
        </Card>
      </section>

      <section>
        <Card>
          <div className="mb-4">
            <strong>{filteredPatients.length} pacientes encontrados</strong>
          </div>

          <PatientsTable
            patients={filteredPatients}
            totalElements={filteredPatients.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onView={handleView}
            onEdit={handleEdit}
            onReschedule={handleReschedule}
            onExclude={handleExclude}
          />
        </Card>
      </section>

      <PatientModal
        visible={patientModal.visible}
        patient={patientModal.patient}
        mode={patientModal.mode}
        onHide={() => setPatientModal({ visible: false, patient: null, mode: 'view' })}
        onSave={handleSavePatient}
      />

      <RescheduleModal
        visible={rescheduleModal.visible}
        patient={rescheduleModal.patient}
        onHide={() => setRescheduleModal({ visible: false, patient: null })}
        onSave={handleSaveReschedule}
      />

      <ExcludeModal
        visible={excludeModal.visible}
        patient={excludeModal.patient}
        onHide={() => setExcludeModal({ visible: false, patient: null })}
        onSave={handleSaveExclude}
      />
    </div>
  );

}
