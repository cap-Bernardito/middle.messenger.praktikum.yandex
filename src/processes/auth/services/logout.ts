import { authAPI, authModel } from "processes/auth";

import { chatServices } from "pages/messenger/chat";

import { router } from "shared/core";

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch(authModel.setUser({ loading: true }));

  await authAPI.logout();

  await chatServices.closeWS();

  dispatch(authModel.setUser({ user: null, loading: false }));

  router.restart();
};
