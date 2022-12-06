declare module "*.hbs" {
  const source: string;
  export default source;
}

declare type TRenderContext = { [K: string]: string | boolean };

declare type TRenderProps = {
  context?: TRenderContext;
};

declare type TRender = (source: string, context?: TRenderContext, options?: CompileOptions) => string;

declare type TRenderCreator = <T = TRenderContext>(
  source: string,
  defaultContext?: T,
  options?: CompileOptions
) => (context?: T) => string;
