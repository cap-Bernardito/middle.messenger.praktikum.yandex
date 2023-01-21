import { chatsModel } from "pages/messenger/chats";

export const selectChat = async (dispatch: Dispatch<AppState>, state: AppState, action: number) => {
  dispatch(chatsModel.setChats({ activeChat: action }));
};
