import { authModel } from "processes/auth";

export const resetLoadStatus = async (dispatch: Dispatch<AppState>) => {
  dispatch(authModel.setUser({ loading: false, error: null }));
};
