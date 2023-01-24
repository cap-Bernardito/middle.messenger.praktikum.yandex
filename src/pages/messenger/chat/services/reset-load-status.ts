import { chatModel } from "pages/messenger/chat";

export const resetLoadStatus = async (dispatch: Dispatch<AppState>) => {
  dispatch(chatModel.setChat({ loading: false, error: null }));
};
