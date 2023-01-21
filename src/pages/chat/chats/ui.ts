import { chatsModel } from "pages/chat/chats";

import { TUserListProps, UserList } from "entities";

import { getFile } from "shared/api";
import { Avatar } from "shared/ui";
import { formattedDate } from "shared/utils";

export const UserListWithChats = chatsModel.withChats(
  class extends UserList {
    constructor(props: TUserListProps) {
      super(props);

      this.setProps({
        // @ts-ignore
        users: () => {
          const { chats } = chatsModel.selectChats();

          return (
            chats &&
            chats.map((chat) => {
              return {
                avatar: new Avatar({ className: "avatar_sm", img: getFile(chat.avatar) }),
                name: chat.title,
                message: chat.lastMessage.content,
                date: formattedDate(new Date(chat.lastMessage.time)),
                counter: chat.unreadCount,
                // className: "active",
              };
            })
          );
        },
      });
    }
  }
);
