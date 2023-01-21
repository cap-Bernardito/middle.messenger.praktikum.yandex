import { chatsAPI, chatsModel, chatsTypes } from "pages/chat/chats";

import { transformChats } from "shared/api";
import { apiHasError } from "shared/utils";

export const getChats = async (dispatch: Dispatch<AppState>) => {
  dispatch(chatsModel.setChats({ loading: true }));

  const response = await chatsAPI.getChats();

  if (apiHasError(response)) {
    dispatch(chatsModel.setChats({ chats: null, loading: false, error: response.reason }));

    return;
  }

  dispatch(
    chatsModel.setChats({ chats: transformChats(response as chatsTypes.TChatDTO[]), loading: false, error: null })
  );
};
