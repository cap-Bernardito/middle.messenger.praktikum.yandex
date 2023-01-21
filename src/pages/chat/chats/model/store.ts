import { TChat } from "pages/chat/chats/types";

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
