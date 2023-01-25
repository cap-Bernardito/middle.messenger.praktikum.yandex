import { chatModel } from "pages/messenger/chat";
import { chatsAPI, chatsModel, chatsServices, chatsTypes } from "pages/messenger/chats";

import { Overlay } from "entities";

import { transformChats } from "shared/api";
import { apiHasError } from "shared/utils";

export const createChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: chatsTypes.createChatRequestData
) => {
  dispatch(chatModel.setChat({ loading: true }));

  const response = await chatsAPI.createChat(action);

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

  dispatch(chatsServices.selectChat, response?.id);

  const overlay = new Overlay();

  overlay.closeWidgets();
};
