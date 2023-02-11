import { TChatState } from "pages/messenger/chat/model/store";

import { List, TListProps } from "shared/ui";
import { connect } from "shared/utils/connect";

const withChatUsers = connect((state) => {
  return {
    itemsData: state.chat.users,
    chatData: state.chat.chatData,
    user: state.auth.user,
  };
});

type TListWithUsers = TListProps & {
  itemsData: Record<string, unknown>[];
  itemTemplate?: BlockConstructable;
  itemPropsMap?: Record<string, string>;
  chatData?: TChatState["chatData"];
};

export const ListWithUsers = withChatUsers(
  // @ts-ignore
  class extends List {
    constructor(props: TListWithUsers) {
      super(props);
    }

    render() {
      const { itemsData, itemTemplate, itemPropsMap, chatData } = this.props as TListWithUsers;

      if (itemsData && itemTemplate && itemPropsMap && chatData) {
        const itemMappedProps = (data: Record<string, unknown>) => {
          const result = Object.entries(itemPropsMap).map(([key, value]) => `${key}="${data[value]}"`);

          result.push(`chatId="${chatData.id}"`);

          return result.join(" ");
        };

        const itemsStringify = itemsData
          .map((item) => `{{{ ${itemTemplate.cName} ${itemMappedProps(item as Record<string, unknown>)} }}}`)
          .join("");

        return `
        <ul class="list {{{className}}}">
          ${itemsStringify}
        </ul>
            `;
      }

      return super.render();
    }
  }
);
