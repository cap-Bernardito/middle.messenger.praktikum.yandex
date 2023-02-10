import { authTypes } from "processes/auth/types";

import { request } from "shared/api";

export const profileEditAvatarAPI = (data: FormData) =>
  request.put<authTypes.ResponseData>("user/profile/avatar", {
    body: data,
    headers: {},
  });
