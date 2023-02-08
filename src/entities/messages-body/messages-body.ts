import { TDialog } from "pages/messenger/chat/model/store";

import { Block } from "shared/core";
import { Message } from "shared/ui";

import source from "./messages-body.hbs";

import "./messages-body.scss";

export type TMessagesBodyProps = {
  messages: Message[];
  placeholder?: string;
  dialog: TDialog;
};

export class MessagesBody extends Block<TMessagesBodyProps> {
  static cName = "MessagesBody";

  constructor({ placeholder = "Тут пока ничего нет", ...props }: TMessagesBodyProps) {
    super({
      placeholder,
      ...props,
    });
  }

  render() {
    return source;
  }
}
