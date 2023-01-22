import { chatsModel } from "pages/messenger/chats";

import { chatMenuServices } from "widgets/chat-menu";

import { router } from "shared/core";
import { ROUTES } from "shared/utils/constants";

export const selectChat = (dispatch: Dispatch<AppState>, state: AppState, action: number) => {
  router.go(`${ROUTES.messenger.path}/${action}`, false);

  dispatch(chatsModel.setChats({ activeChat: action }));
  dispatch(chatMenuServices.getUsers, { id: action });
};
