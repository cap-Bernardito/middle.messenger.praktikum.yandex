import { TChatState } from "pages/messenger/chat/model/store";

import { Block } from "shared/core";

import "./list.scss";

export type TListProps = {
  items: (Block | string | Record<string, unknown>)[];
  className?: string;
  itemTemplate?: BlockConstructable;
  itemPropsMap?: Record<string, string>;
  chatData?: TChatState["chatData"];
};

export class List extends Block<TListProps> {
  static cName = "List";

  constructor({ items, ...props }: TListProps) {
    super({
      ...props,
      items: items,
    });
  }

  render() {
    const { items, itemTemplate, itemPropsMap, chatData } = this.props;

    if (items && itemTemplate && itemPropsMap && chatData) {
      const itemMappedProps = (data: Record<string, unknown>) => {
        const result = Object.entries(itemPropsMap).map(([key, value]) => `${key}="${data[value]}"`);

        result.push(`chatId="${chatData.id}"`);

        return result.join(" ");
      };

      const itemsStringify = items
        .map((item) => `{{{ ${itemTemplate.cName} ${itemMappedProps(item as Record<string, unknown>)} }}}`)
        .join("");

      return `
      <ul class="list {{{className}}}">
        ${itemsStringify}
      </ul>
          `;
    }

    return `
<ul class="list {{{className}}}">
  {{#each items}}
    {{{this}}}
  {{/each}}
</ul>
    `;
  }
}
