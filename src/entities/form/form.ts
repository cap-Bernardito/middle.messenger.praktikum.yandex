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
    meta?: Block | string;
    className?: string;
    decorated?: boolean;
    formError?: TNullable<string>;
    onSubmit?: (event: Event) => void;
  }>
>;

const cache = new WeakMap();

export class Form extends Block<TFormProps> {
  static cName = "Form";

  static isForm(block: Block | undefined): block is Form {
    return block instanceof Form;
  }

  static isField(block: Block | undefined): block is TFormFields {
    return block instanceof Input || block instanceof Textarea;
  }

  static getFormParts = (
    form: Block | undefined,
    cb?: typeof Form.isForm
  ): { form: Form; fields: Record<string, TFormFields>; error: Error } => {
    if (form && cache.has(form)) {
      return cache.get(form);
    }

    if (cb) {
      if (!cb(form)) {
        throw new Error(`Component is not a Form`);
      }
    } else if (!Form.isForm(form)) {
      throw new Error(`Component is not a Form`);
    }

    const formRefs = <[string, TFormFields][]>Object.entries(form.refs).filter(([, ref]) => Form.isField(ref));

    const fields = Object.fromEntries(formRefs);

    cache.set(form, {
      form: form,
      fields: fields,
      error: form.refs.formErrorRef,
    });

    return cache.get(form);
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
