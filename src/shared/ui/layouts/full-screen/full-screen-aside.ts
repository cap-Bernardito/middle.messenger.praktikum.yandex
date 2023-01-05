import { Block } from "shared/core";

export class LayoutFullScreenAside extends Block {
  static cName = "LayoutFullScreenAside";

  render() {
    return `<aside class="layout-full-screen__secondary" data-layout-body></aside>`;
  }
}
