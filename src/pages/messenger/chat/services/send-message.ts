import { TChat } from "pages/messenger/chats/types";

import WSTransport from "shared/utils/ws-transport";

import { getWS } from "./get-ws";

type sendMessagePayload = {
  chatId: TChat["id"];
  message: string;
};

export const sendMessage: DispatchStateHandler<sendMessagePayload> = async (_dispatch, _state, { chatId, message }) => {
  if (!chatId) {
    return;
  }

  const socket = (await getWS(chatId)) as WSTransport;

  if (!socket) {
    return;
  }

  socket.sendText({
    type: "message",
    content: message,
  });
};
