import plural from "plural-ru";

import { chatModel } from "pages/messenger/chat";

import { TUserCardProps, UserCard } from "entities";

import { getFile } from "shared/api";
import { Avatar } from "shared/ui";
import { connect } from "shared/utils/connect";

const withChat = connect((state) => {
  return {
    chatUsers: state.chat.users,
    chatChatData: state.chat.chatData,
  };
});

export const ChatModalHeaderWithChat = withChat(
  class extends UserCard {
    constructor(props: TUserCardProps) {
      super(props);

      this.setProps({
        message: () => {
          const { users } = chatModel.selectChat();

          return `${plural(users, "%d участник", "%d участника", "%d участников")}`;
        },
        avatar: new Avatar({ className: "avatar_xs mr-3" }),
        name: () => {
          const { chatData } = chatModel.selectChat();

          return `<div class='text-lg'>${chatData ? chatData.title : ""}</div>`;
        },
        className: "not-interactive",
      });
    }

    componentDidUpdate() {
      const avatar = this.childrenFromProps.avatar;

      const { chatData } = chatModel.selectChat();

      if (avatar.props.img !== chatData?.avatar) {
        avatar.setProps({ img: getFile(chatData ? chatData.avatar : "") });
      }

      return true;
    }
  }
);
