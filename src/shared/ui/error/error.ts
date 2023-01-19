import { Block } from "shared/core";

import "./error.scss";

export type TErrorProps = TPropsWithEvents<{
  value: string;
  className?: string;
}>;

export class Error extends Block<TErrorProps> {
  static cName = "Error";

  constructor({ value = "", ...props }: TErrorProps) {
    super({ ...props, value });
  }

  render() {
    return `<div class="error{{#if className}} {{className}}{{/if}}">{{#if value}}{{value}}{{/if}}</div>`;
  }
}
