'use client';

import React, { useState } from 'react';
import { Dialog, InputText, Button } from '@uigovpe/components';
import { Patient, ReschedulePatientInput } from '../../../domain/entities/Patient';

interface RescheduleModalProps {
  visible: boolean;
  patient: Patient | null;
  onHide: () => void;
  onSave: (id: string, input: ReschedulePatientInput) => Promise<void>;
}

export function RescheduleModal({ visible, patient, onHide, onSave }: RescheduleModalProps) {
  const [newDate, setNewDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!patient || !newDate) return;

    try {
      setLoading(true);
      await onSave(patient.id, { newDate });
      handleClose();
    } catch (error) {
      console.error('Error rescheduling patient:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setNewDate('');
    setLoading(false);
    onHide();
  };

  const footer = (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
      <Button label="Cancelar" outlined onClick={handleClose} disabled={loading} />
      <Button
        label="Confirmar Remarcação"
        onClick={handleSave}
        disabled={!newDate || loading}
        loading={loading}
      />
    </div>
  );

  return (
    <Dialog
      header="Remarcar Atendimento"
      visible={visible}
      onHide={handleClose}
      footer={footer}
      style={{ width: '500px' }}
    >
      <div>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          Informe a nova data de agendamento para o paciente{' '}
          <strong>{patient?.name}</strong>.
        </p>
        <p style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: '#666' }}>
          O status será alterado para "Remarcado" até a nova confirmação.
        </p>

        <div>
          <label
            htmlFor="newDate"
            style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}
          >
            Nova Data de Agendamento
          </label>
          <InputText
            id="newDate"
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </Dialog>
  );
}
