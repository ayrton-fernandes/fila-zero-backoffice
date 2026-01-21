'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, InputText, Button, Dropdown } from '@uigovpe/components';
import { Patient, UpdatePatientInput } from '../../../domain/entities/Patient';

interface PatientModalProps {
  visible: boolean;
  patient: Patient | null;
  mode: 'view' | 'edit';
  onHide: () => void;
  onSave: (id: string, input: UpdatePatientInput) => Promise<void>;
}

const statusOptions = [
  { label: 'SIM', value: 'sim' },
  { label: 'NÃO', value: 'nao' },
  { label: 'NÃO SOU EU', value: 'nao_sou_eu' },
  { label: 'PENDENTE', value: 'pendente' },
  { label: 'EXCLUSÃO INDICADA', value: 'exclusao_indicada' },
  { label: 'Aguardando', value: 'aguardando' },
];

const appointmentOptions = [
  { label: 'Aguardando', value: 'aguardando' },
  { label: 'Agendado', value: 'agendado' },
  { label: 'Remarcado', value: 'remarcado' },
  { label: 'Remarcado Confirmado', value: 'remarcado_confirmado' },
  { label: 'Já agendado CMCE', value: 'ja_agendado_cmce' },
];

export function PatientModal({ visible, patient, mode, onHide, onSave }: PatientModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    procedure: '',
    date: '',
    status: 'pendente',
    appointmentStatus: 'aguardando',
    batchName: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && patient) {
      setFormData({
        name: patient.name,
        cpf: patient.cpf,
        phone: patient.phone,
        procedure: patient.procedure,
        date: patient.date,
        status: patient.status,
        appointmentStatus: patient.appointmentStatus,
        batchName: patient.batchName,
      });
    }
  }, [visible, patient]);

  const handleSave = async () => {
    if (!patient) return;

    try {
      setLoading(true);
      await onSave(patient.id, formData);
      handleClose();
    } catch (error) {
      console.error('Error saving patient:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      cpf: '',
      phone: '',
      procedure: '',
      date: '',
      status: 'pendente',
      appointmentStatus: 'aguardando',
      batchName: '',
    });
    setLoading(false);
    onHide();
  };

  const isViewMode = mode === 'view';

  const footer = isViewMode ? (
    <Button label="Fechar" onClick={handleClose} />
  ) : (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
      <Button label="Cancelar" outlined onClick={handleClose} disabled={loading} />
      <Button label="Salvar" onClick={handleSave} loading={loading} />
    </div>
  );

  return (
    <Dialog
      header={isViewMode ? 'Visualizar Paciente' : 'Editar Paciente'}
      visible={visible}
      onHide={handleClose}
      footer={footer}
      style={{ width: '600px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Nº Solicitação CMCE
          </label>
          <InputText value={patient?.solicitationNumber || ''} disabled style={{ width: '100%' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Nome
          </label>
          <InputText
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isViewMode}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              CPF
            </label>
            <InputText
              value={formData.cpf}
              onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
              disabled={isViewMode}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Telefone
            </label>
            <InputText
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={isViewMode}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Procedimento
          </label>
          <InputText
            value={formData.procedure}
            onChange={(e) => setFormData({ ...formData, procedure: e.target.value })}
            disabled={isViewMode}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Data
            </label>
            <InputText
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              disabled={isViewMode}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Lote
            </label>
            <InputText
              value={formData.batchName}
              onChange={(e) => setFormData({ ...formData, batchName: e.target.value })}
              disabled={isViewMode}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Status
            </label>
            <Dropdown
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.value })}
              options={statusOptions}
              disabled={isViewMode}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Agendamento
            </label>
            <Dropdown
              value={formData.appointmentStatus}
              onChange={(e) => setFormData({ ...formData, appointmentStatus: e.value })}
              options={appointmentOptions}
              disabled={isViewMode}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
