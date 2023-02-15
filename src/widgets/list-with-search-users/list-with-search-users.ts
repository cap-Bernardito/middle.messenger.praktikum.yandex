import { TChatState } from "pages/messenger/chat/model/store";

import { List, TListProps } from "shared/ui";
import { connect } from "shared/utils/connect";

const withChatSearchUsers = connect((state) => {
  return {
    loading: state.searchUsers.loading,
    error: state.searchUsers.error,
    itemsData: state.searchUsers.users,
    chatData: state.chat.chatData,
    user: state.auth.user,
  };
});

type TListWithSearchUsers = TListProps & {
  error: TNullable<string>;
  loading: boolean;
  itemsData: Record<string, unknown>[];
  itemTemplate?: BlockConstructable;
  itemPropsMap?: Record<string, string>;
  chatData?: TChatState["chatData"];
};

export const ListWithSearchUsers = withChatSearchUsers(
  // @ts-ignore
  class extends List {
    constructor(props: TListWithSearchUsers) {
      super(props);
    }

    render() {
      const { itemsData, itemTemplate, itemPropsMap, chatData, error, loading } = this.props as TListWithSearchUsers;

      if (error) {
        return `<div>${error}</div>`;
      }

      if (loading) {
        return `<div>Поиск...</div>`;
      }

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
