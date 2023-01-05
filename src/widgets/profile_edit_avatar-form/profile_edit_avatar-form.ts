import { Form, TFormProps } from "entities/form";

import { Input, TInputProps } from "shared/ui";

export function ProfileEditAvatarForm(
  this: {
    getRefs: () => TRefs;
  },
  getForm: (refs: TRefs) => TFormPartials,
  props: Omit<TFormProps, "fields">
) {
  return new Form({
    onSubmit: (event) => {
      const { isFormValid, formData } = getForm(this.getRefs()).form.check(
        event,
        Object.values(getForm(this.getRefs()).fields)
      );

      console.log(`Form is${isFormValid ? "" : " not"} valid. FormData: `, formData);
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
  });
}
