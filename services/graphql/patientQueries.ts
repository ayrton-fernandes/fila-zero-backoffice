import { gql } from '@apollo/client';

export const GET_PATIENTS = gql`
  query GetPatients {
    patients {
      id
      solicitationNumber
      name
      cpf
      phone
      procedure
      date
      status
      appointmentStatus
      batchName
      uploadId
      excludeReason
      created_at
      updated_at
    }
  }
`;

export const GET_PATIENT_BY_ID = gql`
  query GetPatientById($id: ID!) {
    patient(id: $id) {
      id
      solicitationNumber
      name
      cpf
      phone
      procedure
      date
      status
      appointmentStatus
      batchName
      uploadId
      excludeReason
      created_at
      updated_at
    }
  }
`;

export const UPDATE_PATIENT = gql`
  mutation UpdatePatient($id: ID!, $input: UpdatePatientInput!) {
    updatePatient(id: $id, input: $input) {
      id
      solicitationNumber
      name
      cpf
      phone
      procedure
      date
      status
      appointmentStatus
      batchName
      created_at
      updated_at
    }
  }
`;

export const RESCHEDULE_PATIENT = gql`
  mutation ReschedulePatient($id: ID!, $input: ReschedulePatientInput!) {
    reschedulePatient(id: $id, input: $input) {
      id
      date
      appointmentStatus
      updated_at
    }
  }
`;

export const EXCLUDE_PATIENT = gql`
  mutation ExcludePatient($id: ID!, $input: ExcludePatientInput!) {
    excludePatient(id: $id, input: $input) {
      id
      status
      excludeReason
      updated_at
    }
  }
`;
