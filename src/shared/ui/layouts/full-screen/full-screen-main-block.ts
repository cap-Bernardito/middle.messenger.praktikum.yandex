import { Block } from "shared/core";

export class LayoutFullScreenMain extends Block {
  static cName = "LayoutFullScreenMain";

  constructor({ ...props }) {
    super(props);
  }

  render() {
    return `<main class="layout-full-screen__primary" data-layout-body></main>`;
  }
}
