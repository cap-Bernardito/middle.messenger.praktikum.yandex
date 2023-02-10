import { Block } from "shared/core";

import source from "./user-card.hbs";

import "./user-card.scss";

export type TUserCardProps = TPropsWithEvents<{
  avatar: TFnProps<Block>;
  name: TFnProps<string>;
  message?: TFnProps<TNullable<Block | string>>;
  date?: string;
  counter?: string | number;
  className?: TFnProps<string>;
  onClick?: (event: Event) => void;
}>;

export class UserCard extends Block<TUserCardProps> {
  static cName = "UserCard";

  constructor({ onClick, ...props }: TUserCardProps) {
    super({
      ...props,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return source;
  }
}
