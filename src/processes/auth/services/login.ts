import { authModel } from "processes/auth";
import { authAPI } from "processes/auth/api";
import { authTypes } from "processes/auth/types";

import { transformUser } from "shared/api";
import { router } from "shared/core/router/router";
import { apiHasError } from "shared/utils";

import { logout } from "./logout";

export const login: DispatchStateHandler<authTypes.LoginRequestData> = async (dispatch, _state, action) => {
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
