import { authModel } from "processes/auth";
import { authAPI } from "processes/auth/api";
import { authTypes } from "processes/auth/types";

import { transformUser } from "shared/api";
import { apiHasError } from "shared/utils";

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    dispatch(authModel.setUser({ loading: true }));

    const response = await authAPI.me();

    if (apiHasError(response)) {
      dispatch(authModel.setUser({ user: null, loading: false }));

      return;
    }

    dispatch(authModel.setUser({ user: transformUser(response as authTypes.UserDTO), loading: false }));
  } catch (err) {
    dispatch(authModel.setUser({ user: null, loading: false }));

    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
