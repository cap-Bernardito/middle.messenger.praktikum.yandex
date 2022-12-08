import { templateForm, TFormProps } from "entities/form";

import { renderButton } from "shared/ui/button";
import { renderInput, TInputProps } from "shared/ui/input";
import { renderLayoutCentered } from "shared/ui/layouts/centered";
import { renderCreator } from "shared/utils/utils";

import source from "./register.hbs";

const inputs: TInputProps[] = [
  {
    label: "Почта",
    name: "email",
  },
  {
    label: "Логин",
    name: "login",
  },
  {
    label: "Имя",
    name: "first_name",
  },
  {
    label: "Фамилия",
    name: "second_name",
  },
  {
    label: "Телефон",
    name: "phone",
  },
  {
    label: "Пароль",
    type: "password",
    name: "password",
  },
  {
    label: "Пароль (ещё раз)",
    type: "password",
    name: "password_confirm",
  },
];

const renderFormRegister = renderCreator<TFormProps>(templateForm, {
  title: "Регистрация",
  fields: inputs.map((input) => renderInput(input)).join(""),
  button: renderButton({ value: "Зарегистрироваться", className: "btn-primary btn-block" }),
  meta: '<a href="/login" class="text-sm">Войти</a>',
});

const pageContent = renderCreator(source, { body: renderFormRegister() })();
const html = renderLayoutCentered({ body: pageContent });

export { html as registerPage };
