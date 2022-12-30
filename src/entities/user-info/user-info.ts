import { Block } from "shared/core";
import { TAvatarProps } from "shared/ui";

import source from "./user-info.hbs";

export type TUserInfoProps = {
  avatar?: Block<TAvatarProps>;
  title?: string;
  info?: Block | string;
  controls?: Block | string;
};

export class UserInfo extends Block<TUserInfoProps> {
  static cName = "UserInfo";

  constructor({ ...props }: TUserInfoProps) {
    super({
      ...props,
    });
  }

  render() {
    return source;
  }
}

export { source as templateUserInfo };
