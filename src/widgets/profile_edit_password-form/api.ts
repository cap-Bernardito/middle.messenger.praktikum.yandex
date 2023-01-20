import { authTypes } from "processes/auth";

import { request } from "shared/api";

export type PasswordRequestData = {
  oldPassword: "string";
  newPassword: "string";
};

export const profileEditPasswordAPI = (data: PasswordRequestData) =>
  request.put<authTypes.ResponseData>("user/password", { data });
