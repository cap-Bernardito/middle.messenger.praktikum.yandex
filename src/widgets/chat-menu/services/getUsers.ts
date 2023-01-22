import { authTypes } from "processes/auth";

import { chatModel } from "pages/messenger/chat";

import { apiHasError } from "shared/utils";

import { chatMenuApi, GetUserRequestData } from "../api";

export const getUsers = async (dispatch: Dispatch<AppState>, state: AppState, action: GetUserRequestData) => {
  const response = await chatMenuApi.getUser(action);

  if (apiHasError(response)) {
    dispatch(chatModel.setChat({ error: response.reason }));

    return;
  }

  dispatch(chatModel.setChat({ users: (response as authTypes.UserDTO[]).length, error: null }));
};
