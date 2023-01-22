import { chatsTypes } from "pages/messenger/chats";

import { APIError, request } from "shared/api";

export type DeleteChatRequestData = {
  chatId: string;
};

export const chatMenuApi = {
  editAvatar: (data: FormData) =>
    request.put<chatsTypes.TChatDTO | APIError>("chats/avatar", {
      body: data,
      headers: {},
    }),

  deleteChat: (data: DeleteChatRequestData) => request.delete<chatsTypes.ResponseData | APIError>("chats", { data }),
};
