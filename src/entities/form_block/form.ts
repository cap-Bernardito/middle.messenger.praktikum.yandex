import { Block, registerComponent } from "shared/core";

import source from "./form.hbs";

import "./form.scss";

export type TFormProps = TPropsWithRef<{
  fields: Block[];
  button: Block;
  title?: string;
  meta?: string;
  className?: string;
  decorated?: boolean;
}>;

export class Form extends Block<TFormProps> {
  static cName = "Form";

  constructor({ decorated = true, ...props }: TFormProps) {
    super({ ...props, decorated });
  }

  render() {
    return source;
  }
}

registerComponent(Form);
