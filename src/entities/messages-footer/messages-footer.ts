import { Block } from "shared/core";
import { TButtonProps, TTextareaProps } from "shared/ui";
import { formProcess } from "shared/utils/form-processing";

import source from "./messages-footer.hbs";

import "./messages-footer.scss";

export type TMessagesFooterProps = TPropsWithEvents<
  TPropsWithRef<{
    file: string;
    text: Block<TTextareaProps>;
    button: Block<TButtonProps>;
    onSubmit?: (event: Event) => void;
  }>
>;

export class MessagesFooter extends Block<TMessagesFooterProps> {
  static cName = "MessagesFooter";

  constructor({ onSubmit, ...props }: TMessagesFooterProps) {
    super({
      ...props,
      events: {
        submit: onSubmit,
      },
    });
  }

  check(event: Event, fields: TFormFields[]) {
    return formProcess.form.check(event, fields);
  }

  render() {
    return source;
  }
}
