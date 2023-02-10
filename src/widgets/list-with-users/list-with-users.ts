import { List, TListProps } from "shared/ui";
import { connect } from "shared/utils/connect";

const withChatUsers = connect((state) => {
  return {
    items: state.chat.users,
    chatData: state.chat.chatData,
    user: state.auth.user,
  };
});

export const ListWithUsers = withChatUsers(
  // @ts-ignore
  class extends List {
    constructor(props: TListProps) {
      super(props);
    }
  }
);
