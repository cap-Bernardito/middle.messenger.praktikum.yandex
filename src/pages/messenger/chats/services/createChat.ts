import { chatLib } from "pages/messenger/chat/model/lib";
import { chatServices } from "pages/messenger/chat/services";
import { chatsModel } from "pages/messenger/chats";
import { chatsAPI } from "pages/messenger/chats/api";
import { selectChat } from "pages/messenger/chats/services/selectChat";
import { chatsTypes } from "pages/messenger/chats/types";

import { Overlay } from "entities";

import { transformChats } from "shared/api";
import { apiHasError } from "shared/utils";

export const createChat: DispatchStateHandler<chatsTypes.createChatRequestData> = async (dispatch, _state, action) => {
  dispatch(chatLib.setChat({ loading: true }));

  const responseChat = await chatsAPI.createChat(action);

  if (apiHasError(responseChat)) {
    dispatch(chatLib.setChat({ loading: false, error: responseChat.reason }));

    return;
  }

  const responseChats = await chatsAPI.getChats();

  if (apiHasError(responseChats)) {
    dispatch(chatLib.setChat({ loading: false, error: responseChats.reason }));

    return;
  }

  // В пропсах компонента рекурсивный мердж, потому сперва очищаем перед получением новых чатов
  dispatch(chatsModel.setChats({ chats: null }));

  dispatch(chatsModel.setChats({ chats: transformChats(responseChats as chatsTypes.TChatDTO[]) }));

  dispatch(chatLib.setChat({ loading: false, error: null }));

  dispatch(selectChat, responseChat?.id);

  dispatch(chatServices.loadMessages, { chatId: responseChat?.id });

  const overlay = new Overlay();

  overlay.closeWidgets();
};
