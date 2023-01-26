import { authModel } from "processes/auth";

import { chatModel } from "pages/messenger/chat";
import { chatsModel } from "pages/messenger/chats";

import { Store } from "shared/core/store";

export const initialState = {
  appIsInited: false,
  auth: { ...authModel.userState },
  chats: { ...chatsModel.chatsState },
  chat: { ...chatModel.chatState },
  dialogs: { ...chatModel.dialogsState },
};

export const store = new Store<AppState>(initialState);

store.on("changed", (_prevState, _nextState, partedNewState) => {
  if (process.env.DEBUG) {
    console.log("%cstore updated", "background: #222; color: #bada55", partedNewState);
  }
});

export const useSelector = <T>(selectorFn: (store: AppState) => T) => selectorFn(store.getState());
