import { authTypes } from "processes/auth";

import { request } from "shared/api";

export const profileEditInfoAPI = (data: authTypes.RegisterRequestData) =>
  request.put<authTypes.ResponseData>("user/profile", { data });
