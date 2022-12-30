import { Block } from "shared/core";

import source from "./input.hbs";

import "./input.scss";

export type TInputProps = TPropsWithRef<{
  label: string;
  name: string;
  type?: "text" | "number" | "password" | "email" | "tel" | "file";
  value?: string;
  placeholder?: string;
  className?: string;
  classNameInput?: string;
  onInput?: (event: Event) => void;
  onBlur?: (event: Event) => void;
  onFocus?: (event: Event) => void;
}>;

export class Input extends Block<TInputProps> {
  static cName = "Input";

  constructor({ type = "text", ...props }: TInputProps) {
    super({ type, ...props });
  }

  render() {
    return source;
  }
}
