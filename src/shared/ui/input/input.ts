import { Block } from "shared/core";
import { formProcess } from "shared/utils/form-processing";

import source from "./input.hbs";

import "./input.scss";

export type TInputProps = TPropsWithRef<{
  label: string;
  name: string;
  type?: "text" | "number" | "password" | "email" | "tel" | "file";
  id?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  classNameInput?: string;
  required?: boolean;
  disabled?: boolean;
  onInput?: (event: Event) => void;
  onBlur?: (event: Event) => void;
  onFocus?: (event: Event) => void;
}>;

export class Input extends Block<TInputProps> {
  static cName = "Input";

  constructor({ type = "text", name, id, ...props }: TInputProps) {
    const inputId = id ? id : name;

    super({ type, name, id: inputId, ...props });
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
