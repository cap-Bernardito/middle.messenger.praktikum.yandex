import { isArrayOrObject, isPlainObject } from "./utils";

const enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

type TOptions = {
  method: METHODS;
  data?: Record<string, unknown>;
  body?: Document | XMLHttpRequestBodyInit | null;
  headers?: Record<string, string>;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
  withCredentials?: boolean;
};

export type TResponse<T> = {
  readonly status: number;
  readonly statusText: string;
  readonly responseType: XMLHttpRequestResponseType;
  readonly response: T;
};

export type TOptionsGet = Omit<TOptions, "method" | "body">;
export type TOptionsNotGet = Omit<TOptions, "method">;
type TRequest = <T>(url: string, options: TOptions) => Promise<TResponse<T>>;
type TMethod<O> = <T>(url: string, options?: O) => Promise<TResponse<T>>;

export class HTTPTransport {
  get: TMethod<TOptionsGet> = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  post: TMethod<TOptionsNotGet> = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put: TMethod<TOptionsNotGet> = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete: TMethod<TOptionsNotGet> = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  private request: TRequest = (url, options) => {
    const { headers = {}, method, data, body, withCredentials, responseType = "json", timeout = 5000 } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      let query = url;

      if (isGet && data) {
        query = url + queryStringify(data);
      }

      xhr.open(method, query);
      xhr.timeout = timeout;
      xhr.responseType = responseType;

      if (withCredentials) {
        xhr.withCredentials = true;
      }

      for (const [name, value] of Object.entries(headers)) {
        xhr.setRequestHeader(name, value);
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (!isGet && data) {
        xhr.send(JSON.stringify(data));
      } else if (isGet || !body) {
        xhr.send();
      } else {
        xhr.send(body);
      }
    });
  };
}

const getPairs = (objLike: PlainArrayOrObject, path = ""): string[] => {
  return Object.entries(objLike).map(([key, value]) => {
    const deepPath = path ? `${path}[${key}]` : key;

    if (isArrayOrObject(value)) {
      return getPairs(value, deepPath).join("&");
    }

    return `${deepPath}=${encodeURIComponent(String(value))}`;
  });
};

export function queryStringify(data: PlainObject): string | never {
  if (!isPlainObject(data)) {
    throw new Error("Input must be an object");
  }

  const pairs = getPairs(data);

  return pairs.length ? `?${pairs.join("&")}` : "";
}
