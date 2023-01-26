import { store } from "app/store";

export const clearDialogs = async (dispatch: Dispatch<AppState>) => {
  dispatch({ dialogs: {} });

  console.log(store.getState());
};
