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
    label: "Выбрать файл на компьютере",
    name: "avatar",
    type: "file",
    className: "form-control_file",
  },
];

const pageBody = renderUserInfo({
  title: undefined,
  controls: undefined,
  avatar: renderAvatar(),
  info: renderForm({
    title: "Загрузите файл",
    fields: inputs.map((input) => renderInput(input)).join(""),
    button: renderButton({ value: "Поменять", className: "btn-primary btn-block" }),
    decorated: false,
  }),
});

const pageContent = renderCreator(source, { body: pageBody })();
const html = renderLayoutCentered({ body: pageContent, className: "layout-centered_md" });

export { html as profileEditAvatarPage };
