import { renderCreator } from "shared/utils/utils";

import source from "./icon.hbs";

type TIconProps = {
  value: string;
  className?: string;
};

const renderHtml = renderCreator<TIconProps>(source, {
  value: "",
  className: "",
});

export { renderHtml as renderIcon, TIconProps };
