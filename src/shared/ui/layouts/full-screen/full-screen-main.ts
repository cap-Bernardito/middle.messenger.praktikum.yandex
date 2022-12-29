import { Block } from "shared/core";

export class LayoutFullScreenMain extends Block {
  static cName = "LayoutFullScreenMain";

  render() {
    return `<main class="layout-full-screen__primary" data-layout-body></main>`;
  }
}
