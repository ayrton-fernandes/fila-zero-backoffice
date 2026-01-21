import { AuthResponse } from "@/domain/types/AuthResponse";
import Response from "@/domain/types/Response";
import { IAuthService, LoginParams } from "@/domain/interfaces/IAuthService";
import { BaseService } from "./base/BaseService";

class AuthService extends BaseService implements IAuthService {
  baseUrl = "/auth";

  async login(params: LoginParams): Promise<Response<AuthResponse>> {
    // Mock temporário
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            token: "mock-jwt-token-123456789",
            user: {
              id: "1",
              name: "Usuário Teste",
              email: params.email || "teste@email.com",
            },
          },
        });
      }, 1000);
    });

    // Código para quando API estiver ok:
    // return this.execute<AuthResponse, LoginParams>(
    //   HttpMethod.POST,
    //   "/login",
    //   params
    // );
  }
}

export const authService = new AuthService();
