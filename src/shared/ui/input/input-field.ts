import { Block } from "shared/core";

import source from "./input-field.hbs";

type TInputFieldProps = TPropsWithEvents<{
  onInput?: (event: Event) => void;
  onFocus?: (event: Event) => void;
  onBlur?: (event: Event) => void;
  id: string;
  type?: "text" | "number" | "password" | "email" | "tel" | "file";
  value?: string;
  placeholder?: string;
  classNameInput?: string;
  required?: boolean;
  disabled?: boolean;
}>;

export class InputField extends Block<TInputFieldProps> {
  static cName = "InputField";

  constructor({ type = "text", onInput, onFocus, onBlur, ...props }: TInputFieldProps) {
    super({
      type,
      ...props,
      events: {
        input: onInput,
        focus: onFocus,
        blur: onBlur,
      },
    });
  }

  render() {
    return source;
  }
}
