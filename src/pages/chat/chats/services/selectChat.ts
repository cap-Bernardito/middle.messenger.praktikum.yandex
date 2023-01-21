import { chatsModel } from "pages/chat/chats";

export const selectChat = async (dispatch: Dispatch<AppState>, state: AppState, action: number) => {
  dispatch(chatsModel.setChats({ activeChat: action }));
};
