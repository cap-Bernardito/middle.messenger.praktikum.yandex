import { chatLib } from "pages/messenger/chat/model/lib";

import { apiHasError } from "shared/utils";

import { chatMenuApi, SearchUserRequestData } from "../api";

import { getUsers } from "./getUsers";

export const deleteUser: DispatchStateHandler<SearchUserRequestData & { chatId: number }> = async (
  dispatch,
  _state,
  action
) => {
  dispatch(chatLib.setChat({ loading: true }));

  const { chatId, login } = action;
  const response = await chatMenuApi.searchUser({ login });

  if (apiHasError(response)) {
    dispatch(chatLib.setChat({ loading: false, error: response.reason }));

    return;
  }

  if (!response || response.length === 0) {
    dispatch(chatLib.setChat({ loading: false, error: "Пользователь не найден" }));

    return;
  }

  const responseUsers = await chatMenuApi.deleteUser({
    chatId,
    users: response.map((item) => item.id),
  });

  if (apiHasError(responseUsers)) {
    dispatch(chatLib.setChat({ loading: false, error: responseUsers.reason }));

    return;
  }

  dispatch(chatLib.setChat({ loading: false, error: null }));

  dispatch(getUsers, { id: chatId });
};
