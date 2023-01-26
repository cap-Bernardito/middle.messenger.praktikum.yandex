import { TChat } from "pages/messenger/chats/types";

import WSTransport from "shared/utils/ws-transport";

import { getWS } from "./get-ws";

type loadMessagesPayload = {
  chatId: TChat["id"];
  offset: number; // Число, которое показывает с какого сообщения нужно отдать ещё 20
};

export const loadMessages = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  { chatId, offset = 0 }: loadMessagesPayload
) => {
  if (!chatId) {
    return;
  }

  const socket = (await getWS(chatId)) as WSTransport;

  if (!socket) {
    return;
  }

  socket.sendText({
    type: "get old",
    content: String(offset),
  });
};
