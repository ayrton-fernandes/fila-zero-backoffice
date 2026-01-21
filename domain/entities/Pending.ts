export type PendingReason =
  | 'invalid_phone'
  | 'incomplete_number'
  | 'fake_number'
  | 'empty_field'
  | 'invalid_format'
  | 'not_me';

export type PendingStatus = 'pending' | 'corrected' | 'processed';

export interface Pending {
  id: string;
  cpf: string;
  name: string;
  currentPhone?: string;
  correctedPhone?: string;
  pendingReason: PendingReason;
  contactOrigin?: string;
  uploadId?: string;
  batchName?: string;
  status: PendingStatus;
  created_at: Date;
  updated_at?: Date;
}

export interface UpdatePendingInput {
  correctedPhone: string;
  contactOrigin: string;
}

export interface ProcessPendingsInput {
  pendingIds: string[];
}
