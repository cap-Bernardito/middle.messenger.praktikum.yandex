import { authModel } from "processes/auth";

import { Store } from "shared/core/store";

export const initialState = {
  appIsInited: false,
  auth: authModel.userState,
};

export const store = new Store<AppState>(initialState);

store.on("changed", (prevState, nextState) => {
  if (process.env.DEBUG) {
    console.log("%cstore updated", "background: #222; color: #bada55", nextState);
  }
});

export const useSelector = <T>(selectorFn: (store: AppState) => T) => selectorFn(store.getState());

export const atata = () => true;
