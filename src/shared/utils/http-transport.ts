const enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

type TOptions = {
  method: METHODS;
  data?: Record<string, string>;
  body?: Document | XMLHttpRequestBodyInit | null;
  headers?: Record<string, string>;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
  withCredentials?: boolean;
};

type TResponse<T> = {
  readonly status: number;
  readonly statusText: string;
  readonly responseType: XMLHttpRequestResponseType;
  readonly response: T;
};

type TOptionsGet = Omit<TOptions, "method" | "body">;
type TOptionsNotGet = Omit<TOptions, "method" | "data">;
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

      if (isGet || !body) {
        xhr.send();
      } else {
        xhr.send(body);
      }
    });
  };
}

function queryStringify(data: Record<string, string>) {
  const queryParams = Object.entries(data).map((key, value) => `${key}=${value}`);

  return queryParams ? `?${queryParams.join("&")}` : "";
}
