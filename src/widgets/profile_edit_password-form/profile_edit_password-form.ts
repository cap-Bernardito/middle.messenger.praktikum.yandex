import { Form, TFormProps } from "entities/form";

import { Input, TInputProps } from "shared/ui";

export function ProfileEditPasswordForm(
  this: {
    getRefs: () => TRefs;
  },
  getForm: (refs: TRefs) => TFormPartials,
  props: Omit<TFormProps, "fields">
) {
  return new Form({
    onSubmit: (event) => {
      const { isFormValid, formData } = getForm(this.getRefs()).form.check(
        event,
        Object.values(getForm(this.getRefs()).fields)
      );

      console.log(`Form is${isFormValid ? "" : " not"} valid. FormData: `, formData);
    },
    ...props,
    fields: (
      [
        {
          label: "Старый пароль",
          name: "oldPassword",
          type: "password",
          ref: "oldPasswordInput",
          onBlur: (event) => {
            getForm(this.getRefs()).fields.oldPasswordInput.setValue(event);
          },
        },
        {
          label: "Новый пароль",
          name: "newPassword",
          type: "password",
          ref: "newPasswordInput",
          onInput: (event) => {
            getForm(this.getRefs()).fields.newPasswordInput.check(event).setValue(event);
          },
          onBlur: (event) => {
            getForm(this.getRefs()).fields.newPasswordInput.check(event).setValue(event);
          },
        },
        {
          label: "Повторите новый пароль",
          name: "password_confirm",
          type: "password",
          ref: "password_confirmInput",
          onInput: (event) => {
            getForm(this.getRefs()).fields.password_confirmInput.check(event).setValue(event);
          },
          onBlur: (event) => {
            getForm(this.getRefs()).fields.password_confirmInput.check(event).setValue(event);
          },
        },
      ] as TInputProps[]
    ).map((inputProps) => new Input(inputProps)),
  });
}
