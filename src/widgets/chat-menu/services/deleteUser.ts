import { chatModel } from "pages/messenger/chat";

import { Overlay } from "entities";

import { apiHasError } from "shared/utils";

import { chatMenuApi, SearchUserRequestData } from "../api";

export const deleteUser = async (
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

  const responseUsers = await chatMenuApi.deleteUser({
    chatId,
    users: response.map((item) => item.id),
  });

  if (apiHasError(responseUsers)) {
    dispatch(chatModel.setChat({ loading: false, error: responseUsers.reason }));

    return;
  }

  dispatch(chatModel.setChat({ loading: false, error: null }));

  const overlay = new Overlay();

  overlay.closeWidgets();
};
