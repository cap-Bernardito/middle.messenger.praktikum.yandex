import { authAPI, authModel, authTypes } from "processes/auth";

import { ChangeUserInfoRequestData, profileEditInfoAPI } from "widgets/profile_edit_info-form";

import { transformUser } from "shared/api";
import { apiHasError } from "shared/utils";

export const profileEditInfo = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: ChangeUserInfoRequestData
) => {
  dispatch(authModel.setUser({ loading: true }));

  const response = await profileEditInfoAPI(action);

  if (apiHasError(response)) {
    dispatch(authModel.setUser({ user: null, loading: false, error: response.reason }));

    return;
  }

  const responseUser = await authAPI.me();

  if (apiHasError(response)) {
    dispatch(authModel.setUser({ user: null, loading: false, error: response.reason }));

    return;
  }

  dispatch(authModel.setUser({ user: transformUser(responseUser as authTypes.UserDTO), loading: false, error: null }));
};
