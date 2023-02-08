import { authTypes } from "processes/auth/types";

import { chatTypes } from "pages/messenger/chat/types";
import { chatsTypes } from "pages/messenger/chats/types";

export type TChatState = {
  chatData: TNullable<chatsTypes.TChat>;
  users: TNullable<authTypes.UserDTO[]>;
  loading: boolean;
  error: TNullable<string>;
};

export type TDialog = {
  error: TNullable<string>;
  loading: boolean;
  data?: TNullable<chatTypes.TDialogMessage[]>;
};

export type TDialogsState = {
  [chatId: string]: TNullable<TDialog>;
};

export const chatState: TChatState = {
  chatData: null,
  users: null,
  loading: false,
  error: null,
};

export const dialogsState: TDialogsState = {};
