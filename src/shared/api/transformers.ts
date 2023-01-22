import { authTypes } from "processes/auth";

import { chatsTypes } from "pages/messenger/chats";

export const transformUser = (data: authTypes.UserDTO): authTypes.User => {
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

export const transformUsers = (data: authTypes.UserDTO[]): authTypes.User[] => {
  return data.map((user) => transformUser(user));
};

export const transformChats = (dataArray: chatsTypes.TChatDTO[]): chatsTypes.TChat[] => {
  return dataArray.map((data) => {
    const lastMessage = data.last_message && {
      user: transformUser(data.last_message.user),
      time: data.last_message.time,
      content: data.last_message.content,
    };

    return {
      id: data.id,
      title: data.title,
      avatar: data.avatar,
      unreadCount: data.unread_count,
      lastMessage,
    };
  });
};
