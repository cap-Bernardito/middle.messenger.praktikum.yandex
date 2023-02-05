export const clearDialogs = async (dispatch: Dispatch<AppState>) => {
  dispatch({ dialogs: {} });
};
