import { authModel } from "processes/auth";

import { templateUserInfo, TUserInfoProps } from "entities";

import { Block, Link } from "shared/core";
import { Avatar, ListV1, ListV1Item } from "shared/ui";
import { ROUTES } from "shared/utils/constants";

export class ProfilePage extends Block<TUserInfoProps> {
  static cName = "ProfilePage";

  constructor() {
    const { user } = authModel.selectUser();

    if (!user) {
      return;
    }

    super({
      avatar: new Avatar(),
      title: "Вася",
      info: new ListV1({
        items: [
          {
            name: "Почта",
            value: user.email,
          },
          {
            name: "Логин",
            value: user.login,
          },
          {
            name: "Имя",
            value: user.firstName,
          },
          {
            name: "Фамилия",
            value: user.secondName,
          },
          {
            name: "Имя в чате",
            value: user.displayName,
          },
          {
            name: "Телефон",
            value: user.phone,
          },
        ].map((listItem) => new ListV1Item(listItem)),
      }),
      controls: new ListV1({
        items: [
          {
            name: new Link({ to: ROUTES.profileEditInfo.path, value: "Изменить данные", title: "Изменить данные" }),
          },
          {
            name: new Link({ to: ROUTES.profileEditPassword.path, value: "Изменить пароль", title: "Изменить пароль" }),
          },
          {
            name: new Link({ to: ROUTES.profileEditAvatar.path, value: "Изменить аватар", title: "Изменить аватар" }),
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
