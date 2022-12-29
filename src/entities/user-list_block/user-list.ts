import { Block } from "shared/core";

import source from "./user-list.hbs";

import "./user-list.scss";

export type TUserListProps = {
  header_link: string;
  header_search: Block;
  users: Block[];
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
