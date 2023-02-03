// eslint-disable-next-line simple-import-sort/imports
import "./registerComponents";

import { renderDOM } from "shared/core";
import { SplashScreen } from "pages/splash-screen/splash-screen";

import { store } from "./store";

import "./styles/index.scss";
import { initApp, initRouter } from "./services";

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new SplashScreen({}));

  store.dispatch(initApp);

  initRouter(store);
});
