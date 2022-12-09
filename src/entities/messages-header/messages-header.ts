import { renderCreator } from "shared/utils/utils";

import source from "./messages-header.hbs";

import "./messages-header.scss";

type TMessagesHeaderProps = {
  left: string;
  right: string;
};

const renderHtml = renderCreator<TMessagesHeaderProps>(source, {
  left: "left",
  right: "right",
});

export { renderHtml as renderMessagesHeader, source as templateMessagesHeader, TMessagesHeaderProps };
