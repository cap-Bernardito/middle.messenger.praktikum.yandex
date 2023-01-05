import { renderCreator } from "shared/utils/utils";

import source from "./icon.hbs";

// Иконки отсюда - https://materialdesignicons.com/

type TIconStringProps = {
  value: string;
  className?: string;
};

const renderHtml = renderCreator<TIconStringProps>(source, {
  value: "",
  className: "",
});

export { renderHtml as renderIcon };
