import Handlebars from "handlebars";

export const compileHbs = (source: string, context: any, options?: CompileOptions) => {
  const template = Handlebars.compile(source, options);

  return template(context);
};
