import { APIError, request } from "shared/api";

import { TChatDTO } from "./types";

export const chatsAPI = {
  getChats: () => request.get<TChatDTO[] | APIError>("chats"),
};
