import { store, useSelector } from "app/store";

import { _ } from "shared/utils";
import { connect } from "shared/utils/connect";

import { TChatsState } from "./store";

export const setChats = (data: Partial<TChatsState>) => {
  if (data.chats) {
    store.getState().chats.chats = null;
  }

  return _.set<Partial<{ chats: TChatsState }>>({}, "chats", data);
};

export const selectChats = <T = TChatsState>() => <T>useSelector((state) => state.chats);

export const withChats = connect((state) => {
  return {
    chatsError: state.chats.error,
    chatsLoading: state.chats.loading,
    chatsChats: state.chats.chats,
    chatsActiveChat: state.chats.activeChat,
  };
});
