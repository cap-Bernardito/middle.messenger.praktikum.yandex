import { useSelector } from "app/store";

import { chatsTypes } from "pages/messenger/chats";

import { _ } from "shared/utils";
import { connect } from "shared/utils/connect";

import { TChatState, TDialog, TDialogsState } from "./store";

export const setChat = (data: Partial<TChatState>) => _.set<Partial<{ chats: TChatState }>>({}, "chat", data);

export const setDialog = (chatId: chatsTypes.TChat["id"], data: TNullable<TDialog>) =>
  _.set<Partial<{ dialogs: TDialogsState }>>({}, `dialogs.${chatId}`, data);

export const selectChat = <T = TChatState>() => <T>useSelector((state) => state.chat);

export const selectDialog = <T = TDialogsState>(chatId: chatsTypes.TChat["id"]) => <T>useSelector((state) => {
    if (chatId && state.dialogs[chatId]?.data) {
      return state.dialogs[chatId]?.data;
    }

    return [];
  });

export const withChat = connect((state) => {
  return {
    chatError: state.chat.error,
    chatLoading: state.chat.loading,
    chatUsers: state.chat.users,
    chatChatData: state.chat.chatData,
  };
});
