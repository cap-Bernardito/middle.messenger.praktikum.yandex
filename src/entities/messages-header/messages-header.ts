import { UserCard } from "entities";

import { Block } from "shared/core";

import source from "./messages-header.hbs";

import "./messages-header.scss";

export type TMessagesHeaderProps = {
  left: UserCard | string;
  right: Block | string;
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
