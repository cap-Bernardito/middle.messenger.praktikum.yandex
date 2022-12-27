import { Form } from "entities/form_block";

import { Block, registerComponent } from "shared/core";
import { Button } from "shared/ui/button_block";
import { Input, TInputProps } from "shared/ui/input_block";

import source from "./login.hbs";

const inputs: TInputProps[] = [
  {
    label: "Логин",
    name: "login",
  },
  {
    label: "Пароль",
    type: "password",
    name: "password",
  },
];

export class LoginPage extends Block {
  static cName = "LoginPage";

  constructor() {
    super({
      body: new Form({
        title: "Вход",
        fields: inputs.map((inputProps) => new Input(inputProps)),
        button: new Button({ value: "Войти", className: "btn-primary btn-block" }),
        meta: '<a href="/register" class="text-sm">Зарегистрироваться</a>',
      }),
    });
  }

  render() {
    return source;
  }
}

registerComponent(LoginPage);
