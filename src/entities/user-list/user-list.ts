import { renderCreator } from "shared/utils/utils";

import source from "./user-list.hbs";

import "./user-list.scss";

type TUserListProps = {
  header_link: string;
  header_search: string;
  body: string;
};

const renderHtml = renderCreator<TUserListProps>(source, {
  header_link: "link",
  header_search: "search",
  body: "title",
});

export { renderHtml as renderUserList, source as templateUserList, TUserListProps };
