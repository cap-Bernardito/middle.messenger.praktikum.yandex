import { renderCreator } from "shared/utils/utils";

import source from "./input.hbs";

import "./input.scss";

type TInputProps = {
  label: string;
  name: string;
  type?: "text" | "number" | "password" | "email" | "tel";
  value?: string;
  placeholder?: string;
  className?: string;
  classNameInput?: string;
};

const renderHtml = renderCreator<TInputProps>(source, {
  label: "",
  type: "text",
  placeholder: "",
  name: "",
  value: "",
  className: "",
  classNameInput: "",
});

export { renderHtml as renderInput, TInputProps };
