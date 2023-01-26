import { chatModel } from "pages/messenger/chat";

import { Block } from "shared/core";
import { Message } from "shared/ui";

import source from "./messages-body.hbs";

import "./messages-body.scss";

export type TMessagesBodyProps = {
  messages: Message[];
  placeholder?: string;
  dialog: chatModel.TDialog;
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
