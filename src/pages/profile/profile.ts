import { templateUserInfo, TUserInfoProps } from "entities/user-info";

import { renderAvatar } from "shared/ui/avatar/avatar";
import { renderLayoutCentered } from "shared/ui/layouts/centered/centered";
import { renderListV1 } from "shared/ui/list-v1/list-v1";
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
      name: '<a href="#">Изменить данные</a>',
    },
    {
      name: '<a href="#">Изменить пароль</a>',
    },
    {
      name: '<a href="#" class="text-danger">Выйти</a>',
    },
  ],
};

const renderUserInfo = renderCreator<TUserInfoProps>(templateUserInfo, {
  avatar: renderAvatar(),
  title: "Вася",
  info: renderListV1(infoProps),
  controls: renderListV1(controlsProps),
});

const pageContent = renderCreator(source, { body: renderUserInfo })();
const html = renderLayoutCentered({ body: pageContent, className: "layout-centered_md" });

export { html as profilePage };
