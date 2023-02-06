import { authTypes } from "processes/auth/types";

import { APIError, request } from "shared/api";

export const authAPI = {
  login: (data: authTypes.LoginRequestData) => request.post<authTypes.ResponseData>("auth/signin", { data }),

  register: (data: authTypes.RegisterRequestData) => request.post<authTypes.ResponseData>("auth/signup", { data }),

  me: () => request.get<authTypes.UserDTO | APIError>("auth/user"),

  logout: () => request.post("auth/logout"),
};
