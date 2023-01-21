import { chatsModel } from "pages/messenger/chats";

import { Messages, MessagesBody, MessagesHeader, TMessagesProps, UserCard } from "entities";

import { mdiDotsVertical } from "@mdi/js";
import { getFile } from "shared/api";
import { router } from "shared/core";
import { Avatar, Message, renderIcon } from "shared/ui";

import { messagesMock } from "../mockData";

export const MessagesWithChat = chatsModel.withChats(
  class extends Messages {
    constructor(props: TMessagesProps) {
      super(props);

      this.setProps({
        placeholder: () => {
          const { chatId } = router.getParams();

          return !chatId && "Выберите, кому хотели бы написать";
        },
        header: function execProps() {
          const { chats } = chatsModel.selectChats();

          if (!chats) {
            return null;
          }

          const { chatId } = router.getParams();

          const [currentChat] = chats.filter((chat) => Number(chat.id) === Number(chatId));

          if (!currentChat) {
            return null;
          }

          return new MessagesHeader({
            left: new UserCard({
              avatar: new Avatar({ className: "avatar_xs", img: getFile(currentChat.avatar) }),
              name: `<span class='text-base'>${currentChat.title}</span>`,
              className: "not-interactive",
            }),
            right: `<a href="#" title="Открыть меню" class="link-icon">${renderIcon({ value: mdiDotsVertical })}</a>`,
          });
        },

        body: function execProps() {
          return new MessagesBody({
            messages: messagesMock.map((m) => new Message(m)),
          });
        },
      });
    }
  }
);
