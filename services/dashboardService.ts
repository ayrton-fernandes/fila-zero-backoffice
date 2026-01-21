import { apolloClient } from '@/lib/apolloClient';
import { GET_DASHBOARD_DATA } from './graphql/dashboardQueries';
import { DashboardData } from '@/domain/types/dashboard';

export const getDashboardData = async (batchId?: string): Promise<DashboardData> => {
  try {
    const { data } = await apolloClient.query<{ dashboard: DashboardData }>({
      query: GET_DASHBOARD_DATA,
      variables: { batchId },
      fetchPolicy: 'network-only',
    });

    return data!.dashboard;
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    throw error;
  }
};
