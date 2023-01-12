import Handlebars from "handlebars";

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

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

export const registerPartial = (name: string, template: string): void => {
  Handlebars.registerPartial(name, template);
};

export const registerHelper = (name: string, fn: (value: unknown) => boolean): void => {
  Handlebars.registerHelper(name, fn);
};

export const isPlainObject = (value: unknown): value is PlainObject =>
  typeof value === "object" &&
  value !== null &&
  value.constructor === Object &&
  Object.prototype.toString.call(value) === "[object Object]";

export const isArrayOrObject = (value: unknown): value is PlainArrayOrObject => {
  return isPlainObject(value) || Array.isArray(value);
};

export const getObjectKeys = <T extends object>(obj: T) => Object.keys(obj) as Array<keyof T>;
export const getObjectValues = <T extends object>(obj: T) => Object.values(obj) as Array<T[keyof T]>;
export const getObjectEntries = <T extends object>(obj: T): Entries<T> => Object.entries(obj) as any;
