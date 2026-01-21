export type PatientStatus = 'sim' | 'nao' | 'nao_sou_eu' | 'pendente' | 'exclusao_indicada' | 'aguardando';

export type AppointmentStatus =
  | 'aguardando'
  | 'agendado'
  | 'remarcado'
  | 'remarcado_confirmado'
  | 'ja_agendado_cmce';

export interface Patient {
  id: string;
  solicitationNumber: string;
  name: string;
  cpf: string;
  phone: string;
  procedure: string;
  date: string;
  status: PatientStatus;
  appointmentStatus: AppointmentStatus;
  batchName: string;
  uploadId?: string;
  excludeReason?: string;
  created_at: string;
  updated_at?: string;
}

export interface UpdatePatientInput {
  name?: string;
  cpf?: string;
  phone?: string;
  procedure?: string;
  date?: string;
  status?: PatientStatus;
  appointmentStatus?: AppointmentStatus;
  batchName?: string;
}

export interface ReschedulePatientInput {
  newDate: string;
}

export interface ExcludePatientInput {
  reason: string;
}
