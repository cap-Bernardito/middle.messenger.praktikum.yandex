import { authTypes } from "processes/auth";

import { APIError, UserDTO } from "shared/api/types";
import { request } from "shared/core/apiRequest";

export const authAPI = {
  login: (data: authTypes.LoginRequestData) => request.post<authTypes.ResponseData>("auth/signin", { data }),

  register: (data: authTypes.RegisterRequestData) => request.post<authTypes.ResponseData>("auth/signup", { data }),

  me: () => request.get<UserDTO | APIError>("auth/user"),

  logout: () => request.post("auth/logout"),
};
