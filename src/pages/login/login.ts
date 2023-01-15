import { Form } from "entities";

import { Block, Link } from "shared/core";
import { Button, Input, TInputProps } from "shared/ui";
import { ROUTES } from "shared/utils/constants";

export class LoginPage extends Block {
  static cName = "LoginPage";

  constructor() {
    super({
      body: new Form({
        onSubmit: (event) => {
          const { isFormValid, formData } = this.getForm().form.check(event, Object.values(this.getForm().fields));

          console.log(`Form is${isFormValid ? "" : " not"} valid. FormData: `, formData);
        },
        title: "Вход",
        fields: (
          [
            {
              label: "Логин",
              name: "login",
              required: true,
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
              required: true,
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
        button: new Button({ value: "Войти", title: "Войти", className: "btn-primary btn-block" }),
        meta: new Link({ to: ROUTES.register.path, value: "Зарегистрироваться", title: "Зарегистрироваться" }),
        decorated: true,
      }),
    });
  }

  getForm = () => Form.getFormParts(this.refs.formRef);

  render() {
    return `
  {{#LayoutCentered}}
    {{{body}}}
  {{/LayoutCentered}}
    `;
  }
}
