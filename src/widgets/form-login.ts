import { templateForm, TFormProps } from "entities/form/form";

import { renderButton } from "shared/ui/button/button";
import { renderInput, TInputProps } from "shared/ui/input/input";
import { renderCreator } from "shared/utils/utils";

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

const renderHtml = renderCreator<TFormProps>(templateForm, {
  title: "Вход",
  fields: inputs.map((input) => renderInput(input)).join(""),
  button: renderButton({ value: "Войти", className: "btn-primary btn-block" }),
  meta: '<a href="/register" class="text-sm">Зарегистрироваться</a>',
});

export { renderHtml as renderFormLogin };
