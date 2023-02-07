import { authModel } from "processes/auth";
import { authServices } from "processes/auth/services";

import { store } from "app/store";

import { FormWithAuthStatus } from "widgets/form-with-auth";

import { Form, TFormProps } from "entities";

import { Block } from "shared/core/block";
import { Link } from "shared/core/router/link";
import { Button, Input, TInputProps } from "shared/ui";
import { ROUTES } from "shared/utils/constants";

type LoginPageProps = {
  body?: Block | string;
};

class LoginPage extends Block {
  static cName = "LoginPage";

  constructor(props: LoginPageProps) {
    super(props);

    this.setProps({
      ...props,
      body: new FormWithAuthStatus({
        onSubmit: (event) => {
          const { isFormValid, formData } = this.getForm().form.check(event, Object.values(this.getForm().fields));

          if (isFormValid) {
            store.dispatch(authServices.login, formData);
          }
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
      } as TFormProps),
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

const LoginPageWithStore = authModel.withAuth(LoginPage);

export { LoginPageWithStore as LoginPage };
