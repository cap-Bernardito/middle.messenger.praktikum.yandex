import { chatModel } from "pages/messenger/chat";
import { chatsModel } from "pages/messenger/chats";

import { Overlay } from "entities";

import { apiHasError } from "shared/utils";

import { chatMenuApi, SearchUserRequestData } from "../api";
import { chatMenuServices } from "..";

export const addUser = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: SearchUserRequestData & { chatId: number }
) => {
  dispatch(chatModel.setChat({ loading: true }));

  const { chatId, login } = action;
  const response = await chatMenuApi.searchUser({ login });

  if (apiHasError(response)) {
    dispatch(chatModel.setChat({ loading: false, error: response.reason }));

    return;
  }

  if (response.length === 0) {
    dispatch(chatModel.setChat({ loading: false, error: "Пользователь не найден" }));

    return;
  }

  const responseUsers = await chatMenuApi.addUser({
    chatId,
    users: response.map((item) => item.id),
  });

  if (apiHasError(responseUsers)) {
    dispatch(chatModel.setChat({ loading: false, error: responseUsers.reason }));

    return;
  }

  dispatch(chatsModel.setChats({ loading: false, error: null }));

  dispatch(chatMenuServices.getUsers, { id: chatId });

  const overlay = new Overlay();

  overlay.closeWidgets();
};
