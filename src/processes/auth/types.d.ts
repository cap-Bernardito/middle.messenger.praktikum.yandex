export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type LoginRequestData = {
  login: string;
  password: string;
};

export type RegisterRequestData = {
  first_name: "string";
  second_name: "string";
  login: "string";
  email: "string";
  password: "string";
  phone: "string";
};

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

// eslint-disable-next-line @typescript-eslint/ban-types
export type ResponseData = {} | APIError;
