import { UserCard } from "entities";

import { Block } from "shared/core";
import { Button } from "shared/ui";

import source from "./settings-panel.hbs";

import "./settings-panel.scss";

export type TSettingsPanelProps = {
  userInfo: UserCard | string;
  menu: Button[] | string;
  about: string;
};

export class SettingsPanel extends Block<TSettingsPanelProps> {
  static cName = "SettingsPanel";

  constructor({ ...props }: TSettingsPanelProps) {
    super({
      ...props,
    });
  }

  render() {
    return source;
  }
}
