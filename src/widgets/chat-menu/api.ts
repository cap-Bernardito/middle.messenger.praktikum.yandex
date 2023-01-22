import { chatsTypes } from "pages/messenger/chats";

import { APIError, request } from "shared/api";

export const chatMenuApi = {
  editAvatar: (data: FormData) =>
    request.put<chatsTypes.TChatDTO | APIError>("chats/avatar", {
      body: data,
      headers: {},
    }),
};
