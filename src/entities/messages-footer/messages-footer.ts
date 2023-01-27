import { Form } from "entities";

import { Block } from "shared/core";
import { Button, Textarea } from "shared/ui";
import { formProcess } from "shared/utils/form-processing";

import source from "./messages-footer.hbs";

import "./messages-footer.scss";

export type TMessagesFooterProps = TPropsWithEvents<
  TPropsWithRef<{
    file: string;
    text: Textarea;
    button: Button;
    onSubmit?: (event: Event) => void;
    onKeydown?: (event: KeyboardEvent) => void;
  }>
>;

export class MessagesFooter extends Block<TMessagesFooterProps> {
  static cName = "MessagesFooter";

  static isForm(block: Block | undefined): block is Form {
    return block instanceof MessagesFooter;
  }

  constructor({ onSubmit, onKeydown, ...props }: TMessagesFooterProps) {
    super({
      ...props,
      events: {
        submit: onSubmit,
        // @ts-ignore
        keydown: onKeydown,
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
