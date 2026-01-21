import { useState, useEffect } from 'react';
import {
  Patient,
  UpdatePatientInput,
  ReschedulePatientInput,
  ExcludePatientInput,
} from '../domain/entities/Patient';
import { patientService } from '../services/patientService';

export const usePatientsList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await patientService.getPatients();
      setPatients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar pacientes');
      console.error('Error loading patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const updatePatient = async (id: string, input: UpdatePatientInput): Promise<Patient> => {
    try {
      const updated = await patientService.updatePatient(id, input);
      setPatients((prev) => prev.map((patient) => (patient.id === id ? updated : patient)));
      return updated;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao atualizar paciente');
    }
  };

  const reschedulePatient = async (
    id: string,
    input: ReschedulePatientInput
  ): Promise<Patient> => {
    try {
      const updated = await patientService.reschedulePatient(id, input);
      setPatients((prev) => prev.map((patient) => (patient.id === id ? updated : patient)));
      return updated;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao remarcar paciente');
    }
  };

  const excludePatient = async (id: string, input: ExcludePatientInput): Promise<Patient> => {
    try {
      const updated = await patientService.excludePatient(id, input);
      setPatients((prev) => prev.map((patient) => (patient.id === id ? updated : patient)));
      return updated;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao excluir paciente');
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  return {
    patients,
    loading,
    error,
    loadPatients,
    updatePatient,
    reschedulePatient,
    excludePatient,
  };
};
