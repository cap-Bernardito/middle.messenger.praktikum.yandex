import { authAPI, authModel } from "processes/auth";

import { chatModel, chatServices } from "pages/messenger/chat";
import { chatState } from "pages/messenger/chat/model";
import { chatsModel } from "pages/messenger/chats";
import { chatsState } from "pages/messenger/chats/model";

import { router } from "shared/core";

import { userState } from "../model";

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch(authModel.setUser({ loading: true }));

  await authAPI.logout();

  await chatServices.closeWS();

  dispatch(authModel.setUser({ ...userState }));
  dispatch(chatsModel.setChats({ ...chatsState }));
  dispatch(chatModel.setChat({ ...chatState }));
  dispatch(chatServices.clearDialogs);

  router.restart();
};
