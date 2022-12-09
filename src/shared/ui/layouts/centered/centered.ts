import { renderCreator } from "shared/utils/utils";

import source from "./centered.hbs";

import "./centered.scss";

type TCenteredProps = {
  body: string;
  className?: "layout-centered_sm" | "layout-centered_md" | "layout-centered_xl";
};

const renderHtml = renderCreator<TCenteredProps>(source, { body: "", className: "layout-centered_sm" });

export { renderHtml as renderLayoutCentered };
