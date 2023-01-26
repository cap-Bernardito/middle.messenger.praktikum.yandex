import { authTypes } from "processes/auth";

import { request } from "shared/api";

export type ChangeUserInfoRequestData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export const profileEditInfoAPI = (data: ChangeUserInfoRequestData) =>
  request.put<authTypes.ResponseData>("user/profile", { data });
