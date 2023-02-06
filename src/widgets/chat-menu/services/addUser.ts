import { chatModel } from "pages/messenger/chat";

import { apiHasError } from "shared/utils";

import { chatMenuApi, SearchUserRequestData } from "../api";
import { chatMenuServices } from "..";

export const addUser: DispatchStateHandler<SearchUserRequestData & { chatId: number }> = async (
  dispatch,
  _state,
  action
) => {
  dispatch(chatModel.setChat({ loading: true }));

  const { chatId, login } = action;
  const response = await chatMenuApi.searchUser({ login });

  if (apiHasError(response)) {
    dispatch(chatModel.setChat({ loading: false, error: response.reason }));

    return;
  }

  if (!response || response.length === 0) {
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

  dispatch(chatModel.setChat({ loading: false, error: null }));

  dispatch(chatMenuServices.getUsers, { id: chatId });
};
