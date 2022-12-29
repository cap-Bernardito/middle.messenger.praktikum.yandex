import { mdiImageOutline } from "@mdi/js";
import { Block } from "shared/core";

import source from "./avatar.hbs";

import "./avatar.scss";

type TAvatarProps = {
  img?: string;
  title?: string;
  className?: string;
  editable?: boolean;
  icon?: string;
};

export class Avatar extends Block<TAvatarProps> {
  static cName = "Avatar";

  constructor({ title = "Загрузить аватар", icon = mdiImageOutline, ...props }: TAvatarProps = {}) {
    super({
      ...props,
      title,
      icon,
    });
  }

  render() {
    return source;
  }
}
