import { Block } from "shared/core";

export class LayoutFullScreenToolbar extends Block {
  static cName = "LayoutFullScreenToolbar";

  render() {
    return `<div class="layout-full-screen__toolbar" data-layout-body></div>`;
  }
}
