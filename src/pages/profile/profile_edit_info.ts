import { Form, templateUserInfo, TUserInfoProps } from "entities";

import { Block } from "shared/core";
import { Avatar, Button, Input, TInputProps } from "shared/ui";

export class ProfileEditInfoPage extends Block<TUserInfoProps> {
  static cName = "ProfileEditInfoPage";

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
              label: "Почта",
              value: "pochta@yandex.ru",
              name: "email",
              type: "email",
              ref: "emailInput",
              onInput: (event) => {
                this.getForm().fields.emailInput.check(event).setValue(event);
              },
              onBlur: (event) => {
                this.getForm().fields.emailInput.check(event).setValue(event);
              },
            },
            {
              label: "Логин",
              value: "vasya_vasilek",
              name: "login",
              ref: "loginInput",
              onInput: (event) => {
                this.getForm().fields.loginInput.check(event).setValue(event);
              },
              onBlur: (event) => {
                this.getForm().fields.loginInput.check(event).setValue(event);
              },
            },
            {
              label: "Имя",
              value: "Вася",
              name: "first_name",
              ref: "first_nameInput",
              onInput: (event) => {
                this.getForm().fields.first_nameInput.check(event).setValue(event);
              },
              onBlur: (event) => {
                this.getForm().fields.first_nameInput.check(event).setValue(event);
              },
            },
            {
              label: "Фамилия",
              value: "Василёк",
              name: "second_name",
              ref: "second_nameInput",
              onInput: (event) => {
                this.getForm().fields.second_nameInput.check(event).setValue(event);
              },
              onBlur: (event) => {
                this.getForm().fields.second_nameInput.check(event).setValue(event);
              },
            },
            {
              label: "Имя в чате",
              value: "Вася Василёк",
              name: "display_name",
              ref: "display_nameInput",
              onInput: (event) => {
                this.getForm().fields.display_nameInput.setValue(event);
              },
              onBlur: (event) => {
                this.getForm().fields.display_nameInput.setValue(event);
              },
            },
            {
              label: "Телефон",
              value: "+79099673030",
              name: "phone",
              type: "tel",
              ref: "phoneInput",
              onInput: (event) => {
                this.getForm().fields.phoneInput.check(event).setValue(event);
              },
              onBlur: (event) => {
                this.getForm().fields.phoneInput.check(event).setValue(event);
              },
            },
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        button: new Button({ value: "Изменить данные", className: "btn-primary btn-block" }),
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
