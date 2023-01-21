import { authAPI, authModel, authTypes } from "processes/auth";

import { transformUser } from "shared/api";
import { router } from "shared/core";
import { apiHasError } from "shared/utils";

import { logout } from "./logout";

export const login = async (dispatch: Dispatch<AppState>, state: AppState, action: authTypes.LoginRequestData) => {
  dispatch(authModel.setUser({ loading: true }));

  const response = await authAPI.login(action);

  if (apiHasError(response)) {
    dispatch(authModel.setUser({ user: null, loading: false, error: response.reason }));

    return;
  }

  const responseUser = await authAPI.me();

  if (apiHasError(response)) {
    dispatch(logout);

    return;
  }

  dispatch(authModel.setUser({ user: transformUser(responseUser as authTypes.UserDTO), loading: false, error: null }));

  router.restart();
};
