export interface User {
  id: string;
  name: string;
  email: string;
  created_at?: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
}
