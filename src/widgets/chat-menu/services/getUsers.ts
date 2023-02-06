import { authTypes } from "processes/auth";

import { chatLib } from "pages/messenger/chat/model/lib";

import { apiHasError } from "shared/utils";

import { chatMenuApi, GetUserRequestData } from "../api";

export const getUsers: DispatchStateHandler<GetUserRequestData> = async (dispatch, _state, action) => {
  const response = await chatMenuApi.getUser(action);

  if (apiHasError(response)) {
    dispatch(chatLib.setChat({ error: response.reason }));

    return;
  }

  if (!response) {
    dispatch(chatLib.setChat({ error: null }));

    return;
  }

  dispatch(chatLib.setChat({ users: (response as authTypes.UserDTO[]).length, error: null }));
};
