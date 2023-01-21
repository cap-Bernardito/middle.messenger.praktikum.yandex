import { store } from "app/store";

import { chatsModel, chatsServices } from "pages/messenger/chats";

import { TUserListProps, UserList } from "entities";

import { getFile } from "shared/api";
import { Avatar } from "shared/ui";
import { formattedDate } from "shared/utils";

export const UserListWithChats = chatsModel.withChats(
  class extends UserList {
    constructor(props: TUserListProps) {
      super(props);

      this.setProps({
        users: () => {
          const { chats, activeChat } = chatsModel.selectChats();

          return (
            chats &&
            chats.map((chat) => {
              return {
                avatar: new Avatar({ className: "avatar_sm", img: getFile(chat.avatar) }),
                name: chat.title,
                message: chat.lastMessage && chat.lastMessage.content,
                date: chat.lastMessage && formattedDate(new Date(chat.lastMessage.time)),
                counter: chat.unreadCount,
                className: () => (chat.id === activeChat ? "active" : ""),
                onClick: () => store.dispatch(chatsServices.selectChat, chat.id),
              };
            })
          );
        },
      });
    }
  }
);
