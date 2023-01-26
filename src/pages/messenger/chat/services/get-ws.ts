import { authModel } from "processes/auth";

import { store } from "app/store";

import { chatAPI, chatModel } from "pages/messenger/chat";
import { chatTypes, chatUtils } from "pages/messenger/chat";
import { chatsTypes } from "pages/messenger/chats";

import { apiHasError } from "shared/utils";
import WSTransport from "shared/utils/ws-transport";

let sockets: Record<chatsTypes.TChat["id"], WSTransport> = {};

export const getWS = async (chatId: chatsTypes.TChat["id"] | "all") => {
  if (!chatId) {
    return;
  }

  if (chatId === "all") {
    return sockets;
  }

  if (sockets[chatId]) {
    return sockets[chatId].getSocket();
  }

  const { user } = authModel.selectUser();

  if (!user) {
    return;
  }

  const responseToken = await chatAPI.getToken(chatId);

  if (!responseToken) {
    return;
  }

  if (apiHasError(responseToken)) {
    store.dispatch(chatModel.setDialog(chatId, { data: null, loading: false, error: responseToken.reason }));

    return;
  }

  const responseWSTransport = await chatAPI.getWS({ chatId: chatId, userId: user.id, token: responseToken.token });

  responseWSTransport.connect();

  responseWSTransport
    .on(WSTransport.EVENTS.CONNECTING, () => {
      store.dispatch(chatModel.setDialog(chatId, { loading: true, error: null }));
    })
    .on(WSTransport.EVENTS.OPEN, () => {
      store.dispatch(chatModel.setDialog(chatId, { loading: false, error: null }));
    })
    .on(WSTransport.EVENTS.GOT_MESSAGE, (messages) => {
      let normalizedMessages;

      if (Array.isArray(messages)) {
        normalizedMessages = chatUtils.transformMessages(messages, user);
      } else {
        if (messages.type === "user connected") {
          return;
        }

        normalizedMessages = [chatUtils.transformMessage(messages, user)];
      }

      store.dispatch(
        chatModel.setDialog(chatId, {
          data: normalizedMessages as chatTypes.TDialogMessage[],
          loading: false,
          error: null,
        })
      );
    })
    .on(WSTransport.EVENTS.CLOSED, () => {
      store.dispatch(chatModel.setDialog(chatId, { data: null, loading: false, error: null }));
      sockets = {};
    });

  sockets[chatId] = responseWSTransport;

  return sockets[chatId].getSocket();
};
