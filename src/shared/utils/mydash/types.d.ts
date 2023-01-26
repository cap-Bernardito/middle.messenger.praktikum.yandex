declare global {
  export type PlainObject<T = unknown> = {
    [key in string]?: T;
  };

  export type PlainArrayOrObject<T = unknown> = PlainObject<T> | T[];
}

export {};
