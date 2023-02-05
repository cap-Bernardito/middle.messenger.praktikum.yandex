import { chatsTypes } from "pages/messenger/chats/types";

import { APIError, request } from "shared/api";
import WSTransport from "shared/utils/ws-transport";

export type TWSRequest = {
  userId: number;
  chatId: chatsTypes.TChat["id"];
  token: string;
};

export const chatAPI = {
  getToken: (id: chatsTypes.TChat["id"]) => request.post<{ token: string } | APIError>(`chats/token/${id}`),

  getWS: ({ userId, chatId, token }: TWSRequest) =>
    new WSTransport(`${process.env.WSS_ENDPOINT}/chats/${userId}/${chatId}/${token}`),
};
