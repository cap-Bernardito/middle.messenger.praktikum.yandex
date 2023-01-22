import plural from "plural-ru";

import { chatModel } from "pages/messenger/chat";

import { TUserCardProps, UserCard } from "entities";

import { getFile } from "shared/api";
import { Avatar } from "shared/ui";

export const ChatModalHeaderWithChat = chatModel.withChat(
  class extends UserCard {
    constructor(props: TUserCardProps) {
      super(props);

      this.setProps({
        message: () => {
          const { users } = chatModel.selectChat();

          return `${plural(users, "%d участник", "%d участника", "%d участников")}`;
        },
        avatar: function execProps() {
          const { chatData } = chatModel.selectChat();

          return new Avatar({ className: "avatar_xs mr-3", img: getFile(chatData ? chatData.avatar : "") });
        },
        name: () => {
          const { chatData } = chatModel.selectChat();

          return `<div class='text-lg'>${chatData ? chatData.title : ""}</div>`;
        },
        className: "not-interactive",
      });
    }
  }
);
