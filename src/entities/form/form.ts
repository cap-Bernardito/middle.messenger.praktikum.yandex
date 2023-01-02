import { Block } from "shared/core";
import { Button, Input, Textarea } from "shared/ui";
import { formProcess } from "shared/utils/form-processing";

import source from "./form.hbs";

import "./form.scss";

export type TFormProps = TPropsWithEvents<
  TPropsWithRef<{
    fields: Input[];
    button: Button;
    title?: string;
    meta?: string;
    className?: string;
    decorated?: boolean;
    onSubmit?: (event: Event) => void;
  }>
>;

export class Form extends Block<TFormProps> {
  static cName = "Form";

  static isForm(block: Block | undefined): block is Form {
    return block instanceof Form;
  }

  static isField(block: Block | undefined): block is TFormFields {
    return block instanceof Input || block instanceof Textarea;
  }

  static getFormParts = (form: Block | undefined, cb?: typeof Form.isForm) => {
    if (cb) {
      if (!cb(form)) {
        throw new Error(`Component is not a Form`);
      }
    } else if (!Form.isForm(form)) {
      throw new Error(`Component is not a Form`);
    }

    const formRefs = <[string, TFormFields][]>Object.entries(form.refs).filter(([, ref]) => Form.isField(ref));

    const fields = Object.fromEntries(formRefs);

    return {
      form: form,
      fields: fields,
    };
  };

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

  check(event: Event, fields: TFormFields[]) {
    return formProcess.form.check(event, fields);
  }

  render() {
    return source;
  }
}
