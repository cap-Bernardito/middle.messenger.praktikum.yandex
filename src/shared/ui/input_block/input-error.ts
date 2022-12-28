import { Block, registerComponent } from "shared/core";

import source from "./input-error.hbs";

export type TInputErrorProps = {
  text?: string;
};

export class InputError extends Block<TInputErrorProps> {
  static cName = "InputError";

  constructor({ ...props }: TInputErrorProps) {
    super({ ...props });
  }

  render() {
    return source;
  }
}

registerComponent(InputError);
