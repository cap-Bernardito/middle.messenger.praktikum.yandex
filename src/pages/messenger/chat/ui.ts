import { chatModel } from "pages/messenger/chat";

import { chatMenuUi } from "widgets/chat-menu";
import { ChatUserCardWithChat } from "widgets/chat-menu/entities/chat-user-card";

import { Messages, MessagesBody, MessagesHeader, TMessagesBodyProps, TMessagesProps } from "entities";

import { getFile } from "shared/api";
import { Avatar, Message } from "shared/ui";
import { connect } from "shared/utils/connect";
import DomUtilities from "shared/utils/dom-utilities";

import { scrollToBottom } from "./utils";

document.addEventListener("DOMContentLoaded", () => {
  DomUtilities.observe({
    // @ts-ignore
    selector: "[data-messages-scrollable]",
    // @ts-ignore
    mutationCallback: (node, record, type) => {
      if (type === "addedNodes") {
        scrollToBottom(node);
      }
    },
  });
});

const withChat = connect((state) => {
  return {
    chatUsers: state.chat.users,
    chatChatData: state.chat.chatData,
    chatActiveChat: state.chats.activeChat,
  };
});

const withDialog = connect((state) => {
  const { chatData } = state.chat;
  const { activeChat } = state.chats;

  const result = {
    messages: null,
    loading: false,
    error: null,
    activeChat,
  };

  if (!chatData) {
    return result;
  }

  const dialog = state.dialogs[chatData.id];

  if (!dialog) {
    return result;
  }

  return {
    messages: dialog.data || null,
    loading: dialog.loading,
    error: dialog.error,
    activeChat,
  };
});

const MessagesBodyWithDialogs = withDialog(
  class extends MessagesBody {
    constructor(props: TMessagesBodyProps) {
      super(props);
    }

    // Не надо рекурсивно мержить диалоги
    setProps(nextPartialProps: Partial<TMessagesBodyProps>) {
      super.setProps(nextPartialProps, (props, nextProps) => {
        Object.assign(props, nextProps);
      });
    }
  }
);

export const MessagesWithChat = withChat(
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

        body: new MessagesBodyWithDialogs({
          messages: [].map((m) => new Message(m)),
        }),
      });
    }
  }
);
