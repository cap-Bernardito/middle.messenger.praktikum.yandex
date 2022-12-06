import { renderCreator } from "shared/utils/utils";

import source from "./input.hbs";

import "./input.scss";

type TInputProps = {
  label: string;
  name: string;
  type?: "text" | "number" | "password" | "email";
  value?: string;
  placeholder?: string;
  className?: string;
};

const renderHtml = renderCreator<TInputProps>(source, {
  label: "",
  type: "text",
  placeholder: "",
  name: "",
  value: "",
  className: "",
});

export { renderHtml as renderInput, TInputProps };
