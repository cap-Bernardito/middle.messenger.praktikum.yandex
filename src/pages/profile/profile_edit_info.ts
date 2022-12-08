import { renderForm } from "entities/form";
import { templateUserInfo, TUserInfoProps } from "entities/user-info";

import { renderAvatar } from "shared/ui/avatar";
import { renderButton } from "shared/ui/button";
import { renderInput, TInputProps } from "shared/ui/input";
import { renderLayoutCentered } from "shared/ui/layouts/centered";
import { renderCreator } from "shared/utils/utils";

import source from "./profile.hbs";

const inputs: TInputProps[] = [
  {
    label: "Почта",
    value: "pochta@yandex.ru",
    name: "email",
    classNameInput: "form-control__input_filled",
  },
  {
    label: "Логин",
    value: "vasya_vasilek",
    name: "login",
    classNameInput: "form-control__input_filled",
  },
  {
    label: "Имя",
    value: "Вася",
    name: "first_name",
    classNameInput: "form-control__input_filled",
  },
  {
    label: "Фамилия",
    value: "Василёк",
    name: "second_name",
    classNameInput: "form-control__input_filled",
  },
  {
    label: "Имя в чате",
    value: "Вася Василёк",
    name: "display_name",
    classNameInput: "form-control__input_filled",
  },
  {
    label: "Телефон",
    value: "+79099673030",
    name: "phone",
    classNameInput: "form-control__input_filled",
  },
];

const renderUserInfo = renderCreator<TUserInfoProps>(templateUserInfo, {
  avatar: renderAvatar(),
  info: renderForm({
    fields: inputs.map((input) => renderInput(input)).join(""),
    button: renderButton({ value: "Изменить данные", className: "btn-primary btn-block" }),
    decorated: false,
  }),
});

const pageContent = renderCreator(source, { body: renderUserInfo })();
const html = renderLayoutCentered({ body: pageContent, className: "layout-centered_md" });

export { html as profileEditInfoPage };
