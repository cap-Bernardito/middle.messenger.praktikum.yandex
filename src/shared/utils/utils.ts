import Handlebars from "handlebars";

export * as _ from "./mydash/index";

export const compileHbs: TRender = (source, context, options) => {
  const template = Handlebars.compile(source, options);

  return template(context);
};

export const renderCreator: TRenderCreator = (source, defaultContext, options) => (context) => {
  return compileHbs(
    source,
    {
      ...defaultContext,
      ...(context || {}),
    },
    options
  );
};
