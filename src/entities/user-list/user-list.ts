import { TUserCardProps } from "entities";

import { Block } from "shared/core";
import { TSearchProps } from "shared/ui";

import source from "./user-list.hbs";

import "./user-list.scss";

export type TUserListProps = {
  header_link: string;
  header_search: Block<TSearchProps>;
  users: Block<TUserCardProps>[];
};

export class UserList extends Block<TUserListProps> {
  static cName = "UserList";

  constructor({ ...props }: TUserListProps) {
    super({
      ...props,
    });
  }

  render() {
    return source;
  }
}

export { source as templateUserList };
