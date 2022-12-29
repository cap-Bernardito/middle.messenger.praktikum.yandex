import { TMessagesBodyProps, TMessagesFooterProps, TMessagesHeaderProps } from "entities";

import { Block } from "shared/core";

import source from "./messages.hbs";

import "./messages.scss";

export type TMessagesProps = {
  header: Block<TMessagesHeaderProps> | string;
  body: Block<TMessagesBodyProps> | string;
  footer: Block<TMessagesFooterProps> | string;
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
