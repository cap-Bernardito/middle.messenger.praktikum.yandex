import plural from "plural-ru";

import { chatModel } from "pages/messenger/chat";

import { TUserCardProps, UserCard } from "entities";

import { connect } from "shared/utils/connect";

const withChat = connect((state) => {
  return {
    chatUsers: state.chat.users,
  };
});

export const ChatUserCardWithChat = withChat(
  class extends UserCard {
    constructor(props: TUserCardProps) {
      super(props);

      this.setProps({
        message: () => {
          const { users } = chatModel.selectChat();

          return `${plural(users, "%d участник", "%d участника", "%d участников")}`;
        },
      });
    }
  }
);
