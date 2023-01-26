import { chatModel } from "pages/messenger/chat";
import { chatsAPI, chatsModel, chatsTypes } from "pages/messenger/chats";

import { transformChat, transformChats } from "shared/api";
import { apiHasError } from "shared/utils";

import { chatMenuApi } from "../api";

export const chatEditAvatar = async (dispatch: Dispatch<AppState>, state: AppState, action: FormData) => {
  dispatch(chatModel.setChat({ loading: true }));

  const response = await chatMenuApi.editAvatar(action);

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

  dispatch(
    chatModel.setChat({ loading: false, error: null, chatData: transformChat(response as chatsTypes.TChatDTO) })
  );
};
