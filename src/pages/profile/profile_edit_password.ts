import { renderForm } from "entities/form";
import { renderUserInfo } from "entities/user-info";

import { renderAvatar } from "shared/ui/avatar";
import { renderButton } from "shared/ui/button";
import { renderInput, TInputProps } from "shared/ui/input";
import { renderLayoutCentered } from "shared/ui/layouts/centered";
import { renderCreator } from "shared/utils/utils";

import source from "./profile.hbs";

const inputs: TInputProps[] = [
  {
    label: "Старый пароль",
    name: "oldPassword",
    type: "password",
  },
  {
    label: "Новый пароль",
    name: "newPassword",
    type: "password",
  },
  {
    label: "Повторите новый пароль",
    name: "newPasswordRepeat",
    type: "password",
  },
];

const pageBody = renderUserInfo({
  title: undefined,
  controls: undefined,
  avatar: renderAvatar(),
  info: renderForm({
    fields: inputs.map((input) => renderInput(input)).join(""),
    button: renderButton({ value: "Изменить пароль", className: "btn-primary btn-block" }),
    decorated: false,
  }),
});

const pageContent = renderCreator(source, { body: pageBody })();
const html = renderLayoutCentered({ body: pageContent, className: "layout-centered_md" });

export { html as profileEditPasswordPage };
