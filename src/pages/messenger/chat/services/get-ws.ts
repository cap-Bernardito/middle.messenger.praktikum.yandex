import { authModel } from "processes/auth";

import { store } from "app/store";

import { chatAPI, chatModel } from "pages/messenger/chat";
import { TChat } from "pages/messenger/chats/types";

import { apiHasError } from "shared/utils";
import WSTransport from "shared/utils/ws-transport";

const sockets: Record<TChat["id"], WSTransport> = {};

export const getWS = async (chatId: TChat["id"]) => {
  if (!chatId) {
    return;
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
      store.dispatch(chatModel.setDialog(chatId, { data: messages, loading: false, error: null }));
    })
    .on(WSTransport.EVENTS.CLOSED, () => {
      store.dispatch(chatModel.setDialog(chatId, { loading: false, error: null }));
    });

  sockets[chatId] = responseWSTransport;

  return sockets[chatId].getSocket();
};
