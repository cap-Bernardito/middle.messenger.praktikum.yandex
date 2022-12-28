import { Form } from "entities/form_block";

import { Block, registerComponent } from "shared/core";
import { Button } from "shared/ui/button_block";
import { Input, TInputProps } from "shared/ui/input_block";

import source from "./login.hbs";

export class LoginPage extends Block {
  static cName = "LoginPage";

  constructor() {
    super({
      body: new Form({
        ref: "loginForm",
        title: "Вход",
        fields: (
          [
            {
              label: "Логин",
              name: "login",
              ref: "loginInput",
              onInput: (event) => {
                if (!event.target) {
                  return;
                }

                const input = event.target as HTMLInputElement;
                const { loginInput } = this.getFormInputs();

                loginInput.refs.errorRef.setProps({ text: input.value });
              },
              // onBlur: (e) => console.log(),
              // onFocus: () => console.log(),
            },
            {
              label: "Пароль",
              type: "password",
              name: "password",
              ref: "passwordInput",
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

registerComponent(LoginPage);

/*
`
{{#LayoutCentered}}
{{{Input
  onInput=onInput
  onFocus=onFocus
  onBlur=onBlur
  className="ddddddddddd"
  classNameInput="aaaaaaaaa"
  value=value
  label="Имя"
  ref="login"
  name="login"
  type="text"
  placeholder="Login"
}}}
  ${FormTemplate}
{{/LayoutCentered}}
    `

{{{Input
  onInput=onInput
  onFocus=onFocus
  onBlur=onBlur
  className="ddddddddddd"
  classNameInput="aaaaaaaaa"
  value=""
  label="Имя"
  ref="login"
  name="login"
  type="text"
  placeholder="Login"
}}}
*/
