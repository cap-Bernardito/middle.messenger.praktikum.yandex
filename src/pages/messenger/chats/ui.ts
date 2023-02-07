import { store } from "app/store";

import { chatsModel } from "pages/messenger/chats";
import { chatsServices } from "pages/messenger/chats/services";

import { TUserListProps, UserList } from "entities";

import { getFile } from "shared/api";
import { router } from "shared/core/router/router";
import { Avatar } from "shared/ui";
import { formattedDate } from "shared/utils";
import { connect } from "shared/utils/connect";

const withChats = connect((state) => {
  return {
    chatsChats: state.chats.chats,
    chatsActiveChat: state.chats.activeChat,
  };
});

const UserListWithChats = withChats(
  // @ts-ignore
  class extends UserList {
    constructor(props: TUserListProps) {
      super(props);

      this.setProps({
        users: () => {
          const { chats } = chatsModel.selectChats();
          const { chatId } = router.getParams();

          return (
            chats &&
            chats.map((chat) => {
              return {
                avatar: new Avatar({ className: "avatar_sm", img: getFile(chat.avatar) }),
                name: chat.title,
                message: chat.lastMessage && chat.lastMessage.content,
                date: chat.lastMessage && formattedDate(new Date(chat.lastMessage.time)),
                counter: chat.unreadCount,
                className: () => (Number(chat.id) === Number(chatId) ? "active" : ""),
                onClick: () => {
                  if (Number(chat.id) !== Number(chatId)) {
                    store.dispatch(chatsServices.selectChat, chat.id);
                  }
                },
              };
            })
          );
        },
      });
    }
  }
);

export const chatsUi = {
  UserListWithChats,
  withChats,
};
