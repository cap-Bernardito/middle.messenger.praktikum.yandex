import { authTypes } from "processes/auth/types";

export type TSearchUsersState = {
  users: TNullable<authTypes.UserDTO[]>;
  loading: boolean;
  error: TNullable<string>;
};

export const searchUsersState: TSearchUsersState = {
  users: null,
  loading: false,
  error: null,
};
