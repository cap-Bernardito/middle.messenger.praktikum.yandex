import { chatsModel } from "pages/messenger/chats";

import { router } from "shared/core";
import { ROUTES } from "shared/utils/constants";

export const isChatExist = (dispatch: Dispatch<AppState>, state: AppState, action: string) => {
  const { chats } = chatsModel.selectChats();

  if (!chats || !action) {
    return;
  }

  const chatPageIsExist = chats?.find((chat) => String(chat.id) === String(action));

  if (!chatPageIsExist) {
    router.go(ROUTES.messenger.path);
  }
};
