import { MessagesFooter, MessagesHeader } from "entities";

import { Block } from "shared/core";

import source from "./messages.hbs";

import "./messages.scss";

export type TMessagesProps = TPropsWithRef<{
  header: TFnProps<TNullable<MessagesHeader | string>>;
  body: TFnProps<Block | string>;
  footer: MessagesFooter | string;
  placeholder?: TFnProps<Block | string | false>;
}>;

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
