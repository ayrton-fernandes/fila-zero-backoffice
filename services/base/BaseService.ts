import api from "../api/api";
import Response from "@/domain/types/Response";
import { HttpMethod } from "@/domain/enums/HttpMethod";

export abstract class BaseService {
  protected abstract baseUrl: string;

  protected async execute<T, P = Record<string, unknown>>(
    method: HttpMethod,
    endpoint: string,
    data?: P,
    params?: Record<string, unknown>
  ): Promise<Response<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await api.request<Response<T>>({
        method,
        url,
        data,
        params,
      });

      return response.data;
    } catch (error: unknown) {
      let errorMessage = "Erro na requisição";
      let errorsList: string[] = [];
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as { 
          response?: { 
            data?: { 
              message?: string;
              errors?: string[];
            } 
          } 
        };
        errorMessage = axiosError.response?.data?.message || errorMessage;
        errorsList = axiosError.response?.data?.errors || [];
      }
      
      return {
        success: false,
        data: {} as T,
        message: errorMessage,
        errors: errorsList,
      };
    }
  }
}
