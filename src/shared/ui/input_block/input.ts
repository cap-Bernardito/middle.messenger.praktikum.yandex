import { Block, registerComponent } from "shared/core";

import source from "./input.hbs";

import "./input.scss";

export type TInputProps = {
  label: string;
  name: string;
  type?: "text" | "number" | "password" | "email" | "tel" | "file";
  value?: string;
  placeholder?: string;
  className?: string;
  classNameInput?: string;
};

export class Input extends Block<TInputProps> {
  static cName = "Input";

  constructor({
    label = "",
    name = "",
    type = "text",
    value = "",
    placeholder = "",
    className = "",
    classNameInput = "",
  }: TInputProps) {
    super({ label, name, type, value, placeholder, className, classNameInput });
  }

  render() {
    return source;
  }
}

registerComponent(Input);
