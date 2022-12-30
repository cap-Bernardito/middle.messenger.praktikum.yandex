import { Block } from "shared/core";

import source from "./textarea.hbs";

import "./textarea.scss";

export type TTextareaProps = TPropsWithRef<{
  name: string;
  value?: string;
  placeholder?: string;
  className?: string;
  classNameTextarea?: string;
  onInput?: (event: Event) => void;
  onBlur?: (event: Event) => void;
  onFocus?: (event: Event) => void;
}>;

export class Textarea extends Block<TTextareaProps> {
  static cName = "Textarea";

  constructor({ ...props }: TTextareaProps) {
    super(props);
  }

  render() {
    return source;
  }
}
