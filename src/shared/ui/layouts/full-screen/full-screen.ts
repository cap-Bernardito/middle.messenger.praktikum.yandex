import { renderCreator } from "shared/utils/utils";

import source from "./full-screen.hbs";

import "./full-screen.scss";

type TFullScreenProps = {
  secondary: string;
  primary: string;
};

const renderHtml = renderCreator<TFullScreenProps>(source, { secondary: "secondary", primary: "primary" });

export { renderHtml as renderLayoutFullScreen };
