import img from "shared/assets/svg/icon-empty.svg";
import { renderCreator } from "shared/utils/utils";

import source from "./avatar.hbs";

import "./avatar.scss";

type TAvatar = {
  img: string;
  title?: string;
  className?: string;
};

const renderHtml = renderCreator<TAvatar>(source, {
  img: img,
  title: "Загрузить аватар",
});

export { renderHtml as renderAvatar, TAvatar };
