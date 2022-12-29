import { Block } from "shared/core";

import source from "./centered.hbs";

import "./centered.scss";

export type TCenteredProps = {
  className?: "layout-centered_sm" | "layout-centered_md" | "layout-centered_xl";
};

export class LayoutCentered extends Block<TCenteredProps> {
  static cName = "LayoutCentered";

  constructor({ className = "layout-centered_sm" }: TCenteredProps) {
    super({ className });
  }

  render() {
    return source;
  }
}
