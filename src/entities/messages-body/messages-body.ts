import { renderCreator } from "shared/utils/utils";

import source from "./messages-body.hbs";

import "./messages-body.scss";

type TMessagesBodyProps = {
  messages: string[];
  placeholder?: string;
};

const renderHtml = renderCreator<TMessagesBodyProps>(source, {
  messages: [],
  placeholder: "Тут пока ничего нет",
});

export { renderHtml as renderMessagesBody, source as templateMessagesBody, TMessagesBodyProps };
