import { chatLib } from "pages/messenger/chat/model/lib";
import { chatsModel } from "pages/messenger/chats";
import { chatsAPI } from "pages/messenger/chats/api";
import { chatsTypes } from "pages/messenger/chats/types";

import { transformChat, transformChats } from "shared/api";
import { apiHasError } from "shared/utils";

import { chatMenuApi } from "../api";

export const chatEditAvatar: DispatchStateHandler<FormData> = async (dispatch, _state, action) => {
  dispatch(chatLib.setChat({ loading: true }));

  const response = await chatMenuApi.editAvatar(action);

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
  dispatch(chatsModel.setChats({ chats: null }));

  dispatch(chatsModel.setChats({ chats: transformChats(responseChats as chatsTypes.TChatDTO[]) }));

  dispatch(chatLib.setChat({ loading: false, error: null, chatData: transformChat(response as chatsTypes.TChatDTO) }));
};
