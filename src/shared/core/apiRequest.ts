import { HTTPTransport, TOptionsGet, TOptionsNotGet, TResponse } from "shared/utils/http-transport";

const normalizeResponse = <T>(response: TResponse<T>) => {
  return response.response;
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
    const result = await myFetch.get<T>(`${process.env.API_ENDPOINT}/${path}`, { ...defaultOptions, ...options });

    return normalizeResponse<T>(result);
  },

  post: async <T>(path: string, options?: TOptionsNotGet) => {
    const result = await myFetch.post<T>(`${process.env.API_ENDPOINT}/${path}`, { ...defaultOptions, ...options });

    return normalizeResponse<T>(result);
  },

  put: async <T>(path: string, options?: TOptionsNotGet) => {
    const result = await myFetch.put<T>(`${process.env.API_ENDPOINT}/${path}`, { ...defaultOptions, ...options });

    return normalizeResponse<T>(result);
  },

  delete: async <T>(path: string, options?: TOptionsNotGet) => {
    const result = await myFetch.delete<T>(`${process.env.API_ENDPOINT}/${path}`, { ...defaultOptions, ...options });

    return normalizeResponse<T>(result);
  },
};
