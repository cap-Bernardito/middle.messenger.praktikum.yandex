import { Block } from "shared/core";

export class LayoutFullScreenAside extends Block {
  static cName = "LayoutFullScreenAside";

  constructor({ ...props }) {
    super(props);
  }

  render() {
    return `
<div class="layout-full-screen__secondary">
  <aside data-layout-body></aside>
</div>
    `;
  }
}
