import { MessagesBody, MessagesFooter, MessagesHeader } from "entities";

import { Block } from "shared/core";

import source from "./messages.hbs";

import "./messages.scss";

export type TMessagesProps = {
  header: MessagesHeader | string;
  body: MessagesBody | string;
  footer: MessagesFooter | string;
};

export class Messages extends Block<TMessagesProps> {
  static cName = "Messages";

  constructor({ ...props }: TMessagesProps) {
    super({
      ...props,
    });
  }

  render() {
    return source;
  }
}

export { source as templateMessages };
