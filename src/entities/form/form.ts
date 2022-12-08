import { renderInput } from "shared/ui/input/input";
import { _, renderCreator } from "shared/utils/utils";

import source from "./form.hbs";

import "./form.scss";

type TFormProps = {
  fields: string;
  button: string;
  title?: string;
  meta?: string;
  className?: string;
  decorated?: boolean;
};

const renderHtml = renderCreator<TFormProps>(source, {
  fields: _.range(5)
    .map(() => renderInput())
    .join(""),
  button: "",
  meta: "",
  className: "",
  decorated: true,
});

export { renderHtml as renderForm, source as templateForm, TFormProps };
