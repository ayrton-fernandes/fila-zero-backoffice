import { apolloClient } from '@/lib/apolloClient';
import {
  GET_PENDINGS,
  GET_PENDING_BY_ID,
  GET_PENDING_COUNT,
  UPDATE_PENDING,
  PROCESS_SELECTED_PENDINGS,
} from './graphql/pendingQueries';
import { Pending, UpdatePendingInput, ProcessPendingsInput } from '../domain/entities/Pending';

export const pendingService = {
  async getPendings(): Promise<Pending[]> {
    const { data } = await apolloClient.query<{ pendings: Pending[] }>({
      query: GET_PENDINGS,
      fetchPolicy: 'network-only',
    });
    return data!.pendings;
  },

  async getPendingById(id: string): Promise<Pending> {
    const { data } = await apolloClient.query<{ pending: Pending }>({
      query: GET_PENDING_BY_ID,
      variables: { id },
      fetchPolicy: 'network-only',
    });
    return data!.pending;
  },

  async getPendingCount(): Promise<number> {
    const { data } = await apolloClient.query<{ pendingCount: number }>({
      query: GET_PENDING_COUNT,
      fetchPolicy: 'network-only',
    });
    return data!.pendingCount;
  },

  async updatePending(id: string, input: UpdatePendingInput): Promise<Pending> {
    const { data } = await apolloClient.mutate<{ updatePending: Pending }>({
      mutation: UPDATE_PENDING,
      variables: { id, input },
    });
    return data!.updatePending;
  },

  async processSelectedPendings(input: ProcessPendingsInput): Promise<boolean> {
    const { data } = await apolloClient.mutate<{ processSelectedPendings: boolean }>({
      mutation: PROCESS_SELECTED_PENDINGS,
      variables: { input },
    });
    return data!.processSelectedPendings;
  },
};
