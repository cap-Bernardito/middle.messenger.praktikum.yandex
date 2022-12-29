import { Block } from "shared/core";

import source from "./messages-body.hbs";

import "./messages-body.scss";

type TMessagesBodyProps = {
  messages: Block[];
  placeholder?: string;
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
