import { chatModel, chatServices } from "pages/messenger/chat";
import { chatsAPI, chatsModel, chatsServices, chatsTypes } from "pages/messenger/chats";

import { Overlay } from "entities";

import { transformChats } from "shared/api";
import { apiHasError } from "shared/utils";

export const createChat: DispatchStateHandler<chatsTypes.createChatRequestData> = async (dispatch, _state, action) => {
  dispatch(chatModel.setChat({ loading: true }));

  const responseChat = await chatsAPI.createChat(action);

  if (apiHasError(responseChat)) {
    dispatch(chatModel.setChat({ loading: false, error: responseChat.reason }));

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

  dispatch(chatsServices.selectChat, responseChat?.id);

  dispatch(chatServices.loadMessages, { chatId: responseChat?.id });

  const overlay = new Overlay();

  overlay.closeWidgets();
};
