import { Block } from "shared/core";

import source from "./button.hbs";

import "./button.scss";

export type TButtonProps = TPropsWithEvents<{
  value: string;
  title: string;
  htmlType?: "submit" | "reset" | "button";
  className?: string;
}>;

export class Button extends Block<TButtonProps> {
  static cName = "Button";

  constructor({ htmlType = "submit", ...props }: TButtonProps) {
    super({ ...props, htmlType });
  }

  render() {
    return source;
  }
}
