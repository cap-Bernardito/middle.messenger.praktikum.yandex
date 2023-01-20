import { authModel } from "processes/auth";

import { getFile } from "shared/api";
import { Avatar, TAvatarProps } from "shared/ui";

const { user } = authModel.selectUser();
const avatarProps: TAvatarProps = {};

if (user && user.avatar) {
  avatarProps.img = getFile(user.avatar);
}

export const MyAvatar = authModel.withAuth(
  class extends Avatar {
    constructor(props?: TAvatarProps) {
      super(props);

      // @ts-ignore
      this.setProps({ img: () => getFile(this.props.authUser?.avatar) });
    }
  }
);
