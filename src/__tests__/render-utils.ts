import { initRouter } from "app/services/initRouter";
import { store } from "app/store";

import { renderDOM } from "shared/core";

import "app/registerComponents";

type RenderBlockParams<T extends Record<string, unknown>> = {
  Block: BlockConstructable<T>;
  props: T;
  state?: Partial<AppState>;
};

export function sleep(ms = 200) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function renderBlock<T extends Record<string, unknown>>({
  Block,
  props,
  state = {},
}: RenderBlockParams<T>) {
  store.set({ ...state });

  document.body.innerHTML = '<div id="root"></div>';

  renderDOM(new Block(props as T));

  initRouter(store);

  /**
   * Ждем вызова componentDidMount,
   * метода жизненного цикла компонента,
   * который вызывается через 100мс в Block.getContent
   */
  await sleep();
}

export async function step(name: string, callback: () => void) {
  console.log(`Step: ${name}`);
  await callback();
}
