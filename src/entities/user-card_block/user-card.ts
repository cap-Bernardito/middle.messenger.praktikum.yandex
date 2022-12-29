import { Block } from "shared/core";

import source from "./user-card.hbs";

import "./user-card.scss";

type TUserCardProps = {
  avatar: Block;
  name: string;
  message?: string;
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
