'use client';

import React, { useState } from 'react';
import { Dialog, Button } from '@uigovpe/components';
import { InputTextarea } from 'primereact/inputtextarea';
import { Patient, ExcludePatientInput } from '../../../domain/entities/Patient';

interface ExcludeModalProps {
  visible: boolean;
  patient: Patient | null;
  onHide: () => void;
  onSave: (id: string, input: ExcludePatientInput) => Promise<void>;
}

export function ExcludeModal({ visible, patient, onHide, onSave }: ExcludeModalProps) {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!patient || !reason.trim()) return;

    try {
      setLoading(true);
      await onSave(patient.id, { reason });
      handleClose();
    } catch (error) {
      console.error('Error excluding patient:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setReason('');
    setLoading(false);
    onHide();
  };

  const footer = (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
      <Button label="Cancelar" outlined onClick={handleClose} disabled={loading} />
      <Button
        label="Confirmar Exclusão"
        severity="danger"
        onClick={handleSave}
        disabled={!reason.trim() || loading}
        loading={loading}
      />
    </div>
  );

  return (
    <Dialog
      header="Indicar Exclusão da Fila"
      visible={visible}
      onHide={handleClose}
      footer={footer}
      style={{ width: '600px' }}
    >
      <div>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          Você está indicando a exclusão do paciente <strong>{patient?.name}</strong> da fila de
          atendimento.
        </p>
        <div
          style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '4px',
            padding: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <p style={{ margin: 0, color: '#856404', fontSize: '0.875rem' }}>
            ⚠️ A exclusão efetiva no CMCE é um processo manual externo. Este registro serve para
            controle e auditoria.
          </p>
        </div>

        <div>
          <label
            htmlFor="reason"
            style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}
          >
            Justificativa (obrigatória)
          </label>
          <InputTextarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Descreva o motivo da exclusão..."
            rows={5}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </Dialog>
  );
}
