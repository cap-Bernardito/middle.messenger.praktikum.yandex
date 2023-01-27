import { chatsModel } from "pages/messenger/chats";

export const resetLoadStatus = async (dispatch: Dispatch<AppState>) => {
  dispatch(chatsModel.setChats({ loading: false, error: null }));
};
