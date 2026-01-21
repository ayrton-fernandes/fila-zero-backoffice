export interface DashboardStats {
  totalProcessed: number;
  totalProcessedPeriod: string;
  yesCount: number;
  yesPercentage: number;
  noCount: number;
  noPercentage: number;
  notMeCount: number;
  notMePercentage: number;
  pendingCount: number;
}

export interface WhatsAppMessageStats {
  sent: number;
  limit: number;
  status: 'normal' | 'warning' | 'critical';
  resetInfo: string;
}

export interface Upload {
  id: string;
  batchNumber: string;
  date: string;
  registryCount: number;
  userName: string;
}

export interface StatusDistribution {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface DashboardData {
  whatsAppStats: WhatsAppMessageStats;
  stats: DashboardStats;
  recentUploads: Upload[];
  statusDistribution: StatusDistribution[];
}
