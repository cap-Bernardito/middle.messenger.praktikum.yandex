import { Block } from "shared/core";
import { formProcess } from "shared/utils/form-processing";

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
