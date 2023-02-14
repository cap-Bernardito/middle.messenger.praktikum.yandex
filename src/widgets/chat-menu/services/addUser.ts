import { chatLib } from "pages/messenger/chat/model/lib";

import { apiHasError } from "shared/utils";

import { chatMenuApi } from "../api";

import { getUsers } from "./getUsers";

export const addUser: DispatchStateHandler<{ chatId: number; usersIds: number[] }> = async (
  dispatch,
  _state,
  action
) => {
  dispatch(chatLib.setChat({ loading: true }));

  const { chatId, usersIds } = action;
  const responseUsers = await chatMenuApi.addUser({
    chatId,
    users: usersIds,
  });

  if (apiHasError(responseUsers)) {
    dispatch(chatLib.setChat({ loading: false, error: responseUsers.reason }));

    return;
  }

  dispatch(chatLib.setChat({ loading: false, error: null }));

  dispatch(getUsers, { id: chatId });
};
