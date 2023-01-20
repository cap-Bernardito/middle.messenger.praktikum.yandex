import { authAPI, authModel, authTypes } from "processes/auth";

import { profileEditInfoAPI } from "widgets/profile_edit_info-form";

import { transformUser } from "shared/api";
import { UserDTO } from "shared/api/types";
import { apiHasError } from "shared/utils";

export const profileEditInfo = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: authTypes.RegisterRequestData
) => {
  dispatch(authModel.setUser({ loading: true }));

  const response = await profileEditInfoAPI(action);

  if (apiHasError(response)) {
    dispatch(authModel.setUser({ user: null, loading: false, error: response.reason }));

    return;
  }

  const responseUser = await authAPI.me();

  dispatch(authModel.setUser({ loading: false, error: null }));

  if (apiHasError(response)) {
    dispatch(authModel.setUser({ user: null, loading: false, error: response.reason }));

    return;
  }

  dispatch(authModel.setUser({ user: transformUser(responseUser as UserDTO), loading: false }));
};
