import { chatsAPI, chatsModel, chatsServices, chatsTypes } from "pages/messenger/chats";

import { transformChats } from "shared/api";
import { apiHasError } from "shared/utils";

export const getChats = async (dispatch: Dispatch<AppState>, _state: AppState, action: number) => {
  dispatch(chatsModel.setChats({ loading: true }));

  const response = await chatsAPI.getChats();

  if (apiHasError(response)) {
    dispatch(chatsModel.setChats({ chats: null, loading: false, error: response.reason }));

    return;
  }

  // В пропсах компонента рекурсивный мердж, потому сперва очищаем перед получением новых чатов
  dispatch(chatsModel.setChats({ chats: null }));

  dispatch(
    chatsModel.setChats({ chats: transformChats(response as chatsTypes.TChatDTO[]), loading: false, error: null })
  );

  if (action) {
    dispatch(chatsServices.isChatExist, action);
  }
};
