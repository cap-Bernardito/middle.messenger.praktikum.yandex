import { chatsModel } from "pages/messenger/chats";
import { chatsAPI } from "pages/messenger/chats/api";
import { isChatExist } from "pages/messenger/chats/services/isChatExist";
import { chatsTypes } from "pages/messenger/chats/types";

import { transformChats } from "shared/api";
import { apiHasError } from "shared/utils";

type TGetChatsPayload = {
  chatId: chatsTypes.TChat["id"];
  success?: (chats: chatsTypes.TChat[]) => void;
};

export const getChats: DispatchStateHandler<TGetChatsPayload> = async (
  dispatch,
  _state,
  { chatId, success: successLoadCb }
) => {
  dispatch(chatsModel.setChats({ loading: true }));

  const response = await chatsAPI.getChats();

  if (apiHasError(response)) {
    dispatch(chatsModel.setChats({ chats: null, loading: false, error: response.reason }));

    return;
  }

  // В пропсах компонента рекурсивный мердж, потому сперва очищаем перед получением новых чатов
  dispatch(chatsModel.setChats({ chats: null }));

  const chats = transformChats(response as chatsTypes.TChatDTO[]);

  dispatch(chatsModel.setChats({ chats, loading: false, error: null }));

  if (chatId) {
    dispatch(isChatExist, chatId);
  }

  successLoadCb && successLoadCb(chats);
};
