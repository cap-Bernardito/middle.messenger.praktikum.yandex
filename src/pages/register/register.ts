import { authModel, authServices } from "processes/auth";

import { store } from "app/store";

import { Form } from "entities/form";

import { Block, Link } from "shared/core";
import { Button, Input, TInputProps } from "shared/ui";
import { ROUTES } from "shared/utils/constants";

class RegisterPage extends Block {
  static cName = "RegisterPage";

  constructor() {
    super({
      body: new Form({
        onSubmit: (event) => {
          const { isFormValid, formData } = this.getForm().form.check(event, Object.values(this.getForm().fields));

          if (isFormValid) {
            store.dispatch(authServices.register, formData);
          }
        },
        title: "Регистрация",
        fields: (
          [
            {
              label: "Почта",
              name: "email",
              type: "email",
              required: true,
              ref: "emailInput",
              onInput: (event) => {
                this.getForm().fields.emailInput.check(event).setValue(event);
              },
              onBlur: (event) => {
                this.getForm().fields.emailInput.check(event).setValue(event);
              },
            },
            {
              label: "Логин",
              name: "login",
              required: true,
              ref: "loginInput",
              onInput: (event) => {
                this.getForm().fields.loginInput.check(event).setValue(event);
              },
              onBlur: (event) => {
                this.getForm().fields.loginInput.check(event).setValue(event);
              },
            },
            {
              label: "Имя",
              name: "first_name",
              required: true,
              ref: "first_nameInput",
              onInput: (event) => {
                this.getForm().fields.first_nameInput.check(event).setValue(event);
              },
              onBlur: (event) => {
                this.getForm().fields.first_nameInput.check(event).setValue(event);
              },
            },
            {
              label: "Фамилия",
              name: "second_name",
              required: true,
              ref: "second_nameInput",
              onInput: (event) => {
                this.getForm().fields.second_nameInput.check(event).setValue(event);
              },
              onBlur: (event) => {
                this.getForm().fields.second_nameInput.check(event).setValue(event);
              },
            },
            {
              label: "Телефон",
              name: "phone",
              type: "tel",
              required: true,
              ref: "phoneInput",
              onInput: (event) => {
                this.getForm().fields.phoneInput.check(event).setValue(event);
              },
              onBlur: (event) => {
                this.getForm().fields.phoneInput.check(event).setValue(event);
              },
            },
            {
              label: "Пароль",
              type: "password",
              name: "password",
              required: true,
              ref: "passwordInput",
              onInput: (event) => {
                this.getForm().fields.passwordInput.check(event).setValue(event);
              },
              onBlur: (event) => {
                this.getForm().fields.passwordInput.check(event).setValue(event);
              },
            },
            {
              label: "Пароль (ещё раз)",
              type: "password",
              name: "password_confirm",
              required: true,
              ref: "password_confirmInput",
              onInput: (event) => {
                this.getForm().fields.password_confirmInput.check(event).setValue(event);
              },
              onBlur: (event) => {
                this.getForm().fields.password_confirmInput.check(event).setValue(event);
              },
            },
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        button: new Button({
          value: "Зарегистрироваться",
          title: "Зарегистрироваться",
          className: "btn-primary btn-block",
        }),
        meta: new Link({ to: ROUTES.login.path, value: "Войти", title: "Войти" }),
        decorated: true,
      }),
    });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.authError !== newProps.authError) {
      this.getForm().form.setProps({ formError: newProps.authError });
    }

    return true;
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

const RegisterPageWithStore = authModel.withAuth(RegisterPage);

export { RegisterPageWithStore as RegisterPage };
