import { Block } from "shared/core";
import { TButtonProps, TInputProps } from "shared/ui";

import source from "./form.hbs";

import "./form.scss";

export type TFormProps = TPropsWithEvents<
  TPropsWithRef<{
    fields: Block<TInputProps>[];
    button: Block<TButtonProps>;
    title?: string;
    meta?: string;
    className?: string;
    decorated?: boolean;
    onSubmit?: (event: Event) => void;
  }>
>;

export class Form extends Block<TFormProps> {
  static cName = "Form";

  constructor({ decorated = true, onSubmit, ...props }: TFormProps) {
    super({
      ...props,
      decorated,
      events: {
        submit: onSubmit,
      },
    });
  }

  render() {
    return source;
  }
}
