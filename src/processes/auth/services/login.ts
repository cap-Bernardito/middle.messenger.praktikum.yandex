import { authAPI, authModel } from "processes/auth";

import { transformUser } from "shared/api";
import { UserDTO } from "shared/api/types";
import { apiHasError } from "shared/utils";

import { logout } from "./logout";

type LoginPayload = {
  login: string;
  password: string;
};

export const login = async (dispatch: Dispatch<AppState>, state: AppState, action: LoginPayload) => {
  dispatch(authModel.setUser({ loading: true }));

  const response = await authAPI.login(action);

  if (apiHasError(response)) {
    dispatch(authModel.setUser({ user: null, loading: false, error: response.reason }));

    return;
  }

  const responseUser = await authAPI.me();

  dispatch(authModel.setUser({ loading: false, error: null }));

  if (apiHasError(response)) {
    dispatch(logout);

    return;
  }

  dispatch(authModel.setUser({ user: transformUser(responseUser as UserDTO), loading: false }));
};
