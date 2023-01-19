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

// eslint-disable-next-line @typescript-eslint/ban-types
export type ResponseData = {} | APIError;
