import { Input, Textarea } from "shared/ui";

declare global {
  export type TFormFields = Input | Textarea;

  export type TFormPartials = {
    form: Form;
    fields: {
      [k: string]: TFormFields;
    };
  };
}

export {};
