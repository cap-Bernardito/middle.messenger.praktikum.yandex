import { renderCreator } from "shared/utils/utils";

import source from "./messages-footer.hbs";

import "./messages-footer.scss";

type TMessagesFooterProps = {
  left: string;
  middle: string;
  right: string;
};

const renderHtml = renderCreator<TMessagesFooterProps>(source, {
  left: "left",
  middle: "middle",
  right: "right",
});

export { renderHtml as renderMessagesFooter, source as templateMessagesFooter, TMessagesFooterProps };
