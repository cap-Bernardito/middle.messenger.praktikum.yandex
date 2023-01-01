import { Form } from "entities/form";

import { Block } from "shared/core";
import { Button } from "shared/ui/button";
import { Input, TInputProps } from "shared/ui/input";
import { formProcess } from "shared/utils/form-processing";

import source from "./register.hbs";

export class RegisterPage extends Block {
  static cName = "RegisterPage";

  constructor() {
    super({
      body: new Form({
        onSubmit: (event) => {
          const { isFormValid, formData } = formProcess.form.check(event, Object.values(this.getFormInputs()));

          console.log(`Form is${isFormValid ? "" : " not"} valid. FormData: `, formData);
        },
        ref: "registerForm",
        title: "Регистрация",
        fields: (
          [
            {
              label: "Почта",
              name: "email",
              type: "email",
              ref: "emailInput",
              onInput: (event) => {
                formProcess.field.check(event, this.getFormInputs().emailInput);
              },
              onBlur: (event) => {
                formProcess.field.check(event, this.getFormInputs().emailInput);
                formProcess.field.setValue(event, this.getFormInputs().emailInput);
              },
            },
            {
              label: "Логин",
              name: "login",
              ref: "loginInput",
              onInput: (event) => {
                formProcess.field.check(event, this.getFormInputs().loginInput);
              },
              onBlur: (event) => {
                formProcess.field.check(event, this.getFormInputs().loginInput);
                formProcess.field.setValue(event, this.getFormInputs().loginInput);
              },
            },
            {
              label: "Имя",
              name: "first_name",
              ref: "first_nameInput",
              onInput: (event) => {
                formProcess.field.check(event, this.getFormInputs().first_nameInput);
              },
              onBlur: (event) => {
                formProcess.field.check(event, this.getFormInputs().first_nameInput);
                formProcess.field.setValue(event, this.getFormInputs().first_nameInput);
              },
            },
            {
              label: "Фамилия",
              name: "second_name",
              ref: "second_nameInput",
              onInput: (event) => {
                formProcess.field.check(event, this.getFormInputs().second_nameInput);
              },
              onBlur: (event) => {
                formProcess.field.check(event, this.getFormInputs().second_nameInput);
                formProcess.field.setValue(event, this.getFormInputs().second_nameInput);
              },
            },
            {
              label: "Телефон",
              name: "phone",
              type: "tel",
              ref: "phoneInput",
              onInput: (event) => {
                formProcess.field.check(event, this.getFormInputs().phoneInput);
              },
              onBlur: (event) => {
                formProcess.field.check(event, this.getFormInputs().phoneInput);
                formProcess.field.setValue(event, this.getFormInputs().phoneInput);
              },
            },
            {
              label: "Пароль",
              type: "password",
              name: "password",
              ref: "passwordInput",
              onInput: (event) => {
                formProcess.field.check(event, this.getFormInputs().passwordInput);
              },
              onBlur: (event) => {
                formProcess.field.check(event, this.getFormInputs().passwordInput);
                formProcess.field.setValue(event, this.getFormInputs().passwordInput);
              },
            },
            {
              label: "Пароль (ещё раз)",
              type: "password",
              name: "password_confirm",
              ref: "password_confirmInput",
              onInput: (event) => {
                formProcess.field.check(event, this.getFormInputs().password_confirmInput);
              },
              onBlur: (event) => {
                formProcess.field.check(event, this.getFormInputs().password_confirmInput);
                formProcess.field.setValue(event, this.getFormInputs().password_confirmInput);
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

  getFormInputs = () => {
    return this.refs.registerForm.refs || {};
  };

  render() {
    return source;
  }
}
