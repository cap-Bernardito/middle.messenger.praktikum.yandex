import { templateUserInfo, TUserInfoProps } from "entities";

import { Block } from "shared/core";
import { Avatar, ListV1, ListV1Item } from "shared/ui";

export class ProfilePage extends Block<TUserInfoProps> {
  static cName = "ProfilePage";

  constructor() {
    super({
      avatar: new Avatar(),
      title: "Вася",
      info: new ListV1({
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
        ].map((listItem) => new ListV1Item(listItem)),
      }),
      controls: new ListV1({
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
        ].map((listItem) => new ListV1Item(listItem)),
      }),
    });
  }

  render() {
    return `
{{#LayoutCentered className="layout-centered_md"}}
  ${templateUserInfo}
{{/LayoutCentered}}
    `;
  }
}
