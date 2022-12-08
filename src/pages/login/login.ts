import { templateForm, TFormProps } from "entities/form";

import { renderButton } from "shared/ui/button";
import { renderInput, TInputProps } from "shared/ui/input";
import { renderLayoutCentered } from "shared/ui/layouts/centered";
import { renderCreator } from "shared/utils/utils";

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

const renderFormLogin = renderCreator<TFormProps>(templateForm, {
  title: "Вход",
  fields: inputs.map((input) => renderInput(input)).join(""),
  button: renderButton({ value: "Войти", className: "btn-primary btn-block" }),
  meta: '<a href="/register" class="text-sm">Зарегистрироваться</a>',
});

const pageContent = renderCreator(source, { body: renderFormLogin() })();
const html = renderLayoutCentered({ body: pageContent });

export { html as loginPage };
