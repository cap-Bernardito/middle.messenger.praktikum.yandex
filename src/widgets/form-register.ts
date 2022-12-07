import { templateForm, TFormProps } from "entities/form/form";

import { renderButton } from "shared/ui/button/button";
import { renderInput, TInputProps } from "shared/ui/input/input";
import { renderCreator } from "shared/utils/utils";

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

const renderHtml = renderCreator<TFormProps>(templateForm, {
  title: "Регистрация",
  fields: inputs.map((input) => renderInput(input)).join(""),
  button: renderButton({ value: "Зарегистрироваться", className: "btn-primary btn-block" }),
  meta: '<a href="/login" class="text-sm">Войти</a>',
});

export { renderHtml as renderFormRegister };
