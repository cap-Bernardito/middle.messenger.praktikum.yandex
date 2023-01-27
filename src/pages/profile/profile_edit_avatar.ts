import { MyAvatar } from "widgets/my-avatar";
import { ProfileEditAvatarForm } from "widgets/profile_edit_avatar-form";

import { Form, templateUserInfo, TUserInfoProps } from "entities";

import { Block, Link } from "shared/core";
import { Button } from "shared/ui";
import { ROUTES } from "shared/utils/constants";

export class ProfileAvatarPage extends Block<TUserInfoProps> {
  static cName = "ProfileAvatarPage";

  constructor() {
    super();

    this.setProps({
      avatar: new MyAvatar({}),
      info: ProfileEditAvatarForm.call(this, (refs) => Form.getFormParts(refs.formRef), {
        button: new Button({ value: "Изменить аватар", title: "Изменить аватар", className: "btn-primary btn-block" }),
        decorated: false,
        meta: new Link({ to: ROUTES.profile.path, value: "Настройки пользователя", title: "Настройки пользователя" }),
      }),
    });
  }

  getRefs = () => this.refs;

  render() {
    return `
{{#LayoutCentered className="layout-centered_md"}}
  ${templateUserInfo}
{{/LayoutCentered}}
    `;
  }
}
