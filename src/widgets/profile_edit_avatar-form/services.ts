import { authModel } from "processes/auth";

import { profileEditAvatarAPI } from "widgets/profile_edit_avatar-form";

import { transformUser, UserDTO } from "shared/api";
import { apiHasError } from "shared/utils";

export const profileEditAvatar = async (dispatch: Dispatch<AppState>, state: AppState, action: FormData) => {
  dispatch(authModel.setUser({ loading: true }));

  const response = await profileEditAvatarAPI(action);

  if (apiHasError(response)) {
    dispatch(authModel.setUser({ user: null, loading: false, error: response.reason }));

    return;
  }

  dispatch(authModel.setUser({ user: transformUser(response as UserDTO), loading: false, error: null }));
};
