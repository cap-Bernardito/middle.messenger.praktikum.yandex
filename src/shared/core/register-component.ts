import Handlebars, { HelperOptions } from "handlebars";

import { Block } from ".";

type BlockConstructable<Props = any> = {
  cName: string;
  new (props: Props): Block;
};

export function registerComponent<Props>(Component: BlockConstructable<Props>) {
  Handlebars.registerHelper(
    Component.cName,
    function (this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
      if (!data.root.children) {
        data.root.children = {};
      }

      if (!data.root.refs) {
        data.root.refs = {};
      }

      const { children, refs } = data.root;

      (Object.keys(hash) as any).forEach((key: keyof Props) => {
        if (this[key] && typeof this[key] === "string") {
          if (typeof hash[key] === "undefined") {
            throw new Error(
              `Property "${String(key)}" in "${
                Component.cName
              }" component is undefined. Available values: ${Object.keys(this as Record<string, any>).join(", ")}`
            );
          }

          if (typeof hash[key] === "function") {
            throw new Error(
              `Property "${String(key)}" in "${Component.cName}" component must be a string. Function received.`
            );
          }

          hash[key] = hash[key].replace(new RegExp(`{{${String(key)}}}`, "i"), this[key]);
        }
      });

      const component = new Component(hash);

      children[component.id] = component;

      if (ref) {
        refs[ref] = component;
      }

      const contents = fn ? fn(this) : "";

      return `<div data-id="id-${component.id}">${contents}</div>`;
    }
  );
}
