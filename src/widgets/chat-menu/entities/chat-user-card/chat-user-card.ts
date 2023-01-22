import plural from "plural-ru";

import { chatModel } from "pages/messenger/chat";

import { TUserCardProps, UserCard } from "entities";

export const ChatUserCardWithChat = chatModel.withChat(
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
