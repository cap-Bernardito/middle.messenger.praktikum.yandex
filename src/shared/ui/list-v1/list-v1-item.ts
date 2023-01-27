import { Block } from "shared/core";

import source from "./list-v1-item.hbs";

export type TListV1ItemProps = {
  name: Block | string;
  value?: string;
};

export class ListV1Item extends Block<TListV1ItemProps> {
  static cName = "ListV1Item";

  constructor({ ...props }: TListV1ItemProps) {
    super(props);
  }

  render() {
    return source;
  }
}
