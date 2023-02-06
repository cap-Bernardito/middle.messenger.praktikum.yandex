import { authModel } from "processes/auth";

import { PasswordRequestData, profileEditPasswordAPI } from "widgets/profile_edit_password-form";

import { apiHasError } from "shared/utils";

export const profileEditPassword: DispatchStateHandler<PasswordRequestData> = async (dispatch, _state, action) => {
  dispatch(authModel.setUser({ loading: true }));

  const response = await profileEditPasswordAPI(action);

  if (apiHasError(response)) {
    dispatch(authModel.setUser({ loading: false, error: response.reason }));

    return;
  }

  dispatch(authModel.setUser({ loading: false, error: null }));
};
