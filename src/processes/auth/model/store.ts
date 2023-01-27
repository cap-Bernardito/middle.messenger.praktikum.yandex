import { User } from "../types";

export type TUserState = {
  user: TNullable<User>;
  loading: boolean;
  error: TNullable<string>;
};

export const userState: TUserState = {
  user: null,
  loading: false,
  error: null,
};
