import { TChat } from "pages/messenger/chats/types";

export type TChatsState = {
  chats: TNullable<TChat[]>;
  loading: boolean;
  error: TNullable<string>;
  activeChat: TNullable<number>;
};

export const chatsState: TChatsState = {
  chats: null,
  loading: false,
  error: null,
  activeChat: null,
};
