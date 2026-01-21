'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from '@uigovpe/components';
import { InputText, Button, Dropdown } from '@uigovpe/components';
import { Pending, UpdatePendingInput } from '../../../domain/entities/Pending';

interface CorrectPhoneModalProps {
  visible: boolean;
  pending: Pending | null;
  onHide: () => void;
  onSave: (id: string, input: UpdatePendingInput) => Promise<void>;
}

const contactOriginOptions = [
  { label: 'Contato do Paciente', value: 'patient' },
  { label: 'Contato de Familiar', value: 'family' },
  { label: 'Contato de Responsável', value: 'guardian' },
  { label: 'Contato Alternativo', value: 'alternative' },
];

export function CorrectPhoneModal({
  visible,
  pending,
  onHide,
  onSave,
}: CorrectPhoneModalProps) {
  const [correctedPhone, setCorrectedPhone] = useState('');
  const [contactOrigin, setContactOrigin] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && pending) {
      setCorrectedPhone(pending.correctedPhone || '');
      setContactOrigin(pending.contactOrigin || '');
    }
  }, [visible, pending]);

  const isPhoneValid = (phone: string): boolean => {
    // Remove caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    // Verifica se tem 10 ou 11 dígitos (com DDD)
    return cleanPhone.length === 10 || cleanPhone.length === 11;
  };

  const isFormValid = (): boolean => {
    return correctedPhone.trim() !== '' && isPhoneValid(correctedPhone) && contactOrigin !== '';
  };

  const handleSave = async () => {
    if (!pending || !isFormValid()) return;

    try {
      setLoading(true);
      await onSave(pending.id, {
        correctedPhone,
        contactOrigin,
      });
      handleClose();
    } catch (error) {
      console.error('Error saving correction:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCorrectedPhone('');
    setContactOrigin('');
    setLoading(false);
    onHide();
  };

  const formatPhoneInput = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');

    // Aplica máscara (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value);
    setCorrectedPhone(formatted);
  };

  const footer = (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
      <Button
        label="Cancelar"
        outlined
        onClick={handleClose}
        disabled={loading}
      />
      <Button
        label="Salvar Correção"
        onClick={handleSave}
        disabled={!isFormValid() || loading}
        loading={loading}
      />
    </div>
  );

  return (
    <Dialog
      header="Corrigir Contato"
      visible={visible}
      onHide={handleClose}
      footer={footer}
      style={{ width: '500px' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label
            htmlFor="cpf"
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
          >
            CPF
          </label>
          <InputText
            id="cpf"
            value={pending?.cpf || ''}
            disabled
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label
            htmlFor="name"
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
          >
            Nome
          </label>
          <InputText
            id="name"
            value={pending?.name || ''}
            disabled
            style={{ width: '100%' }}
          />
        </div>

        {pending?.currentPhone && (
          <div>
            <label
              htmlFor="currentPhone"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 500,
                fontSize: '0.875rem',
              }}
            >
              Telefone Atual
            </label>
            <InputText
              id="currentPhone"
              value={pending.currentPhone}
              disabled
              style={{ width: '100%' }}
            />
          </div>
        )}

        <div>
          <label
            htmlFor="correctedPhone"
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
          >
            Novo Telefone *
          </label>
          <InputText
            id="correctedPhone"
            value={correctedPhone}
            onChange={handlePhoneChange}
            placeholder="(00) 00000-0000"
            style={{ width: '100%' }}
            maxLength={15}
          />
        </div>

        <div>
          <label
            htmlFor="contactOrigin"
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
          >
            Origem do Contato *
          </label>
          <Dropdown
            id="contactOrigin"
            value={contactOrigin}
            onChange={(e) => setContactOrigin(e.value)}
            options={contactOriginOptions}
            placeholder="Selecione a origem"
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </Dialog>
  );
}
