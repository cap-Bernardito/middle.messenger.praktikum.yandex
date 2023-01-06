import { Form, TFormProps } from "entities/form";

import { Input, TInputProps } from "shared/ui";

export function ProfileEditInfoForm(
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
          label: "Почта",
          value: "pochta@yandex.ru",
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
          value: "vasya_vasilek",
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
          value: "Вася",
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
          value: "Василёк",
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
          value: "Вася Василёк",
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
          value: "+79099673030",
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
  });
}
