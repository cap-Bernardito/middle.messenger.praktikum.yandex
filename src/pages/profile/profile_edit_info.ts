import { MyAvatar } from "widgets/my-avatar";
import { ProfileEditInfoForm } from "widgets/profile_edit_info-form";

import { Form, templateUserInfo, TUserInfoProps } from "entities";

import { Block } from "shared/core";
import { Button } from "shared/ui";

export class ProfileEditInfoPage extends Block<TUserInfoProps> {
  static cName = "ProfileEditInfoPage";

  constructor() {
    super();

    this.setProps({
      avatar: new MyAvatar({}),
      info: ProfileEditInfoForm.call(this, (refs) => Form.getFormParts(refs.formRef), {
        button: new Button({ value: "Изменить данные", title: "Изменить данные", className: "btn-primary btn-block" }),
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
