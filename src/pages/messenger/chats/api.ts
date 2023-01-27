import { chatsTypes } from "pages/messenger/chats";

import { APIError, request } from "shared/api";

import { TChat } from "./types";

export const chatsAPI = {
  getChats: () => request.get<chatsTypes.TChatDTO[] | APIError>("chats"),

  createChat: (data: chatsTypes.createChatRequestData) => request.post<{ id: TChat["id"] }>("chats", { data }),
};
