import { Form } from "entities/form_block";
import { templateUserInfo, TUserInfoProps } from "entities/user-info_block";

import { Block, registerComponent } from "shared/core";
import { Avatar } from "shared/ui/avatar_block";
import { Button } from "shared/ui/button_block";
import { Input, TInputProps } from "shared/ui/input_block";
import { formProcess } from "shared/utils/form-processing";

export class ProfileEditPasswordPage extends Block<TUserInfoProps> {
  static cName = "ProfileEditPasswordPage";

  constructor() {
    super({
      avatar: new Avatar(),
      info: new Form({
        onSubmit: (event) => {
          const { isFormValid, formData } = formProcess.form.check(event, Object.values(this.getFormInputs()));

          console.log(`Form is${isFormValid ? "" : " not"} valid. FormData: `, formData);
        },
        ref: "form",
        fields: (
          [
            {
              label: "Старый пароль",
              name: "oldPassword",
              type: "password",
              ref: "oldPasswordInput",
              onBlur: (event) => {
                formProcess.field.setValue(event, this.getFormInputs().oldPasswordInput);
              },
            },
            {
              label: "Новый пароль",
              name: "newPassword",
              type: "password",
              ref: "newPasswordInput",
              onInput: (event) => {
                formProcess.field.check(event, this.getFormInputs().newPasswordInput);
              },
              onBlur: (event) => {
                formProcess.field.check(event, this.getFormInputs().newPasswordInput);
                formProcess.field.setValue(event, this.getFormInputs().newPasswordInput);
              },
            },
            {
              label: "Повторите новый пароль",
              name: "password_confirm",
              type: "password",
              ref: "password_confirmInput",
              onInput: (event) => {
                formProcess.field.check(event, this.getFormInputs().password_confirmInput);
              },
              onBlur: (event) => {
                formProcess.field.check(event, this.getFormInputs().password_confirmInput);
                formProcess.field.setValue(event, this.getFormInputs().password_confirmInput);
              },
            },
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        button: new Button({ value: "Изменить пароль", className: "btn-primary btn-block" }),
        decorated: false,
      }),
    });
  }

  getFormInputs = () => {
    return this.refs.form.refs || {};
  };

  render() {
    return `
{{#LayoutCentered className="layout-centered_md"}}
  ${templateUserInfo}
{{/LayoutCentered}}
    `;
  }
}

registerComponent(ProfileEditPasswordPage);
