import { Block } from "shared/core";

import source from "./input-label.hbs";

export type TInputLabelProps = {
  label: string;
  for: string;
};

export class InputLabel extends Block<TInputLabelProps> {
  static cName = "InputLabel";

  constructor({ ...props }: TInputLabelProps) {
    super({ ...props });
  }

  render() {
    return source;
  }
}
