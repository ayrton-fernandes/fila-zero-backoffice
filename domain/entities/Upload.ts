export interface Upload {
  id: string;
  batchName: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  uploadedBy: string;
  totalRecords: number;
  processedRecords: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  errorMessage?: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateUploadInput {
  batchName: string;
  fileName: string;
  fileSize: number;
  uploadedBy: string;
}
