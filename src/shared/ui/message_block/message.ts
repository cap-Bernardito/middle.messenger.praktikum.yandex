import { Block } from "shared/core";
import { registerHelper } from "shared/utils/utils";

import source from "./message.hbs";

import "./message.scss";

export type TMessageProps = {
  type: "in" | "out" | "date";
  text?: string;
  date: string;
};

export class Message extends Block<TMessageProps> {
  static cName = "Message";

  constructor({ ...props }: TMessageProps) {
    super({
      ...props,
    });
  }

  render() {
    return source;
  }
}

registerHelper("isDate", function (value) {
  return value === "date";
});

registerHelper("isOut", function (value) {
  return value === "out";
});

registerHelper("isIn", function (value) {
  return value === "in";
});
