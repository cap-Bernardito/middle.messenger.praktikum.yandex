import { chatsAPI, chatsModel, chatsTypes } from "pages/messenger/chats";

import { Overlay } from "entities";

import { transformChats } from "shared/api";
import { apiHasError } from "shared/utils";

export const createChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: chatsTypes.createChatRequestData
) => {
  dispatch(chatsModel.setChats({ loading: true }));

  const response = await chatsAPI.createChat(action);

  if (apiHasError(response)) {
    dispatch(chatsModel.setChats({ loading: false, error: response.reason }));

    return;
  }

  const responseChats = await chatsAPI.getChats();

  if (apiHasError(responseChats)) {
    dispatch(chatsModel.setChats({ loading: false, error: responseChats.reason }));

    return;
  }

  // В пропсах компонента рекурсивный мердж, потому сперва очищаем перед получением новых чатов
  dispatch(chatsModel.setChats({ chats: null }));

  dispatch(
    chatsModel.setChats({ chats: transformChats(responseChats as chatsTypes.TChatDTO[]), loading: false, error: null })
  );

  const overlay = new Overlay();

  overlay.closeWidgets();
};
