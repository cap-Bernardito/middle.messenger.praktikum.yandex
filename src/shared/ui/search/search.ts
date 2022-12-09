import { mdiMagnify } from "@mdi/js";
import { renderIcon } from "shared/ui/icon";
import { registerPartial, renderCreator } from "shared/utils/utils";

import source from "./search.hbs";

import "./search.scss";

type TSearchProps = {
  value: string;
  className?: string;
};

registerPartial("icon-search", renderIcon({ value: mdiMagnify }));

const renderHtml = renderCreator<TSearchProps>(source, {
  value: "",
  className: "",
});

export { renderHtml as renderSearch, TSearchProps };
