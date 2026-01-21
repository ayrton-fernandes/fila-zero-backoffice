import { apolloClient } from '@/lib/apolloClient';
import { GET_UPLOADS, GET_UPLOAD_BY_ID, CREATE_UPLOAD } from './graphql/uploadQueries';
import { Upload, CreateUploadInput } from '@/domain/entities/Upload';

export const getUploads = async (): Promise<Upload[]> => {
  const { data } = await apolloClient.query<{ uploads: Upload[] }>({
    query: GET_UPLOADS,
    fetchPolicy: 'network-only',
  });

  return data!.uploads;
};

export const getUploadById = async (id: string): Promise<Upload | null> => {
  const { data } = await apolloClient.query<{ upload: Upload | null }>({
    query: GET_UPLOAD_BY_ID,
    variables: { id },
    fetchPolicy: 'network-only',
  });

  return data!.upload;
};

export const createUpload = async (input: CreateUploadInput): Promise<Upload> => {
  const { data } = await apolloClient.mutate<{ createUpload: Upload }>({
    mutation: CREATE_UPLOAD,
    variables: { input },
  });

  return data!.createUpload;
};
