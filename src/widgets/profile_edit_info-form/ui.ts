import { authModel } from "processes/auth";

import { store } from "app/store";

import { FormWithAuthStatus } from "widgets/form-with-auth";

import { TFormProps } from "entities/form";

import { Input, TInputProps } from "shared/ui";

import { profileEditInfo } from ".";

export function ProfileEditInfoForm(
  this: {
    getRefs: () => TRefs;
  },
  getForm: (refs: TRefs) => TFormPartials,
  props: Omit<TFormProps, "fields">
) {
  const { user } = authModel.selectUser();

  if (!user) {
    return;
  }

  return new FormWithAuthStatus({
    onSubmit: (event) => {
      const { isFormValid, formData } = getForm(this.getRefs()).form.check(
        event,
        Object.values(getForm(this.getRefs()).fields)
      );

      if (isFormValid) {
        store.dispatch(profileEditInfo, formData);
      }
    },
    ...props,
    fields: (
      [
        {
          label: "Почта",
          value: user.email,
          name: "email",
          type: "email",
          required: true,
          ref: "emailInput",
          onInput: (event) => {
            getForm(this.getRefs()).fields.emailInput.check(event).setValue(event);
          },
          onBlur: (event) => {
            getForm(this.getRefs()).fields.emailInput.check(event).setValue(event);
          },
        },
        {
          label: "Логин",
          value: user.login,
          name: "login",
          required: true,
          ref: "loginInput",
          onInput: (event) => {
            getForm(this.getRefs()).fields.loginInput.check(event).setValue(event);
          },
          onBlur: (event) => {
            getForm(this.getRefs()).fields.loginInput.check(event).setValue(event);
          },
        },
        {
          label: "Имя",
          value: user.firstName,
          name: "first_name",
          required: true,
          ref: "first_nameInput",
          onInput: (event) => {
            getForm(this.getRefs()).fields.first_nameInput.check(event).setValue(event);
          },
          onBlur: (event) => {
            getForm(this.getRefs()).fields.first_nameInput.check(event).setValue(event);
          },
        },
        {
          label: "Фамилия",
          value: user.secondName,
          name: "second_name",
          required: true,
          ref: "second_nameInput",
          onInput: (event) => {
            getForm(this.getRefs()).fields.second_nameInput.check(event).setValue(event);
          },
          onBlur: (event) => {
            getForm(this.getRefs()).fields.second_nameInput.check(event).setValue(event);
          },
        },
        {
          label: "Имя в чате",
          value: user.displayName,
          name: "display_name",
          required: true,
          ref: "display_nameInput",
          onInput: (event) => {
            getForm(this.getRefs()).fields.display_nameInput.setValue(event);
          },
          onBlur: (event) => {
            getForm(this.getRefs()).fields.display_nameInput.setValue(event);
          },
        },
        {
          label: "Телефон",
          value: user.phone,
          name: "phone",
          type: "tel",
          required: true,
          ref: "phoneInput",
          onInput: (event) => {
            getForm(this.getRefs()).fields.phoneInput.check(event).setValue(event);
          },
          onBlur: (event) => {
            getForm(this.getRefs()).fields.phoneInput.check(event).setValue(event);
          },
        },
      ] as TInputProps[]
    ).map((inputProps) => new Input(inputProps)),
  } as TFormProps);
}
