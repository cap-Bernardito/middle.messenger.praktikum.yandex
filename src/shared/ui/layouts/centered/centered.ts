import { renderCreator } from "shared/utils/utils";

import source from "./centered.hbs";

import "./centered.scss";

const renderHtml = renderCreator(source, { body: "" });

export { renderHtml as renderLayoutCentered };
