import { Block, registerComponent } from "shared/core";

import source from "./user-info.hbs";

export type TUserInfoProps = {
  avatar?: Block;
  title?: string;
  info?: Block | string;
  controls?: string;
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

registerComponent(UserInfo);

export { source as templateUserInfo };
