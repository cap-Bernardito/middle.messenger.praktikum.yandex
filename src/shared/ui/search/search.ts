import { Block } from "shared/core";

import source from "./search.hbs";

import "./search.scss";

export type TSearchProps = {
  value: string;
  className?: string;
};

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
