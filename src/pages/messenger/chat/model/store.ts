import { TChat } from "pages/messenger/chats/types";

export type TChatState = {
  chatData: TNullable<TChat>;
  users: number;
  loading: boolean;
  error: TNullable<string>;
};

export type TDialogMessage = {
  id: "number";
  chat_id: "number";
  time: "string";
  type: "string";
  user_id: "string";
  content: "string";
  file?: {
    id: "number";
    user_id: "number";
    path: "string";
    filename: "string";
    content_type: "string";
    content_size: "number";
    upload_date: "string";
  };
};
export type TDialog = {
  error: TNullable<string>;
  loading: boolean;
  data?: TNullable<TDialogMessage[]>;
};

export type TDialogsState = {
  [chatId: string]: TNullable<TDialog>;
};

export const chatState: TChatState = {
  chatData: null,
  users: 0,
  loading: false,
  error: null,
};

export const dialogsState: TDialogsState = {};
