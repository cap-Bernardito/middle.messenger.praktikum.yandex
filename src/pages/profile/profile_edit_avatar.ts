import { MyAvatar } from "widgets/my-avatar";
import { ProfileEditAvatarForm } from "widgets/profile_edit_avatar-form";

import { Form, templateUserInfo, TUserInfoProps } from "entities";

import { Block } from "shared/core";
import { Button } from "shared/ui";

export class ProfileAvatarPage extends Block<TUserInfoProps> {
  static cName = "ProfileAvatarPage";

  constructor() {
    super();

    this.setProps({
      avatar: new MyAvatar({}),
      info: ProfileEditAvatarForm.call(this, (refs) => Form.getFormParts(refs.formRef), {
        button: new Button({ value: "Изменить аватар", title: "Изменить аватар", className: "btn-primary btn-block" }),
        decorated: false,
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
