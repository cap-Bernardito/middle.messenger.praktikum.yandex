import { Block } from "shared/core";

import source from "./textarea-field.hbs";

type TTextareaFieldProps = TPropsWithEvents<
  TPropsWithRef<{
    name: string;
    value?: string;
    placeholder?: string;
    className?: string;
    classNameTextarea?: string;
    onInput?: (event: Event) => void;
    onBlur?: (event: Event) => void;
    onFocus?: (event: Event) => void;
  }>
>;

export class TextareaField extends Block<TTextareaFieldProps> {
  static cName = "TextareaField";

  constructor({ onInput, onFocus, onBlur, ...props }: TTextareaFieldProps) {
    super({
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
