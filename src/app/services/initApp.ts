import { authAPI, authModel, authTypes } from "processes/auth";

import { chatServices } from "pages/messenger/chat";
import { chatsServices, chatsTypes } from "pages/messenger/chats";

import { transformUser } from "shared/api";
import { router } from "shared/core";
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

    const { chatId } = router.getParams();

    dispatch(chatsServices.getChats, {
      chatId,
      success: (chats: chatsTypes.TChat[]) => {
        chats.forEach((chat) => {
          dispatch(chatServices.loadMessages, { chatId: chat.id });
        });
      },
    });
  } catch (err) {
    dispatch(authModel.setUser({ user: null, loading: false }));

    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
