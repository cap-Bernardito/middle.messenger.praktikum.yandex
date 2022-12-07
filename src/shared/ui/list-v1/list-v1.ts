import { renderCreator } from "shared/utils/utils";

import source from "./list-v1.hbs";

import "./list-v1.scss";

type TListV1Item = {
  name: string;
  value?: string;
};

type TListV1Props = {
  items: TListV1Item[];
  className?: string;
};

const renderHtml = renderCreator<TListV1Props>(source, {
  items: [
    {
      name: "Почта",
      value: "pochta@yandex.ru",
    },
    {
      name: "Логин",
      value: "vasya_vasilek",
    },
  ],
  className: "",
});

export { renderHtml as renderListV1, TListV1Props };
