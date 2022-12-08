import img from "shared/assets/svg/icon-empty.svg";
import { renderCreator } from "shared/utils/utils";

import source from "./avatar.hbs";

import "./avatar.scss";

type TAvatar = {
  img?: string;
  title?: string;
  className?: string;
  editable?: boolean;
};

const renderHtml = renderCreator<TAvatar>(source, {
  img: img,
  title: "Загрузить аватар",
  editable: false,
});

export { renderHtml as renderAvatar, TAvatar };
