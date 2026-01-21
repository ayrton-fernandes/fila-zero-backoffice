import { gql } from '@apollo/client';

export const GET_UPLOADS = gql`
  query GetUploads {
    uploads {
      id
      batchName
      fileName
      fileSize
      uploadDate
      uploadedBy
      totalRecords
      processedRecords
      status
      errorMessage
      created_at
      updated_at
    }
  }
`;

export const GET_UPLOAD_BY_ID = gql`
  query GetUploadById($id: ID!) {
    upload(id: $id) {
      id
      batchName
      fileName
      fileSize
      uploadDate
      uploadedBy
      totalRecords
      processedRecords
      status
      errorMessage
      created_at
      updated_at
    }
  }
`;

export const CREATE_UPLOAD = gql`
  mutation CreateUpload($input: CreateUploadInput!) {
    createUpload(input: $input) {
      id
      batchName
      fileName
      fileSize
      uploadDate
      uploadedBy
      totalRecords
      processedRecords
      status
      created_at
    }
  }
`;
