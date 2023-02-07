export declare namespace chatsTypes {
  type TChatDTO = {
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

  type TChat = {
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

  type createChatRequestData = {
    title: string;
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  type ResponseData = {} | APIError;
}
