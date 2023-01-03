import { Block } from "shared/core";
import { Avatar } from "shared/ui";

import source from "./user-card.hbs";

import "./user-card.scss";

export type TUserCardProps = {
  avatar: Avatar;
  name: string;
  message?: Block | string;
  date?: string;
  counter?: string;
  className?: string;
};

export class UserCard extends Block<TUserCardProps> {
  static cName = "UserCard";

  constructor({ ...props }: TUserCardProps) {
    super({
      ...props,
    });
  }

  render() {
    return source;
  }
}
