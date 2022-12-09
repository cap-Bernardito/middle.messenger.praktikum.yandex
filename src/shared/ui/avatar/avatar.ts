import { mdiImageOutline } from "@mdi/js";
import { renderIcon } from "shared/ui/icon";
import { registerPartial, renderCreator } from "shared/utils/utils";

import source from "./avatar.hbs";

import "./avatar.scss";

registerPartial("icon-image-empty", renderIcon({ value: mdiImageOutline }));

type TAvatar = {
  img?: string;
  title?: string;
  className?: string;
  editable?: boolean;
};

const renderHtml = renderCreator<TAvatar>(source, {
  title: "Загрузить аватар",
  editable: false,
});

export { renderHtml as renderAvatar, TAvatar };
