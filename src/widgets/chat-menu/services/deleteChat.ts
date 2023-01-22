import { chatModel } from "pages/messenger/chat";
import { chatsAPI, chatsModel, chatsTypes } from "pages/messenger/chats";

import { Overlay } from "entities";

import { transformChats } from "shared/api";
import { router } from "shared/core";
import { apiHasError } from "shared/utils";
import { ROUTES } from "shared/utils/constants";

import { chatMenuApi, DeleteChatRequestData } from "../api";

export const deleteChat = async (dispatch: Dispatch<AppState>, state: AppState, action: DeleteChatRequestData) => {
  dispatch(chatModel.setChat({ loading: true }));

  const response = await chatMenuApi.deleteChat(action);

  if (apiHasError(response)) {
    dispatch(chatModel.setChat({ loading: false, error: response.reason }));

    return;
  }

  const responseChats = await chatsAPI.getChats();

  if (apiHasError(responseChats)) {
    dispatch(chatModel.setChat({ loading: false, error: responseChats.reason }));

    return;
  }

  // В пропсах компонента рекурсивный мердж, потому сперва очищаем перед получением новых чатов
  dispatch(chatsModel.setChats({ chats: null }));

  dispatch(chatsModel.setChats({ chats: transformChats(responseChats as chatsTypes.TChatDTO[]) }));

  dispatch(chatModel.setChat({ loading: false, error: null }));

  const overlay = new Overlay();

  overlay.closeWidgets();

  router.go(ROUTES.messenger.path, true);
};
