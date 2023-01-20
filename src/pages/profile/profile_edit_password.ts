import { MyAvatar } from "widgets/my-avatar";
import { ProfileEditPasswordForm } from "widgets/profile_edit_password-form";

import { Form, templateUserInfo, TUserInfoProps } from "entities";

import { Block, Link } from "shared/core";
import { Button } from "shared/ui";
import { ROUTES } from "shared/utils/constants";

export class ProfileEditPasswordPage extends Block<TUserInfoProps> {
  static cName = "ProfileEditPasswordPage";

  constructor() {
    super();

    this.setProps({
      avatar: new MyAvatar({}),
      info: ProfileEditPasswordForm.call(this, (refs) => Form.getFormParts(refs.formRef), {
        button: new Button({ value: "Изменить пароль", title: "Изменить пароль", className: "btn-primary btn-block" }),
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
