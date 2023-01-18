// eslint-disable-next-line simple-import-sort/imports
import "./registerComponents";

import { Block, renderDOM } from "shared/core";

import { store } from "./store";

import "./styles/index.scss";
import { initApp, initRouter } from "./services";

document.addEventListener("DOMContentLoaded", () => {
  const splashScreen = new (class extends Block {
    render() {
      return `
        {{#LayoutCentered}}
          Загрузка...
        {{/LayoutCentered}}
      `;
    }
  })();

  renderDOM(splashScreen);

  store.dispatch(initApp);

  initRouter(store);
});
