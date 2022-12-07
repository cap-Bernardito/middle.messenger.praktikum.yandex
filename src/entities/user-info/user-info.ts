import { renderCreator } from "shared/utils/utils";

import source from "./user-info.hbs";

type TUserInfoProps = {
  avatar: string;
  title: string;
  info: string;
  controls: string;
};

const renderHtml = renderCreator<TUserInfoProps>(source, {
  avatar: "avatar",
  title: "title",
  info: "list info",
  controls: "list controls",
});

export { renderHtml as renderFormProfile, source as templateUserInfo, TUserInfoProps };
