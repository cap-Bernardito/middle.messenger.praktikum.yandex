import { Modal } from "entities";

import { Block } from "shared/core";

import source from "./messages-header.hbs";

import "./messages-header.scss";

export type TMessagesHeaderProps = {
  left: Block | string;
  right: Block | string;
  modals: Modal[];
};

export class MessagesHeader extends Block<TMessagesHeaderProps> {
  static cName = "MessagesHeader";

  constructor({ ...props }: TMessagesHeaderProps) {
    super({
      ...props,
    });
  }

  render() {
    return source;
  }
}
