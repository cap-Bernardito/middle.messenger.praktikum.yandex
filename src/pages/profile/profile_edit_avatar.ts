import { Form, templateUserInfo, TUserInfoProps } from "entities";

import { Block } from "shared/core";
import { Avatar, Button, Input, TInputProps } from "shared/ui";

export class ProfileAvatarPage extends Block<TUserInfoProps> {
  static cName = "ProfileAvatarPage";

  constructor() {
    super({
      avatar: new Avatar(),
      info: new Form({
        title: "Загрузите файл",
        onSubmit: (event) => {
          const { isFormValid, formData } = this.getForm().form.check(event, Object.values(this.getForm().fields));

          console.log(`Form is${isFormValid ? "" : " not"} valid. FormData: `, formData);
        },
        fields: (
          [
            {
              label: "Выбрать файл на компьютере",
              name: "avatar",
              type: "file",
              className: "form-control_file",
              ref: "fileInput",
              onBlur: (event) => {
                this.getForm().fields.fileInput.setValue(event);
              },
            },
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        button: new Button({ value: "Поменять", className: "btn-primary btn-block" }),
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
