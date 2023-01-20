import { authModel } from "processes/auth";

import { UserDTO } from "shared/api";

export const transformUser = (data: UserDTO): authModel.User => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
    fullName: `${data.first_name} ${data.second_name}`,
  };
};
