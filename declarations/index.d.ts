import { Block } from "shared/core/block";

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

  export type TNullable<T> = T | null;

  export type TKeys<T extends Record<string, unknown>> = keyof T;
  export type TValues<T extends Record<string, unknown>> = T[TKeys<T>];

  export type TEvents = Record<
    Event["type"],
    (((event: Event) => void) | undefined) | (((event: Event) => void) | undefined)[]
  >;
  export type TPropsWithEvents<T extends Record<string, unknown>> = T & {
    events?: TEvents;
  };
  export type TPropsWithRef<T extends Record<string, unknown>> = T & {
    ref?: string;
  };

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
