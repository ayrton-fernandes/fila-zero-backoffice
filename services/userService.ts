import { apolloClient } from '@/lib/apolloClient';
import {
  GET_USERS,
  GET_USER_BY_ID,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from './graphql/userQueries';
import { User, CreateUserInput, UpdateUserInput } from '@/domain/entities/User';

export const getUsers = async (): Promise<User[]> => {
  try {
    const { data } = await apolloClient.query<{ users: User[] }>({
      query: GET_USERS,
      fetchPolicy: 'network-only',
    });
    return data!.users;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const getUserById = async (id: string): Promise<User> => {
  try {
    const { data } = await apolloClient.query<{ user: User }>({
      query: GET_USER_BY_ID,
      variables: { id },
      fetchPolicy: 'network-only',
    });
    return data!.user;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
};

export const createUser = async (input: CreateUserInput): Promise<User> => {
  try {
    const { data } = await apolloClient.mutate<{ createUser: User }>({
      mutation: CREATE_USER,
      variables: { input },
    });
    return data!.createUser;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

export const updateUser = async (id: string, input: UpdateUserInput): Promise<User> => {
  try {
    const { data } = await apolloClient.mutate<{ updateUser: User }>({
      mutation: UPDATE_USER,
      variables: { id, ...input },
    });
    return data!.updateUser;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    const { data } = await apolloClient.mutate<{ deleteUser: boolean }>({
      mutation: DELETE_USER,
      variables: { id },
    });
    return data!.deleteUser;
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
};
