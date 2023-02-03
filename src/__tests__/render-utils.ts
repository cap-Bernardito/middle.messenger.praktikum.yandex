import { renderDOM } from "shared/core";

import "app/registerComponents";

type RenderBlockParams<T extends Record<string, any> = any> = {
  Block: BlockConstructable<T>;
  props: T;
};

export function renderBlock<T extends Record<string, any> = any>({ Block, props }: RenderBlockParams<T>) {
  document.body.innerHTML = '<div id="root"></div>';

  renderDOM(new Block(props as T));
}
