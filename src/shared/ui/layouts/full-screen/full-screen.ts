import { Block } from "shared/core";

import source from "./full-screen.hbs";

import "./full-screen.scss";

export class LayoutFullScreen extends Block {
  static cName = "LayoutFullScreen";

  constructor({ ...props }) {
    super(props);
  }

  render() {
    return source;
  }
}
