import { TUserCardProps, UserCard } from "entities";

import { Block } from "shared/core";
import { Search } from "shared/ui";

import source from "./user-list.hbs";

import "./user-list.scss";

export type TUserListProps = {
  header_search: Search;
  users: TFnProps<TNullable<TUserCardProps[]>> | TNullable<UserCard[]>;
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
