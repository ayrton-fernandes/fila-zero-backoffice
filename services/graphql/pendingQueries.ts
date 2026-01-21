import { gql } from '@apollo/client';

export const GET_PENDINGS = gql`
  query GetPendings {
    pendings {
      id
      cpf
      name
      currentPhone
      correctedPhone
      pendingReason
      contactOrigin
      uploadId
      batchName
      status
      created_at
      updated_at
    }
  }
`;

export const GET_PENDING_BY_ID = gql`
  query GetPendingById($id: ID!) {
    pending(id: $id) {
      id
      cpf
      name
      currentPhone
      correctedPhone
      pendingReason
      contactOrigin
      uploadId
      batchName
      status
      created_at
      updated_at
    }
  }
`;

export const GET_PENDING_COUNT = gql`
  query GetPendingCount {
    pendingCount
  }
`;

export const UPDATE_PENDING = gql`
  mutation UpdatePending($id: ID!, $input: UpdatePendingInput!) {
    updatePending(id: $id, input: $input) {
      id
      cpf
      name
      currentPhone
      correctedPhone
      pendingReason
      contactOrigin
      status
      created_at
      updated_at
    }
  }
`;

export const PROCESS_SELECTED_PENDINGS = gql`
  mutation ProcessSelectedPendings($input: ProcessPendingsInput!) {
    processSelectedPendings(input: $input)
  }
`;
