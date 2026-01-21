import { gql } from '@apollo/client';

export const GET_DASHBOARD_DATA = gql`
  query GetDashboardData($batchId: String) {
    dashboard(batchId: $batchId) {
      whatsAppStats {
        sent
        limit
        status
        resetInfo
      }
      stats {
        totalProcessed
        totalProcessedPeriod
        yesCount
        yesPercentage
        noCount
        noPercentage
        notMeCount
        notMePercentage
        pendingCount
      }
      recentUploads {
        id
        batchNumber
        date
        registryCount
        userName
      }
      statusDistribution {
        label
        count
        percentage
        color
      }
    }
  }
`;
