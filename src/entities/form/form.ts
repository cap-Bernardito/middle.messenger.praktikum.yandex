import { Block } from "shared/core";
import { TButtonProps, TInputProps } from "shared/ui";
import { formProcess } from "shared/utils/form-processing";

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

  constructor({ decorated = true, ref = "formRef", onSubmit, ...props }: TFormProps) {
    super({
      ...props,
      decorated,
      ref,
      events: {
        submit: onSubmit,
      },
    });
  }

  check(event: Event, fields: Block<TInputProps>[]) {
    return formProcess.form.check(event, fields);
  }

  render() {
    return source;
  }
}
