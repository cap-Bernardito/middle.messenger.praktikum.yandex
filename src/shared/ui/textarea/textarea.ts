import { renderCreator } from "shared/utils/utils";

import source from "./textarea.hbs";

import "./textarea.scss";

type TTextareaProps = {
  name: string;
  value?: string;
  placeholder?: string;
  className?: string;
  classNameTextarea?: string;
};

const renderHtml = renderCreator<TTextareaProps>(source, {
  placeholder: "",
  name: "",
  value: "",
  className: "",
  classNameTextarea: "",
});

export { renderHtml as renderTextarea, TTextareaProps };
