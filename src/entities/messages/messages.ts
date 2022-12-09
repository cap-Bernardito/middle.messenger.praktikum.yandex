import { renderCreator } from "shared/utils/utils";

import source from "./messages.hbs";

import "./messages.scss";

type TMessagesProps = {
  header: string;
  body: string;
  footer: string;
};

const renderHtml = renderCreator<TMessagesProps>(source, {
  header: "header",
  body: "body",
  footer: "footer",
});

export { renderHtml as renderMessages, source as templateMessages, TMessagesProps };
