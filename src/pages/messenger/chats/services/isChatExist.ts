import { chatModel } from "pages/messenger/chat";
import { chatsModel } from "pages/messenger/chats";

import { router } from "shared/core";
import { ROUTES } from "shared/utils/constants";

export const isChatExist: DispatchStateHandler<string> = (dispatch, _state, action: string) => {
  const { chats } = chatsModel.selectChats();

  if (!chats || !action) {
    return;
  }

  const currentChat = chats?.find((chat) => String(chat.id) === String(action));

  if (!currentChat) {
    router.go(ROUTES.messenger.path);

    return;
  }

  dispatch(chatModel.setChat({ chatData: currentChat }));
};
