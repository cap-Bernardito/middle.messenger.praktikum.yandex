import { Block } from "shared/core";

import source from "./404.hbs";

export class Page_404 extends Block {
  static cName = "Page_404";

  render() {
    return source;
  }
}
