import { Form } from "entities/form_block";
import { templateUserInfo, TUserInfoProps } from "entities/user-info_block";

import { Block, registerComponent } from "shared/core";
import { Avatar } from "shared/ui/avatar_block";
import { Button } from "shared/ui/button_block";
import { Input, TInputProps } from "shared/ui/input_block";
import { formProcess } from "shared/utils/form-processing";

export class ProfileEditInfoPage extends Block<TUserInfoProps> {
  static cName = "ProfileEditInfoPage";

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
              label: "Почта",
              value: "pochta@yandex.ru",
              name: "email",
              type: "email",
              ref: "emailInput",
              onInput: (event) => {
                formProcess.field.check(event, this.getFormInputs().emailInput);
              },
              onBlur: (event) => {
                formProcess.field.check(event, this.getFormInputs().emailInput);
                formProcess.field.setValue(event, this.getFormInputs().emailInput);
              },
            },
            {
              label: "Логин",
              value: "vasya_vasilek",
              name: "login",
              ref: "loginInput",
              onInput: (event) => {
                formProcess.field.check(event, this.getFormInputs().loginInput);
              },
              onBlur: (event) => {
                formProcess.field.check(event, this.getFormInputs().loginInput);
                formProcess.field.setValue(event, this.getFormInputs().loginInput);
              },
            },
            {
              label: "Имя",
              value: "Вася",
              name: "first_name",
              ref: "first_nameInput",
              onInput: (event) => {
                formProcess.field.check(event, this.getFormInputs().first_nameInput);
              },
              onBlur: (event) => {
                formProcess.field.check(event, this.getFormInputs().first_nameInput);
                formProcess.field.setValue(event, this.getFormInputs().first_nameInput);
              },
            },
            {
              label: "Фамилия",
              value: "Василёк",
              name: "second_name",
              ref: "second_nameInput",
              onInput: (event) => {
                formProcess.field.check(event, this.getFormInputs().second_nameInput);
              },
              onBlur: (event) => {
                formProcess.field.check(event, this.getFormInputs().second_nameInput);
                formProcess.field.setValue(event, this.getFormInputs().second_nameInput);
              },
            },
            {
              label: "Имя в чате",
              value: "Вася Василёк",
              name: "display_name",
              ref: "display_nameInput",
              onBlur: (event) => {
                formProcess.field.setValue(event, this.getFormInputs().display_nameInput);
              },
            },
            {
              label: "Телефон",
              value: "+79099673030",
              name: "phone",
              type: "tel",
              ref: "phoneInput",
              onInput: (event) => {
                formProcess.field.check(event, this.getFormInputs().phoneInput);
              },
              onBlur: (event) => {
                formProcess.field.check(event, this.getFormInputs().phoneInput);
                formProcess.field.setValue(event, this.getFormInputs().phoneInput);
              },
            },
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        button: new Button({ value: "Изменить данные", className: "btn-primary btn-block" }),
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

registerComponent(ProfileEditInfoPage);
