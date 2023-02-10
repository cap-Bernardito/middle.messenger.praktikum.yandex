import { authTypes } from "processes/auth/types";

import { chatsTypes } from "pages/messenger/chats/types";

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

export type GetUserRequestData = {
  id: chatsTypes.TChat["id"];
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
};

export const chatMenuApi = {
  editAvatar: (data: FormData) =>
    request.put<chatsTypes.TChatDTO | APIError>("chats/avatar", {
      body: data,
      headers: {},
    }),

  getUser: (options: GetUserRequestData) => {
    const { id, ...data } = options;

    return request.get<TNullable<authTypes.UserDTO[]> | APIError>(`chats/${id}/users`, { data });
  },

  searchUser: (data: SearchUserRequestData) => request.post<authTypes.UserDTO[] | APIError>("user/search", { data }),

  addUser: (data: AddUserRequestData) => request.put<chatsTypes.ResponseData | APIError>("chats/users", { data }),

  deleteUser: (data: AddUserRequestData) => request.delete<chatsTypes.ResponseData | APIError>("chats/users", { data }),

  deleteChat: (data: DeleteChatRequestData) => request.delete<chatsTypes.ResponseData | APIError>("chats", { data }),
};
