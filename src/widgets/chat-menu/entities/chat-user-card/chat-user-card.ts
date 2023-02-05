import plural from "plural-ru";

import { chatLib } from "pages/messenger/chat/model/lib";

import { TUserCardProps, UserCard } from "entities";

import { connect } from "shared/utils/connect";

const withChat = connect((state) => {
  return {
    chatUsers: state.chat.users,
  };
});

export const ChatUserCardWithChat = withChat(
  // @ts-ignore
  class extends UserCard {
    constructor(props: TUserCardProps) {
      super(props);

      this.setProps({
        message: () => {
          const { users } = chatLib.selectChat();

          return `${plural(users, "%d участник", "%d участника", "%d участников")}`;
        },
      });
    }
  }
);
