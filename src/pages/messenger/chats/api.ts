import { chatsTypes } from "pages/messenger/chats/types";

import { APIError, request } from "shared/api";

export const chatsAPI = {
  getChats: () => request.get<chatsTypes.TChatDTO[] | APIError>("chats"),

  createChat: (data: chatsTypes.createChatRequestData) =>
    request.post<{ id: chatsTypes.TChat["id"] }>("chats", { data }),
};
