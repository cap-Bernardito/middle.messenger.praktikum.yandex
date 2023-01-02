import { Block } from "shared/core";
import { TButtonProps } from "shared/ui";

import source from "./chat-toolbar.hbs";

import "./chat-toolbar.scss";

export type TChatToolbar = {
  controls: Block<TButtonProps>[];
};

export class ChatToolbar extends Block<TChatToolbar> {
  static cName = "ChatToolbar";

  constructor({ controls, ...props }: TChatToolbar) {
    super({ ...props, controls });
  }

  render() {
    return source;
  }
}
