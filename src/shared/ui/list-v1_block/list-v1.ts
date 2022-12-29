import { Block } from "shared/core";

import source from "./list-v1.hbs";

import "./list-v1.scss";

export type TListV1Props = {
  items: Block[];
  className?: string;
};

export class ListV1 extends Block<TListV1Props> {
  static cName = "ListV1";

  constructor({ ...props }: TListV1Props) {
    super(props);
  }

  render() {
    return source;
  }
}
