import { mdiMagnify } from "@mdi/js";
import { Block } from "shared/core";
import { renderIcon } from "shared/ui/icon_string";
import { registerPartial } from "shared/utils/utils";

import source from "./search.hbs";

import "./search.scss";

export type TSearchProps = {
  value: string;
  className?: string;
};

registerPartial("icon-search", renderIcon({ value: mdiMagnify }));

export class Search extends Block<TSearchProps> {
  static cName = "Search";

  constructor({ ...props }: TSearchProps) {
    super({
      ...props,
    });
  }

  render() {
    return source;
  }
}
