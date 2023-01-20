export type User = {
  id: number;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  avatar: string;
  phone: string;
  email: string;
  fullName: string;
};

export type TUserState = {
  user: null | User;
  loading: boolean;
  error: null | string;
};

export const userState: TUserState = {
  user: null,
  loading: false,
  error: null,
};
