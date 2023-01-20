import { authAPI, authModel, authTypes } from "processes/auth";

import { transformUser } from "shared/api";
import { UserDTO } from "shared/api/types";
import { router } from "shared/core";
import { apiHasError } from "shared/utils";

import { logout } from "./logout";

export const register = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: authTypes.RegisterRequestData
) => {
  dispatch(authModel.setUser({ loading: true }));

  const response = await authAPI.register(action);

  if (apiHasError(response)) {
    dispatch(authModel.setUser({ user: null, loading: false, error: response.reason }));

    return;
  }

  const responseUser = await authAPI.me();

  if (apiHasError(response)) {
    dispatch(logout);

    return;
  }

  dispatch(authModel.setUser({ user: transformUser(responseUser as UserDTO), loading: false, error: null }));

  router.restart();
};
