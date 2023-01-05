import { Block } from "shared/core";

export type TListItemProps = {
  body: Block | string;
  className?: string;
};

export class ListItem extends Block<TListItemProps> {
  static cName = "ListItem";

  constructor({ ...props }: TListItemProps) {
    super(props);
  }

  render() {
    return `<li class="list__item {{claccName}}">{{{body}}}</li>`;
  }
}
