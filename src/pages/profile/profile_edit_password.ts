import { Form, templateUserInfo, TUserInfoProps } from "entities";

import { Block } from "shared/core";
import { Avatar, Button, Input, TInputProps } from "shared/ui";

export class ProfileEditPasswordPage extends Block<TUserInfoProps> {
  static cName = "ProfileEditPasswordPage";

  constructor() {
    super({
      avatar: new Avatar(),
      info: new Form({
        onSubmit: (event) => {
          const { isFormValid, formData } = this.getForm().form.check(event, Object.values(this.getForm().fields));

          console.log(`Form is${isFormValid ? "" : " not"} valid. FormData: `, formData);
        },
        fields: (
          [
            {
              label: "Старый пароль",
              name: "oldPassword",
              type: "password",
              ref: "oldPasswordInput",
              onBlur: (event) => {
                this.getForm().fields.oldPasswordInput.setValue(event);
              },
            },
            {
              label: "Новый пароль",
              name: "newPassword",
              type: "password",
              ref: "newPasswordInput",
              onInput: (event) => {
                this.getForm().fields.newPasswordInput.check(event).setValue(event);
              },
              onBlur: (event) => {
                this.getForm().fields.newPasswordInput.check(event).setValue(event);
              },
            },
            {
              label: "Повторите новый пароль",
              name: "password_confirm",
              type: "password",
              ref: "password_confirmInput",
              onInput: (event) => {
                this.getForm().fields.password_confirmInput.check(event).setValue(event);
              },
              onBlur: (event) => {
                this.getForm().fields.password_confirmInput.check(event).setValue(event);
              },
            },
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        button: new Button({ value: "Изменить пароль", className: "btn-primary btn-block" }),
        decorated: false,
      }),
    });
  }

  getForm = () => Form.getFormParts(this.refs.formRef);

  render() {
    return `
{{#LayoutCentered className="layout-centered_md"}}
  ${templateUserInfo}
{{/LayoutCentered}}
    `;
  }
}
