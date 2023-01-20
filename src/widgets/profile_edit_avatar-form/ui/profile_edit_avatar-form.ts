import { store } from "app/store";

import { FormWithAuth } from "widgets/form-with-auth";
import { profileEditAvatar } from "widgets/profile_edit_avatar-form";

import { TFormProps } from "entities/form";

import { Input, TInputProps } from "shared/ui";

export function ProfileEditAvatarForm(
  this: {
    getRefs: () => TRefs;
  },
  getForm: (refs: TRefs) => TFormPartials,
  props: Omit<TFormProps, "fields">
) {
  return new FormWithAuth({
    onSubmit: (event) => {
      const { isFormValid } = getForm(this.getRefs()).form.check(event, Object.values(getForm(this.getRefs()).fields));

      const formInDOM = getForm(this.getRefs()).form.getContent();

      if (isFormValid) {
        store.dispatch(profileEditAvatar, new FormData(formInDOM));
      }
    },
    ...props,
    fields: (
      [
        {
          label: "Выбрать файл на компьютере",
          placeholder: "Выбрать файл на компьютере",
          name: "avatar",
          type: "file",
          className: "form-control_file",
          required: true,
          ref: "fileInput",
          onBlur: (event) => {
            getForm(this.getRefs()).fields.fileInput.setValue(event);
          },
        },
      ] as TInputProps[]
    ).map((inputProps) => new Input(inputProps)),
  } as TFormProps);
}
