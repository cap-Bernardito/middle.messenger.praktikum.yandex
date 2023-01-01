import { Form } from "entities/form";

import { Block } from "shared/core";
import { Button, Input, TInputProps } from "shared/ui";

import source from "./register.hbs";

export class RegisterPage extends Block {
  static cName = "RegisterPage";

  constructor() {
    super({
      body: new Form({
        onSubmit: (event) => {
          const { isFormValid, formData } = (this.getForm().form as Form).check(
            event,
            Object.values(this.getForm().fields)
          );

          console.log(`Form is${isFormValid ? "" : " not"} valid. FormData: `, formData);
        },
        title: "Регистрация",
        fields: (
          [
            {
              label: "Почта",
              name: "email",
              type: "email",
              ref: "emailInput",
              onInput: (event) => {
                (this.getForm().fields.emailInput as Input).check(event).setValue(event);
              },
              onBlur: (event) => {
                (this.getForm().fields.emailInput as Input).check(event).setValue(event);
              },
            },
            {
              label: "Логин",
              name: "login",
              ref: "loginInput",
              onInput: (event) => {
                (this.getForm().fields.loginInput as Input).check(event).setValue(event);
              },
              onBlur: (event) => {
                (this.getForm().fields.loginInput as Input).check(event).setValue(event);
              },
            },
            {
              label: "Имя",
              name: "first_name",
              ref: "first_nameInput",
              onInput: (event) => {
                (this.getForm().fields.first_nameInput as Input).check(event).setValue(event);
              },
              onBlur: (event) => {
                (this.getForm().fields.first_nameInput as Input).check(event).setValue(event);
              },
            },
            {
              label: "Фамилия",
              name: "second_name",
              ref: "second_nameInput",
              onInput: (event) => {
                (this.getForm().fields.second_nameInput as Input).check(event).setValue(event);
              },
              onBlur: (event) => {
                (this.getForm().fields.second_nameInput as Input).check(event).setValue(event);
              },
            },
            {
              label: "Телефон",
              name: "phone",
              type: "tel",
              ref: "phoneInput",
              onInput: (event) => {
                (this.getForm().fields.phoneInput as Input).check(event).setValue(event);
              },
              onBlur: (event) => {
                (this.getForm().fields.phoneInput as Input).check(event).setValue(event);
              },
            },
            {
              label: "Пароль",
              type: "password",
              name: "password",
              ref: "passwordInput",
              onInput: (event) => {
                (this.getForm().fields.passwordInput as Input).check(event).setValue(event);
              },
              onBlur: (event) => {
                (this.getForm().fields.passwordInput as Input).check(event).setValue(event);
              },
            },
            {
              label: "Пароль (ещё раз)",
              type: "password",
              name: "password_confirm",
              ref: "password_confirmInput",
              onInput: (event) => {
                (this.getForm().fields.password_confirmInput as Input).check(event).setValue(event);
              },
              onBlur: (event) => {
                (this.getForm().fields.password_confirmInput as Input).check(event).setValue(event);
              },
            },
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        button: new Button({ value: "Зарегистрироваться", className: "btn-primary btn-block" }),
        meta: '<a href="/login">Войти</a>',
        decorated: true,
      }),
    });
  }

  getForm = () => {
    const form = this.refs.formRef || {};

    return {
      form: form,
      fields: form.refs,
    };
  };

  render() {
    return source;
  }
}
