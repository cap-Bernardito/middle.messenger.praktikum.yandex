import { Block } from "shared/core";

import source from "./button.hbs";

import "./button.scss";

export type TButtonProps = {
  value: string;
  htmlType?: "submit" | "reset" | "button";
  className?: string;
};

export class Button extends Block<TButtonProps> {
  static cName = "Button";

  constructor({ value = "", className = "", htmlType = "submit" }: TButtonProps) {
    super({ value, className, htmlType });
  }

  render() {
    return source;
  }
}
