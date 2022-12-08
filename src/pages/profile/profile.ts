import { templateUserInfo, TUserInfoProps } from "entities/user-info";

import { renderAvatar } from "shared/ui/avatar";
import { renderLayoutCentered } from "shared/ui/layouts/centered";
import { renderListV1 } from "shared/ui/list-v1";
import { renderCreator } from "shared/utils/utils";

import source from "./profile.hbs";

const infoProps = {
  items: [
    {
      name: "Почта",
      value: "pochta@yandex.ru",
    },
    {
      name: "Логин",
      value: "vasya_vasilek",
    },
    {
      name: "Имя",
      value: "Вася",
    },
    {
      name: "Фамилия",
      value: "Василёк",
    },
    {
      name: "Имя в чате",
      value: "Вася Василёк",
    },
    {
      name: "Телефон",
      value: "+7 (909) 967 30 30",
    },
  ],
};

const controlsProps = {
  items: [
    {
      name: '<a href="/profile_edit_info">Изменить данные</a>',
    },
    {
      name: '<a href="/profile_edit_password">Изменить пароль</a>',
    },
    {
      name: '<a href="#" class="text-danger">Выйти</a>',
    },
  ],
};

const renderUserInfo = renderCreator<TUserInfoProps>(templateUserInfo, {
  avatar: renderAvatar({ editable: true }),
  title: "Вася",
  info: renderListV1(infoProps),
  controls: renderListV1(controlsProps),
});

const pageContent = renderCreator(source, { body: renderUserInfo })();
const html = renderLayoutCentered({ body: pageContent, className: "layout-centered_md" });

export { html as profilePage };
