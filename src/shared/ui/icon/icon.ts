import { Block } from "shared/core";

import source from "./icon.hbs";

// Иконки отсюда - https://materialdesignicons.com/

export type TIconProps = {
  value: string;
  className?: string;
};

export class Icon extends Block<TIconProps> {
  static cName = "Icon";

  constructor({ ...props }: TIconProps) {
    super({
      ...props,
    });
  }

  render() {
    return source;
  }
}
