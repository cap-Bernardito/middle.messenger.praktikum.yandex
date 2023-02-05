import { chatLib } from "pages/messenger/chat/model/lib";

export const resetLoadStatus = async (dispatch: Dispatch<AppState>) => {
  dispatch(chatLib.setChat({ loading: false, error: null }));
};
