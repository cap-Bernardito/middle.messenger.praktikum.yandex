import { Block } from "shared/core";

import source from "./button.hbs";

import "./button.scss";

export type TButtonProps = TPropsWithEvents<{
  value: string;
  title: string;
  htmlType?: "submit" | "reset" | "button";
  className?: string;
  onClick?: (event: Event) => void;
}>;

export class Button extends Block<TButtonProps> {
  static cName = "Button";

  constructor({ htmlType = "submit", onClick, ...props }: TButtonProps) {
    super({
      ...props,
      htmlType,
      events: {
        click: onClick,
      },
    });
  }

  componentDidUpdate() {
    // TODO: разобраться с этим (страница чата, кнопка меню)
    return true;
  }

  render() {
    return source;
  }
}
