import { renderCreator } from "shared/utils/utils";

import source from "./icon.hbs";

type TIconStringProps = {
  value: string;
  className?: string;
};

const renderHtml = renderCreator<TIconStringProps>(source, {
  value: "",
  className: "",
});

export { renderHtml as renderIcon };
