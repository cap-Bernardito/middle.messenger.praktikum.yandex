import { Form } from "entities/form_block";

import { Block } from "shared/core";
import { Button } from "shared/ui/button_block";
import { Input, TInputProps } from "shared/ui/input_block";
import { formProcess } from "shared/utils/form-processing";

import source from "./login.hbs";

export class LoginPage extends Block {
  static cName = "LoginPage";

  constructor() {
    super({
      body: new Form({
        onSubmit: (event) => {
          const { isFormValid, formData } = formProcess.form.check(event, Object.values(this.getFormInputs()));

          console.log(`Form is${isFormValid ? "" : " not"} valid. FormData: `, formData);
        },
        ref: "loginForm",
        title: "Вход",
        fields: (
          [
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
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        button: new Button({ value: "Войти", className: "btn-primary btn-block" }),
        meta: '<a href="/register" class="text-sm">Зарегистрироваться</a>',
        decorated: true,
      }),
    });
  }

  getFormInputs = () => {
    return this.refs.loginForm.refs || {};
  };

  render() {
    return source;
  }
}
