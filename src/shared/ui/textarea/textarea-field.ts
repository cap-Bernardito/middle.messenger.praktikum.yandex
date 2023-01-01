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

    this.setProps({
      ...this.props,
      events: {
        ...this.props.events,
        input: (event) => {
          const field = event.target as HTMLTextAreaElement;

          field.setAttribute("rows", "1");

          const fieldHeight = field.scrollHeight;
          const lineHeight = Number.parseFloat(getComputedStyle(field).lineHeight);
          const estimatedRows = Math.ceil(fieldHeight / lineHeight - 1);

          field.setAttribute("rows", estimatedRows > 7 ? "7" : String(estimatedRows));
        },
      },
    });
  }

  render() {
    return source;
  }
}
