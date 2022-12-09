import { renderCreator } from "shared/utils/utils";

import source from "./user-card.hbs";

import "./user-card.scss";

type TUserCardProps = {
  avatar: string;
  name: string;
  message?: string;
  date?: string;
  counter?: string;
  className?: string;
};

const renderHtml = renderCreator<TUserCardProps>(source, {
  avatar: "avatar",
  name: "name",
  message: "message",
});

export { renderHtml as renderUserCard, source as templateUserCard, TUserCardProps };
