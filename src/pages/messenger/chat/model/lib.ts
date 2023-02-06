import { useSelector } from "app/store";

import { chatsTypes } from "pages/messenger/chats/types";

import { _ } from "shared/utils";
import { connect } from "shared/utils/connect";

import { TChatState, TDialog, TDialogsState } from "./store";

const setChat = (data: Partial<TChatState>) => _.set<Partial<{ chats: TChatState }>>({}, "chat", data);

const setDialog = (chatId: chatsTypes.TChat["id"], data: TNullable<TDialog>) =>
  _.set<Partial<{ dialogs: TDialogsState }>>({}, `dialogs.${chatId}`, data);

const selectChat = <T = TChatState>() => <T>useSelector((state) => state.chat);

const selectDialog = <T = TDialogsState>(chatId: chatsTypes.TChat["id"]) => <T>useSelector((state) => {
    if (chatId && state.dialogs[chatId]?.data) {
      return state.dialogs[chatId]?.data;
    }

    return [];
  });

const withChat = connect((state) => {
  return {
    chatError: state.chat.error,
    chatLoading: state.chat.loading,
    chatUsers: state.chat.users,
    chatChatData: state.chat.chatData,
  };
});

export const chatLib = {
  setChat,
  setDialog,
  selectChat,
  selectDialog,
  withChat,
};
