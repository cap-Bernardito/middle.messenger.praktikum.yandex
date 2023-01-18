import { APIError, UserDTO } from "shared/api/types";
import { request } from "shared/core/apiRequest";

type LoginRequestData = {
  login: string;
  password: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type LoginResponseData = {} | APIError;

export const authAPI = {
  login: (data: LoginRequestData) => request.post<LoginResponseData>("auth/signin", { data }),

  me: () => request.get<UserDTO | APIError>("auth/user"),

  logout: () => request.post("auth/logout"),
};
