import { Form } from "entities";

import { Block } from "shared/core";
import { Button, Input, TInputProps } from "shared/ui";

import source from "./login.hbs";

export class LoginPage extends Block {
  static cName = "LoginPage";

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
        title: "Вход",
        fields: (
          [
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
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        button: new Button({ value: "Войти", className: "btn-primary btn-block" }),
        meta: '<a href="/register">Зарегистрироваться</a>',
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
