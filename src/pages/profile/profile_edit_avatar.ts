import { Form } from "entities/form_block";
import { templateUserInfo, TUserInfoProps } from "entities/user-info_block";

import { Block, registerComponent } from "shared/core";
import { Avatar } from "shared/ui/avatar_block";
import { Button } from "shared/ui/button_block";
import { Input, TInputProps } from "shared/ui/input_block";
import { formProcess } from "shared/utils/form-processing";

export class ProfileAvatarPage extends Block<TUserInfoProps> {
  static cName = "ProfileAvatarPage";

  constructor() {
    super({
      avatar: new Avatar(),
      info: new Form({
        title: "Загрузите файл",
        onSubmit: (event) => {
          const { isFormValid, formData } = formProcess.form.check(event, Object.values(this.getFormInputs()));

          console.log(`Form is${isFormValid ? "" : " not"} valid. FormData: `, formData);
        },
        ref: "form",
        fields: (
          [
            {
              label: "Выбрать файл на компьютере",
              name: "avatar",
              type: "file",
              className: "form-control_file",
              ref: "fileInput",
              onBlur: (event) => {
                formProcess.field.setValue(event, this.getFormInputs().fileInput);
              },
            },
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        button: new Button({ value: "Поменять", className: "btn-primary btn-block" }),
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

registerComponent(ProfileAvatarPage);
