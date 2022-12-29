import { Block } from "shared/core";

import source from "./messages.hbs";

import "./messages.scss";

export type TMessagesProps = {
  header: Block | string;
  body: Block | string;
  footer: Block | string;
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
