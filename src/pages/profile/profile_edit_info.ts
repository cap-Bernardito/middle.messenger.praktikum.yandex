import { MyAvatar } from "widgets/my-avatar";
import { ProfileEditInfoForm } from "widgets/profile_edit_info-form";

import { Form, templateUserInfo, TUserInfoProps } from "entities";

import { Block, Link } from "shared/core";
import { Button } from "shared/ui";
import { ROUTES } from "shared/utils/constants";

export class ProfileEditInfoPage extends Block<TUserInfoProps> {
  static cName = "ProfileEditInfoPage";

  constructor() {
    super();

    this.setProps({
      avatar: new MyAvatar({}),
      info: ProfileEditInfoForm.call(this, (refs) => Form.getFormParts(refs.formRef), {
        button: new Button({ value: "Изменить данные", title: "Изменить данные", className: "btn-primary btn-block" }),
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
