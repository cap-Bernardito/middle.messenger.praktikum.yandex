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
