import { Block, registerComponent } from "shared/core";

import source from "./500.hbs";

export class Page_500 extends Block {
  static cName = "Page_500";

  render() {
    return source;
  }
}

registerComponent(Page_500);
