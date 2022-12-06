import { renderCreator } from "shared/utils/utils";

import source from "./button.hbs";

import "./button.scss";

type TButtonProps = {
  value: string;
  htmlType?: "submit" | "reset" | "button";
  className?: string;
};

const renderHtml = renderCreator<TButtonProps>(source, {
  value: "",
  className: "",
  htmlType: "submit",
});

export { renderHtml as renderButton, TButtonProps };
