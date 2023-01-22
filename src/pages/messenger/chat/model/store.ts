import { TChat } from "pages/messenger/chats/types";

export type TChatState = {
  chatData: TNullable<TChat>;
  users: number;
  loading: boolean;
  error: TNullable<string>;
};

export const chatState: TChatState = {
  chatData: null,
  users: 0,
  loading: false,
  error: null,
};
