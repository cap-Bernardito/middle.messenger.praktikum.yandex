declare global {
  export module "*.hbs" {
    const source: string;
    export default source;
  }

  export module "*.svg" {
    const source: string;
    export default source;
  }

  export module "*.jpg" {
    const source: string;
    export default source;
  }

  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type TRenderContext = { [K: string]: string | boolean };

  export type TRenderProps = {
    context?: TRenderContext;
  };

  export type TRender = (source: string, context?: TRenderContext, options?: CompileOptions) => string;

  export type TRenderCreator = <T = TRenderContext>(
    source: string,
    defaultContext?: T,
    options?: CompileOptions
  ) => (context?: T) => string;
}

export {};
