import { Block } from "shared/core";
import { formProcess } from "shared/utils/form-processing";

import source from "./input.hbs";

import "./input.scss";

export type TInputProps = TPropsWithRef<{
  check?: boolean;
  label?: string;
  name: string;
  type?: "text" | "number" | "password" | "email" | "tel" | "file" | "hidden";
  id?: string;
  value?: string | number;
  placeholder?: string;
  className?: string;
  classNameInput?: string;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
  onInput?: (event: Event) => void;
  onBlur?: (event: Event) => void;
  onFocus?: (event: Event) => void;
}>;

export class Input extends Block<TInputProps> {
  static cName = "Input";

  constructor({ type = "text", name, id, check = true, ...props }: TInputProps) {
    const inputId = id ? id : name;

    super({ type, name, id: inputId, check, ...props });
  }

  check(event: Event) {
    formProcess.field.check(event, this);

    return this;
  }

  setValue(event: Event) {
    formProcess.field.setValue(event, this);

    return this;
  }

  render() {
    return source;
  }
}
