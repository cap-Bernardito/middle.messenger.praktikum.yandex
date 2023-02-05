import { authModel } from "processes/auth";
import { authAPI } from "processes/auth/api";

import { chatState } from "pages/messenger/chat/model";
import { chatLib } from "pages/messenger/chat/model/lib";
import { chatServices } from "pages/messenger/chat/services";
import { chatsModel } from "pages/messenger/chats";
import { chatsState } from "pages/messenger/chats/model";

import { router } from "shared/core/router/router";

import { userState } from "../model";

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch(authModel.setUser({ loading: true }));

  await authAPI.logout();

  await chatServices.closeWS();

  dispatch(authModel.setUser({ ...userState }));
  dispatch(chatsModel.setChats({ ...chatsState }));
  dispatch(chatLib.setChat({ ...chatState }));
  dispatch(chatServices.clearDialogs);

  router.restart();
};
