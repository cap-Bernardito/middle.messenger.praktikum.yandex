import { Block } from "./block";

export function renderDOM(block: Block, selector = "#root") {
  const root = document.querySelector(selector);

  if (!root) {
    throw new Error(`Root element with ${selector} selector is not available`);
  }

  root.innerHTML = "";
  root.appendChild(block.getContent());
}
