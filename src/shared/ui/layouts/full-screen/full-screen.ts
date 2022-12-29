import { Block } from "shared/core";

import source from "./full-screen.hbs";

import "./full-screen.scss";

export class LayoutFullScreen extends Block {
  static cName = "LayoutFullScreen";

  render() {
    return source;
  }
}
