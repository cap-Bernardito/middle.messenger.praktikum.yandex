import { chatLib } from "pages/messenger/chat/model/lib";
import { chatsModel } from "pages/messenger/chats";
import { chatsAPI } from "pages/messenger/chats/api";
import { chatsTypes } from "pages/messenger/chats/types";

import { Overlay } from "entities";

import { transformChats } from "shared/api";
import { router } from "shared/core/router/router";
import { apiHasError } from "shared/utils";
import { ROUTES } from "shared/utils/constants";

import { chatMenuApi, DeleteChatRequestData } from "../api";

export const deleteChat: DispatchStateHandler<DeleteChatRequestData> = async (dispatch, _state, action) => {
  dispatch(chatLib.setChat({ loading: true }));

  const response = await chatMenuApi.deleteChat(action);

  if (apiHasError(response)) {
    dispatch(chatLib.setChat({ loading: false, error: response.reason }));

    return;
  }

  const responseChats = await chatsAPI.getChats();

  if (apiHasError(responseChats)) {
    dispatch(chatLib.setChat({ loading: false, error: responseChats.reason }));

    return;
  }

  // В пропсах компонента рекурсивный мердж, потому сперва очищаем перед получением новых чатов
  dispatch(chatsModel.setChats({ chats: null, activeChat: null }));

  dispatch(chatsModel.setChats({ chats: transformChats(responseChats as chatsTypes.TChatDTO[]) }));

  dispatch(chatLib.setChat({ loading: false, error: null, users: null, chatData: null }));

  const overlay = new Overlay();

  overlay.closeWidgets();

  router.go(ROUTES.messenger.path, false);
};
