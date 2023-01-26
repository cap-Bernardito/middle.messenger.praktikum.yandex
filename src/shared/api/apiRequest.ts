import { HTTPTransport, TOptionsGet, TOptionsNotGet, TResponse } from "shared/utils/http-transport";

const normalizeResponse = <T>(error: unknown, response?: TResponse<T>) => {
  if (error) {
    console.error(error);

    return { reason: "Что-то пошло не так" };
  }

  return response?.response;
};

const myFetch = new HTTPTransport();

const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const request = {
  get: async <T>(path: string, options?: TOptionsGet) => {
    try {
      const result = await myFetch.get<T>(`${process.env.API_ENDPOINT}/${path}`, { ...defaultOptions, ...options });

      return normalizeResponse<T>(null, result);
    } catch (error) {
      return normalizeResponse<T>(error);
    }
  },

  post: async <T>(path: string, options?: TOptionsNotGet) => {
    try {
      const result = await myFetch.post<T>(`${process.env.API_ENDPOINT}/${path}`, { ...defaultOptions, ...options });

      return normalizeResponse<T>(null, result);
    } catch (error) {
      return normalizeResponse<T>(error);
    }
  },

  put: async <T>(path: string, options?: TOptionsNotGet) => {
    try {
      const result = await myFetch.put<T>(`${process.env.API_ENDPOINT}/${path}`, { ...defaultOptions, ...options });

      return normalizeResponse<T>(null, result);
    } catch (error) {
      return normalizeResponse<T>(error);
    }
  },

  delete: async <T>(path: string, options?: TOptionsNotGet) => {
    try {
      const result = await myFetch.delete<T>(`${process.env.API_ENDPOINT}/${path}`, { ...defaultOptions, ...options });

      return normalizeResponse<T>(null, result);
    } catch (error) {
      return normalizeResponse<T>(error);
    }
  },
};
