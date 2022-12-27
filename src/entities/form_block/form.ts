import { Block, registerComponent } from "shared/core";

import source from "./form.hbs";

import "./form.scss";

export type TFormProps = {
  fields: Block[];
  button: Block;
  title?: string;
  meta?: string;
  className?: string;
  decorated?: boolean;
};

export class Form extends Block<TFormProps> {
  static cName = "Form";

  constructor({ fields, button, title = "", meta = "", className = "", decorated = true }: TFormProps) {
    super({ fields, button, title, meta, className, decorated });
  }

  render() {
    return source;
  }
}

registerComponent(Form);
