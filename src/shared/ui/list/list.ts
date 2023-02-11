import { Block } from "shared/core";

import "./list.scss";

export type TListProps = {
  items: (Block | string)[];
  className?: string;
};

export class List extends Block<TListProps> {
  static cName = "List";

  constructor({ items, ...props }: TListProps) {
    super({
      ...props,
      items,
    });
  }

  render() {
    return `
<ul class="list {{{className}}}">
  {{#each items}}
    {{{this}}}
  {{/each}}
</ul>
    `;
  }
}
