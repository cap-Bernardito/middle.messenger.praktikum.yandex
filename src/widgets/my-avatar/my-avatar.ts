import { authModel } from "processes/auth";

import { getFile } from "shared/api";
import { Avatar, TAvatarProps } from "shared/ui";
import { connect } from "shared/utils/connect";

const { user } = authModel.selectUser();
const avatarProps: TAvatarProps = {};

if (user && user.avatar) {
  avatarProps.img = getFile(user.avatar);
}

const withAuthUser = connect((state) => {
  return {
    authUser: state.auth.user,
  };
});

export const MyAvatar = withAuthUser(
  // @ts-ignore
  class extends Avatar {
    constructor(props?: TAvatarProps) {
      super(props);

      // @ts-ignore
      this.setProps({ img: () => getFile(this.props.authUser?.avatar) });
    }
  }
);
