import { chatsTypes } from "pages/messenger/chats";

import { APIError, request } from "shared/api";

export const chatsAPI = {
  getChats: () => request.get<chatsTypes.TChatDTO[] | APIError>("chats"),

  createChat: (data: chatsTypes.createChatRequestData) => request.post<chatsTypes.ResponseData>("chats", { data }),
};
