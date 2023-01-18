import { authAPI, authModel } from "processes/auth";

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch(authModel.setUser({ loading: true }));

  await authAPI.logout();

  dispatch(authModel.setUser({ user: null, loading: false }));
};
