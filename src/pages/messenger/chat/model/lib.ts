import { useSelector } from "app/store";

import { _ } from "shared/utils";
import { connect } from "shared/utils/connect";

import { TChatState } from "./store";

export const setChat = (data: Partial<TChatState>) => _.set<Partial<{ chats: TChatState }>>({}, "chat", data);

export const selectChat = <T = TChatState>() => <T>useSelector((state) => state.chat);

export const withChat = connect((state) => {
  if (typeof state.chat === "undefined") {
    return {};
  }

  return {
    chatError: state.chat.error,
    chatLoading: state.chat.loading,
    chatUsers: state.chat.users,
  };
});
