import { userState } from "processes/auth/model/store";

import { chatState, dialogsState } from "pages/messenger/chat/model/store";
import { chatsState } from "pages/messenger/chats/model/store";

import { Store } from "shared/core/store";

export const initialState = {
  appIsInited: false,
  auth: { ...userState },
  chats: { ...chatsState },
  chat: { ...chatState },
  dialogs: { ...dialogsState },
};

export const store = new Store<AppState>(initialState);

store.on("changed", (_prevState, _nextState, partedNewState) => {
  if (process.env.DEBUG) {
    console.log("%cstore updated", "background: #222; color: #bada55", partedNewState);
  }
});

export const useSelector = <T>(selectorFn: (store: AppState) => T) => selectorFn(store.getState());
