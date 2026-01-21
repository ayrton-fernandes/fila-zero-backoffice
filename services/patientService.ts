import { apolloClient } from '@/lib/apolloClient';
import {
  GET_PATIENTS,
  GET_PATIENT_BY_ID,
  UPDATE_PATIENT,
  RESCHEDULE_PATIENT,
  EXCLUDE_PATIENT,
} from './graphql/patientQueries';
import {
  Patient,
  UpdatePatientInput,
  ReschedulePatientInput,
  ExcludePatientInput,
} from '../domain/entities/Patient';

export const patientService = {
  async getPatients(): Promise<Patient[]> {
    const { data } = await apolloClient.query<{ patients: Patient[] }>({
      query: GET_PATIENTS,
      fetchPolicy: 'network-only',
    });
    return data!.patients;
  },

  async getPatientById(id: string): Promise<Patient> {
    const { data } = await apolloClient.query<{ patient: Patient }>({
      query: GET_PATIENT_BY_ID,
      variables: { id },
      fetchPolicy: 'network-only',
    });
    return data!.patient;
  },

  async updatePatient(id: string, input: UpdatePatientInput): Promise<Patient> {
    const { data } = await apolloClient.mutate<{ updatePatient: Patient }>({
      mutation: UPDATE_PATIENT,
      variables: { id, input },
    });
    return data!.updatePatient;
  },

  async reschedulePatient(id: string, input: ReschedulePatientInput): Promise<Patient> {
    const { data } = await apolloClient.mutate<{ reschedulePatient: Patient }>({
      mutation: RESCHEDULE_PATIENT,
      variables: { id, input },
    });
    return data!.reschedulePatient;
  },

  async excludePatient(id: string, input: ExcludePatientInput): Promise<Patient> {
    const { data } = await apolloClient.mutate<{ excludePatient: Patient }>({
      mutation: EXCLUDE_PATIENT,
      variables: { id, input },
    });
    return data!.excludePatient;
  },
};
