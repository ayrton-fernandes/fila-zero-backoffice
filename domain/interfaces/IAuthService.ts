import Response from "../types/Response";
import { AuthResponse } from "../types/AuthResponse";

export interface LoginParams {
  email?: string;
  cpf?: string;
  password: string;
}

export interface IAuthService {
  login(params: LoginParams): Promise<Response<AuthResponse>>;
}
