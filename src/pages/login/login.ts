import { authModel, authServices } from "processes/auth";

import { store } from "app/store";

import { Form, SplashScreen } from "entities";

import { Block, Link } from "shared/core";
import { Button, Input, TInputProps } from "shared/ui";
import { ROUTES } from "shared/utils/constants";

type LoginPageProps = {
  body: Block | string;
};

class LoginPage extends Block {
  static cName = "LoginPage";

  constructor(props: LoginPageProps) {
    super(props);

    this.setProps({
      ...props,
      body: new Form({
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
      }),
    });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.authError !== newProps.authError) {
      this.getForm().form.setProps({ formError: newProps.authError });
    }

    if (oldProps.authLoading !== newProps.authLoading) {
      this.getForm().form.setProps({ loading: newProps.authLoading });
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

const LoginPageWithStore = authModel.withAuth(LoginPage);

export { LoginPageWithStore as LoginPage };
