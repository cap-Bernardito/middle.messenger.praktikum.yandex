import { authTypes } from "processes/auth";

import { chatsTypes } from "pages/messenger/chats";

import { APIError, request } from "shared/api";

export type DeleteChatRequestData = {
  chatId: string;
};

export type SearchUserRequestData = {
  login: string;
};

export type AddUserRequestData = {
  users: authTypes.User["id"][];
  chatId: chatsTypes.TChat["id"];
};

export const chatMenuApi = {
  editAvatar: (data: FormData) =>
    request.put<chatsTypes.TChatDTO | APIError>("chats/avatar", {
      body: data,
      headers: {},
    }),

  searchUser: (data: SearchUserRequestData) => request.post<authTypes.UserDTO[] | APIError>("user/search", { data }),

  addUser: (data: AddUserRequestData) => request.put<chatsTypes.ResponseData | APIError>("chats/users", { data }),

  deleteChat: (data: DeleteChatRequestData) => request.delete<chatsTypes.ResponseData | APIError>("chats", { data }),
};
