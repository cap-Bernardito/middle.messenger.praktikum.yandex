import { chatModel } from "pages/messenger/chat";
import { chatsModel } from "pages/messenger/chats";

import { chatMenuServices } from "widgets/chat-menu";

import { router } from "shared/core";
import { ROUTES } from "shared/utils/constants";

export const selectChat = (dispatch: Dispatch<AppState>, state: AppState, action: number) => {
  router.go(`${ROUTES.messenger.path}/${action}`, false);

  dispatch(chatsModel.setChats({ activeChat: action }));
  dispatch(chatMenuServices.getUsers, { id: action });

  const { chats } = chatsModel.selectChats();

  if (!chats) {
    dispatch(chatModel.setChat({ chatData: null }));

    return;
  }

  const currentChat = chats.find((chat) => Number(chat.id) === Number(action));

  if (!currentChat) {
    dispatch(chatModel.setChat({ chatData: null }));

    return;
  }

  dispatch(chatModel.setChat({ chatData: currentChat }));
};
