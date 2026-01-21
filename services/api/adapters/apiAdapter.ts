import Cookies from "js-cookie";
import Response from "@/domain/types/Response";

interface ApiAdapterOptions {
  setAuthCookie?: boolean;
  errorMessage?: string;
}

export async function apiRequestAdapter<T>(
  requestFn: () => Promise<Response<T>>,
  defaultErrorMessage: string = "Erro na requisição",
  options: ApiAdapterOptions = {}
): Promise<T> {
  try {
    const response = await requestFn();

    if (!response.success) {
      throw new Error(response.message || defaultErrorMessage);
    }

    // Se for resposta de login, salvar token no cookie
    if (options.setAuthCookie && response.data && typeof response.data === 'object' && "token" in response.data) {
      const authData = response.data as { token: string };
      Cookies.set("token", authData.token, {
        expires: 7,
        sameSite: "strict",
      });
    }

    return response.data;
  } catch (error: unknown) {
    let errorMsg = defaultErrorMessage;
    
    if (error instanceof Error) {
      errorMsg = error.message;
    } else if (typeof error === 'object' && error !== null && 'response' in error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      errorMsg = axiosError.response?.data?.message || defaultErrorMessage;
    }
    
    throw new Error(errorMsg);
  }
}
