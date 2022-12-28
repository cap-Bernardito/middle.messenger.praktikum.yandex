import { Block, registerComponent } from "shared/core";

import source from "./icon.hbs";

// Иконки отсюда - https://materialdesignicons.com/

type TIconProps = {
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

registerComponent(Icon);
