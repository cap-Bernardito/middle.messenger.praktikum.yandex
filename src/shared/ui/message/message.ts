import { registerHelper, renderCreator } from "shared/utils/utils";

import source from "./message.hbs";

import "./message.scss";

type TMessageProps = {
  type: "in" | "out" | "date";
  text?: string;
  date: string;
};

registerHelper("isDate", function (value) {
  return value === "date";
});

registerHelper("isOut", function (value) {
  return value === "out";
});

registerHelper("isIn", function (value) {
  return value === "in";
});

const renderHtml = renderCreator<TMessageProps>(source, {
  type: "out",
  text: "text",
  date: "10:10",
});

export { renderHtml as renderMessage, TMessageProps };
