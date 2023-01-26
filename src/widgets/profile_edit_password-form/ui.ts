import { store } from "app/store";

import { FormWithAuthStatus } from "widgets/form-with-auth";
import { profileEditPassword } from "widgets/profile_edit_password-form";

import { TFormProps } from "entities/form";

import { Input, TInputProps } from "shared/ui";

export function ProfileEditPasswordForm(
  this: {
    getRefs: () => TRefs;
  },
  getForm: (refs: TRefs) => TFormPartials,
  props: Omit<TFormProps, "fields">
) {
  return new FormWithAuthStatus({
    onSubmit: (event) => {
      const { isFormValid, formData } = getForm(this.getRefs()).form.check(
        event,
        Object.values(getForm(this.getRefs()).fields)
      );

      if (isFormValid) {
        delete formData.password_confirm;

        store.dispatch(profileEditPassword, formData);
      }
    },
    ...props,
    fields: (
      [
        {
          label: "Старый пароль",
          name: "oldPassword",
          type: "password",
          required: true,
          ref: "oldPasswordInput",
          onBlur: (event) => {
            getForm(this.getRefs()).fields.oldPasswordInput.setValue(event);
          },
        },
        {
          label: "Новый пароль",
          name: "newPassword",
          type: "password",
          required: true,
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
          required: true,
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
  } as TFormProps);
}
