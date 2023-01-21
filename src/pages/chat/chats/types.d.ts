export type TChatDTO = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: UserDTO;
    time: string;
    content: string;
  };
};

export type TChat = {
  id: number;
  title: string;
  avatar: string;
  unreadCount: number;
  lastMessage: {
    user: User;
    time: string;
    content: string;
  };
};

export type createChatRequestData = {
  title: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ResponseData = {} | APIError;
