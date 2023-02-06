import { authTypes } from "processes/auth";

import { chatModel } from "pages/messenger/chat";

import { apiHasError } from "shared/utils";

import { chatMenuApi, GetUserRequestData } from "../api";

export const getUsers: DispatchStateHandler<GetUserRequestData> = async (dispatch, _state, action) => {
  const response = await chatMenuApi.getUser(action);

  if (apiHasError(response)) {
    dispatch(chatModel.setChat({ error: response.reason }));

    return;
  }

  if (!response) {
    dispatch(chatModel.setChat({ error: null }));

    return;
  }

  dispatch(chatModel.setChat({ users: (response as authTypes.UserDTO[]).length, error: null }));
};
