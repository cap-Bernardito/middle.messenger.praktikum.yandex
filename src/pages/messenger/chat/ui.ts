import { chatModel } from "pages/messenger/chat";

import { chatMenuUi } from "widgets/chat-menu";
import { ChatUserCardWithChat } from "widgets/chat-menu/entities/chat-user-card";

import { Messages, MessagesBody, MessagesHeader, TMessagesProps } from "entities";

import { getFile } from "shared/api";
import { Avatar, Message } from "shared/ui";

import { messagesMock } from "../mockData";

export const MessagesWithChat = chatModel.withChat(
  class extends Messages {
    constructor(props: TMessagesProps) {
      super(props);

      this.setProps({
        placeholder: () => {
          const { chatData } = chatModel.selectChat();

          return !chatData && "Выберите, кому хотели бы написать";
        },
        header: function execProps() {
          const { chatData } = chatModel.selectChat();

          if (!chatData) {
            return null;
          }

          return new MessagesHeader({
            left: new ChatUserCardWithChat({
              avatar: new Avatar({ className: "avatar_xs", img: getFile(chatData.avatar) }),
              name: `<span class='text-base'>${chatData.title}</span>`,
              className: "not-interactive",
            }),
            right: chatMenuUi.chatMenuModalButton,
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
