import { chatMenuApi, SearchUserRequestData } from "widgets/chat-menu/api";
import { searchUsersLib } from "widgets/list-with-search-users/model/lib";

import { apiHasError } from "shared/utils";

export const searchUsers: DispatchStateHandler<SearchUserRequestData> = async (dispatch, _state, action) => {
  dispatch(searchUsersLib.setSearchUsers({ loading: true, users: null }));

  const { login } = action;
  const response = await chatMenuApi.searchUser({ login });

  if (apiHasError(response)) {
    dispatch(searchUsersLib.setSearchUsers({ loading: false, error: response.reason, users: null }));

    return;
  }

  if (!response || response.length === 0) {
    dispatch(searchUsersLib.setSearchUsers({ loading: false, error: "Пользователь не найден", users: null }));

    return;
  }

  dispatch(searchUsersLib.setSearchUsers({ loading: false, error: null, users: response }));
};
