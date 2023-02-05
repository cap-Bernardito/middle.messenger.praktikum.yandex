import { chatLib } from "pages/messenger/chat/model/lib";
import { chatsModel } from "pages/messenger/chats";

import { router } from "shared/core/router/router";
import { ROUTES } from "shared/utils/constants";

export const selectChat: DispatchStateHandler<number> = (dispatch, _state, action) => {
  router.go(`${ROUTES.messenger.path}/${action}`, false);

  dispatch(chatsModel.setChats({ activeChat: action }));

  const { chats } = chatsModel.selectChats();

  if (!chats) {
    dispatch(chatLib.setChat({ chatData: null }));

    return;
  }

  const currentChat = chats.find((chat) => Number(chat.id) === Number(action));

  if (!currentChat) {
    dispatch(chatLib.setChat({ chatData: null }));

    return;
  }

  dispatch(chatLib.setChat({ chatData: currentChat }));
};
